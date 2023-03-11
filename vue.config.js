const nodeExternals = require('webpack-node-externals')

module.exports = {
  configureWebpack: {
    externals: [nodeExternals()]
  }
}
