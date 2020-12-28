const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const SRC_DIR = __dirname + "/src";
const DIST_DIR = __dirname + "/dist";

module.exports = (env, argv) => {
   const devMode = argv.mode === "development";

   return {
      entry: [SRC_DIR + "/index.jsx"],
      output: {
         path: DIST_DIR,
         publicPath: "/",
         chunkFilename: devMode ? "js/[name].js" : "js/[name].[contenthash].js",
         filename: devMode ? "js/[name].js" : "js/[name].[contenthash].js"
      },
      module: {
         rules: [
            {
               test: /\.(html)$/,
               exclude: /node_modules/,
               use: {
                  loader: "html-loader",
                  options: { minimize: true }
               }
            },
            {
               test: /\.(js|jsx)$/,
               exclude: /node_modules/,
               use: {
                  loader: "babel-loader"
               }
            },
            {
               test: /\.(scss|sass|css)$/,
               include: SRC_DIR,
               exclude: /node_modules/,
               use: [
                  devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                  {
                     loader: "css-loader",
                     options: {
                        modules: {
                           localIdentName: "[local]_[hash:base64:5]"
                        },
                        sourceMap: true
                     }
                  },
                  {
                     loader: "sass-loader",
                     options: {
                        sourceMap: true
                     }
                  }
               ]
            },
            {
               test: /\.(woff2?|ttf|eot)$/,
               use: [
                  {
                     loader: "file-loader",
                     options: {
                        name: "[name].[ext]",
                        outputPath: "fonts/",
                        publicPath: "/fonts/"
                     }
                  }
               ]
            },
            {
               test: /\.(gif|png|jpe?g|svg)$/i,
               use: [
                  "file-loader",
                  {
                     loader: "image-webpack-loader",
                     options: {
                        disable: true
                     }
                  }
               ]
            }
         ]
      },
      resolve: {
         extensions: ["*", ".js", ".jsx"]
      },
      plugins: [
         new webpack.HotModuleReplacementPlugin(),
         new HtmlWebpackPlugin({
            filename: `${DIST_DIR}/index.html`,
            template: `${SRC_DIR}/index.html`
         }),
         new MiniCssExtractPlugin({
            filename: "styles/[name].[hash].css"
         })
      ],
      devServer: {
         contentBase: DIST_DIR,
         hot: true,
         port: 4000
      }
   };
};
