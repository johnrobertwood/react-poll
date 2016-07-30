var path = require('path');

module.exports = {
    entry: "./src/index.jsx",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js"
    },
    module: {
      loaders: [
        { test: /\.jsx$/, loader: "jsx-loader" }
      ]
    }
}