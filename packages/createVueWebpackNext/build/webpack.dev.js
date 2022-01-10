const webpackConfig = require("./webpack.config.js");
const { merge: WebpackMerge } = require("webpack-merge");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const chalk = require("chalk");

module.exports = WebpackMerge(webpackConfig, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    port: 3000,
    hot: true,
    onListening: function (devServer) {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }
    },
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `You application is running here ${chalk.yellow(
            "http://localhost:3000"
          )}`,
        ],
      },
    }),
  ],
  stats: "errors-only",
});
