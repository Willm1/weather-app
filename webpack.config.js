const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./lib/index.js"),
  mode: "development",
  output: {
    publicPath: process.env.NODE_ENV === 'production' ? '/weather-app/' : '/',
    path: path.resolve(__dirname, "dist"),
    filename: "index.js"
  },
  devtool: "sourcemap",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};

const config = {

  kit: {
    floc: process.env.NODE_ENV === "development",
  },
};
