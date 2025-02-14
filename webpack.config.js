const path = require('path');
const webpack = require('webpack');
const miniCss = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : miniCss.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.(png|jpeg|jpg|svg|webp)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.scss', '.css', '.pug'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist/'),
    port: 3000,
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new htmlWebpackPlugin({
      template: './src/index.pug',
    }),
    require('tailwindcss'),
    new miniCss({ filename: '[name].css', publicPath: './dist' }),
    new bundleAnalyzerPlugin(),
  ],
};
