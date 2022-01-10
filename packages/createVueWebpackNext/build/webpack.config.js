const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader/dist/index");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.argv.indexOf("--mode=production") === -1;

module.exports = {
  entry: {
    main: path.resolve(__dirname, "../src/main.js"),
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].[chunkhash:8].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: devMode ? "vue-style-loader" : MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../dist/css/",
              hmr: devMode,
            },
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: devMode ? "vue-style-loader" : MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../dist/css/",
              hmr: devMode,
            },
          },
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")],
            },
          },
        ],
      },
      {
        test: /\.(jep?g|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10240,
            fallback: {
              loader: "file-loader",
              options: {
                name: "img/[name].[hash:8].[ext]",
              },
            },
          },
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10240,
            fallback: {
              loader: "file-loader",
              options: {
                name: "media/[name].[hash:8].[ext]",
              },
            },
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: {
          loader: "url-loader",
          options: {
            limit: 10240,
            fallback: {
              loader: "file-loader",
              options: {
                name: "media/[name].[hash:8].[ext]",
              },
            },
          },
        },
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.cjs.js",
      "@": path.resolve(__dirname, "../src"),
    },
    extensions: ["*", ".js", ".json", ".vue"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      filename: "index.html",
      title: "Create Vue Webpack",
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash:8].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash:8].css",
    }),
  ],
};
