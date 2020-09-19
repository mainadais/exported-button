const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require("webpack-node-externals");
const pkg = require("./package.json");

const libraryName = pkg.name;

module.exports = function (_env, argv) {
  const isProduction = argv.mode === "production";
  const isDevelopment = !isProduction;

  return {
    devtool: isDevelopment && "cheap-module-source-map",
    mode: "production",
    entry: path.join(__dirname, "./src/library.js"),
    output: {
      path: path.join(__dirname, "./dist"),
      filename: "library.js",
      library: libraryName,
      libraryTarget: "umd",
      publicPath: "/dist/",
      umdNamedDefine: true,
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(
          isProduction ? "production" : "development"
        ),
      }),
      new MiniCssExtractPlugin({
        filename: "dist/css/[name].[contenthash:8].css",
        chunkFilename: "dist/css/[name].[contenthash:8].chunk.css",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? "production" : "development",
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
          ],
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "static/media/[name].[hash:8].[ext]",
            },
          },
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          loader: require.resolve("file-loader"),
          options: {
            name: "static/media/[name].[hash:8].[ext]",
          },
        },
      ],
    },
    node: {
      net: "empty",
      tls: "empty",
      dns: "empty",
    },
    resolve: {
      alias: {
        react: path.resolve(__dirname, "./node_modules/react"),
        "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
      },
    },
    target: "node",
    externals: [
      //don't bundle node_modules with your library
      nodeExternals(),
      {
        //don't bundle lodash
        lodash: {
          commonjs: "lodash",
          commonjs2: "lodash",
          amd: "lodash",
          root: "_",
        },
        // Don't bundle react or react-dom
        react: {
          commonjs: "react",
          commonjs2: "react",
          amd: "React",
          root: "React",
        },
        "react-dom": {
          commonjs: "react-dom",
          commonjs2: "react-dom",
          amd: "ReactDOM",
          root: "ReactDOM",
        },
      },
    ],
    optimization: {
      runtimeChunk: true,
    },
  };
};
