/*
 * @Description:
 * @Author: 莲白
 * @Date: 2022-09-23 08:24:47
 * @LastEditTime: 2022-09-25 09:50:39
 * @LastEditors: 莲白
 */
/**
 * eslint 处理
 */
 const path = require("path");
 const {DefinePlugin} =require('webpack')
 const EslintWebpackPlugin = require("eslint-webpack-plugin");
 const HtmlWebpackPlugin = require("html-webpack-plugin");
 const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
 const TerserWebpackPlugin = require("terser-webpack-plugin");
 const ImageMinimizerWebpackPlugin = require("image-minimizer-webpack-plugin");
 const CopyPlugin = require("copy-webpack-plugin");
 const {VueLoaderPlugin} = require('vue-loader');
 /**
  * 公共方法处理相同样式处理代码
  * @param {*} pre  判断是sass或者less
  * @returns
  */
 const getStyleloaders = (pre) => {
   return [
     MiniCssExtractPlugin.loader,
     "css-loader",
     {
       loader: "postcss-loader",
       options: {
         postcssOptions: {
           plugins: ["postcss-preset-env"],
         },
       },
     },
     pre,
   ].filter(Boolean);
 };
 module.exports = {
   entry: "./src/main.js",
   output: {
     path: path.resolve(__dirname, "../dist"),
     filename: "static/js/[name].[contenthash:10].js",
     chunkFilename: "static/js/[name].[contenthash:10].chunk.js",
     assetModuleFilename: "static/media/[hash:10][ext][query]",
     clean: true,
   },
   module: {
     rules: [
       //处理css 兼容性问题
       //配合pack.json中的browserslist 来指定兼容性到什么成度
       {
         test: /\.css$/,
         use: getStyleloaders(),
       },
       {
         test: /\.less$/,
         use: getStyleloaders("less-loader"),
       },
       {
         test: /\.s[ac]ss$/,
         use: getStyleloaders("sass-loader"),
       },
       {
         test: /\.styl$/,
         use: getStyleloaders("stylus-loader"),
       },
       //处理图片
       {
         test: /\.(jpe?g|png|gif|webp|svg)/,
         type: "asset",
         parser: {
           dataUrlCondition: {
             maxSize: 10 * 1024, //一般来说10kb
           },
         },
       },
       {
         //处理其他资源
         test: /\.(wpff2?|ttf|map3|mp4)/,
         type: "asset/resource",
       },
       //处理js
       {
         test: /\.js?$/,
         exclude: /node_modules/,
         include: path.resolve(__dirname, "../src"),
         loader: require.resolve("babel-loader"),
         options: {
           cacheDirectory: true,
           cacheCompression: false,
         },
       },
           //处理Vue
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
     ],
   },
   //处理html
   plugins: [
     new EslintWebpackPlugin({
       context: path.resolve(__dirname, "../src"),
       exclude: "node_modules",
       cache: true,
       cacheLocation: path.resolve(
         __dirname,
         "../node_modules/.cache/.eslintcache"
       ),
     }),
     new HtmlWebpackPlugin({
       template: path.resolve(__dirname, "../public/index.html"),
     }),
     new MiniCssExtractPlugin({
       filename: "static/css/[name].[contenthash:10].css",
       chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
     }),
     new CopyPlugin({
       patterns: [
         {
           from: path.resolve(__dirname, "../public"),
           to: path.resolve(__dirname, "../dist"),
           globOptions: {
             //忽略index.html文件
             ignore: ["**/index.html"],
           },
         },
       ],
     }),
     new VueLoaderPlugin(),
     new DefinePlugin({
       //cross-env定义的环境变量给打包工具使用
       //DefinePlugin定义环境变量给源代码使用，从而解决vue3页面警告的问题
       __VUE_OPTIONS_API__:true,
       __VUE_PROD_DEVTOOLS__:false
     })
   ].filter(Boolean),
   //开发模式
   mode: "production",
   devtool: "source-map",
   optimization: {
     splitChunks: {
       // include all types of chunks
       chunks: "all",
     },
     runtimeChunk: {
       name: (entrypoint) => `runtime~${entrypoint.name}`,
     },
     minimizer: [
       new CssMinimizerWebpackPlugin(), //css压缩
       new TerserWebpackPlugin(), // js压缩
       new ImageMinimizerWebpackPlugin({
         minimizer: {
           implementation: ImageMinimizerWebpackPlugin.imageminGenerate,
           options: {
             plugins: [
               ["gifsicle", { interlaced: true }],
               ["jpegtran", { progressive: true }],
               ["optipng", { optimizationLevel: 5 }],
               [
                 "svgo",
                 {
                   plugins: [
                     "preset-default",
                     "prefixIds",
                     {
                       name: "sortAttrs",
                       params: {
                         xmlnsOrder: "alphabetical",
                       },
                     },
                   ],
                 },
               ],
             ],
           },
         },
       }), //图片压缩
     ],
   },
   //webpack解析模块加载选项
   resolve: {
     //自动补齐文件扩展名
     extensions: [".vue", ".js", ".json"],
   },
 };
 