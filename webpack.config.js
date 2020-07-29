const path = require('path');

module.exports = {
  mode: "development",
  entry: "./client/src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "client/dist")
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
}