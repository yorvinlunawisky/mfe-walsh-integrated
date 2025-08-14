const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    "mfe1": "http://localhost:3000/remoteEntry.js",
    "inspections-mfe": "http://localhost:4203/remoteEntry.js",    
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

}, {
  target: 'web',
  experiments: {
    topLevelAwait: true
  },
  resolve: {
    fullySpecified: false
  },
  output: {
    scriptType: 'text/javascript'
  }
});
