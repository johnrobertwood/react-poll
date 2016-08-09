var path = require('path');

module.exports = {
    entry: "./js/index.jsx",
    output: {
      path: path.resolve(__dirname, "build"),
      publicPath: '/js',
      filename: "bundle.js"
    },
    module: {
      loaders: [
        { test: /\.jsx$/, loader: "jsx-loader" },
        { test: /\.scss$/, loaders: ["style", "css", "sass"] }
      ]
    }
}