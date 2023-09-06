const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {

      webpackConfig.target = 'web';
      webpackConfig.plugins.push(
        new webpack.container.ModuleFederationPlugin({
          name: "portfolio",
          remotes: {
            calculator: "calculator@https://pemdas.vercel.app/remoteEntry.js",
          },
        })
      );

      return webpackConfig;
    },
  },
};
