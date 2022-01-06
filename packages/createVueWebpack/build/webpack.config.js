const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader/dist/index");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const chalk = require("chalk");

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
        test: /\.(gif|png|jpe?g)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: "assets/[hash:8].[name][ext]",
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
        type: "asset/resource",
        generator: {
          filename: "assets/[name][ext]",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
    ],
  },
  plugins: [
    // new FriendlyErrorsWebpackPlugin({
    //   compilationSuccessInfo: {
    //     messages: [
    //       "App funning at:",
    //       `- Local:   ${chalk.blueBright("http://localhost:9000")}`,
    //       `- NetWrok: ${chalk.blueBright("http://localhost:9000")}`,
    //     ],
    //   },
    // }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `You application is running here ${chalk.yellow(
            "http://localhost:9000"
          )}`,
        ],
      },
    }),
    new HtmlWebpackPlugin({
      template: pathResolve("../index.html"),
      filename: "index.html",
      title: "Create Vue Webpack",
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css",
    }),
  ],
  stats: "errors-only",
};
