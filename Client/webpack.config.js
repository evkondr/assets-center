const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin') //Generates an HTML file, supplys own template
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //It creates a CSS file per JS file which contains CSS
const webpack = require('webpack')

module.exports = {
    mode:'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env','@babel/preset-react',{
                  'plugins': ['@babel/plugin-proposal-class-properties', "@babel/plugin-transform-runtime"]}]
              }
            }
          },
          {
            test: /\.html$/i, //Exports HTML as string
            use:['html-loader']
          },
          {
            test: /\.scss$/i, //Need to install css-loader and sass-loader before
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], //Loads a Sass/SCSS file and compiles it to CSS.                  
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader', //The file-loader resolves import/require() on a file into a url and emits the file into the output directory.
                options: {
                  name: '[name].[ext]',
                  outputPath: 'images', //path where the target file(s) will be placed
                  publicPath: './images'//path for the target file(s
                }
              }
            ]
            
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'style.css'
        }),
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
        })
      ],
      devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        watchContentBase: true,
        progress: true,
        historyApiFallback: true
      },
  };