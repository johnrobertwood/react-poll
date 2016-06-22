module.exports = {
    entry: "./index.jsx",
    output: {
      path: __dirname,
      filename: "bundle.js"
    },
    module: {
      loaders: [
        { test: /\.jsx$/, loader: "jsx-loader" }
      ]
    }
}