const path = require('path')

module.exports = {
  mode: 'production',
  entry: './server/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: [
          path.join(__dirname, 'node_modules'),
          path.join(__dirname, 'bower_components')
        ],
        include: [
          path.join(__dirname, 'server')
          // path.join(__dirname, '.nuxt')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
