const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  entry: ['babel-polyfill','./src/index.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss' ,'.less', '.css'],
    unsafeCache: true,
    alias: {
        'react': path.resolve(__dirname, 'node_modules/react/cjs/react.development.js'),
        'react-dom': path.resolve(__dirname, 'node_modules/react-dom/cjs/react-dom.development.js')
    }
  },
  node: {
    fs: "empty",
    child_process: "empty"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};