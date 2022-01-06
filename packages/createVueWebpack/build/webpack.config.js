const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader/dist/index");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

function pathResolve(filePath) {
  return path.resolve(__dirname, filePath);
}

module.exports = {
  mode: "development",
  entry: pathResolve("../src/main.ts"),
  output: {
    path: pathResolve("dist"),
    filename: "js/[name].js",
  },
  devServer: {
    static: {
      directory: pathResolve("../dist"),
    },
    client: {
      logging: "error",
      progress: true,
    },
    open: true,
    compress: true,
    port: 9000,
    onListening: function (devServer) {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }

      const port = devServer.server.address().port;
      console.log("Listening on port:", port);
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              // 指定特定的ts编译配置，为了区分脚本的ts配置
              configFile: path.resolve(__dirname, "../tsconfig.json"),
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
    ],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: pathResolve("../index.html"),
      filename: "index.html",
      title: "Create Vue Webpack",
    }),
    new VueLoaderPlugin(),
  ],
  stats: "errors-only"
};
