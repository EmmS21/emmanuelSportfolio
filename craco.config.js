// const { ModuleFederationPlugin } = require("webpack").container;

// module.exports = {
//   webpack: {
//     configure: (webpackConfig, { env, paths }) => {
//       webpackConfig.target = "web";
//       webpackConfig.devtool = "source-map";
//       webpackConfig.target = 'web';
//       webpackConfig.plugins.push(
//         new ModuleFederationPlugin({
//           name: "portfolio",
//           remotes: {
//             calculator: "calculator@http://localhost:3001/remoteEntry.js",
//           },
//           shared: {
//             "antd": { 
//               singleton: true, 
//               requiredVersion: '^5.8.6', // This ensures that the correct version of antd is used
//             },
//           }
//         })
//       );

//       return webpackConfig;
//     },
//   },
// };
