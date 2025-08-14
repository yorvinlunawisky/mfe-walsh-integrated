const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'inspections-mfe',

  exposes: {
      './InspectionsModule': './projects/inspections-mfe/src/app/inspections/inspections.module.ts',
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
