const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: "portfolio",
          remotes: {
            calculator: "calculator@https://pemdas-if107354y-emms21.vercel.app/remoteEntry.js",
          },
          shared: {
            react: { 
              singleton: true,
              eager: true,
              requiredVersion: '^18.2.0'
            },
            "react-dom": { 
              singleton: true,
              eager: true,
              requiredVersion: '^18.2.0'
            },
            "antd": {
              singleton: true,
              eager: true,
              requiredVersion: '^5.8.6'
            }
          },          
        })
      );

      return webpackConfig;
    },
  },
};
