// External
const webpackMerge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require("path");

// Internal
const commonConfig = require("./webpack.base.config");
module.exports = webpackMerge(commonConfig, {
    mode: "production",
    entry: "./app.ts",
    output: {
        path: path.resolve(__dirname, "target"),
        filename: "bundle.[hash].js"
    },
    optimization: {
        concatenateModules: true,
        minimize: true
    },
    plugins: [new CleanWebpackPlugin(["target"])]
});
