module.exports = {
    entry: "./src/index.jsx",
    output: {
      path: __dirname,
      filename: "build/bundle.js"
    },
    module: {
      loaders: [
        { test: /\.jsx$/, loader: "jsx-loader" }
      ]
    }
}