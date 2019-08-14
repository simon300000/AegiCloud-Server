const path = require('path')
const fs = require('fs')

const nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function(x) {
    return !['.bin'].includes(x)
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = {
  mode: 'production',
  externals: nodeModules,
  target: 'node',
  entry: ['./server/index.js', './.nuxt/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  // node: {
  //   fs: 'empty'
  // },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: [
          // path.join(__dirname, 'node_modules'),
          path.join(__dirname, 'bower_components')
        ],
        include: [
          path.join(__dirname, 'server'),
          path.join(__dirname, '.nuxt')
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
