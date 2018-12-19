// External
const path = require("path");
const webpackMerge = require("webpack-merge");

// Internal
const commonConfig = require("./webpack.base.config");
module.exports = webpackMerge(commonConfig, {
    mode: "development",
    entry: "./app.ts",
    devtool: "inline-source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    watch: true,
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9000,
        historyApiFallback: {
            index: "src/"
        },
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        inline: true
    },
    plugins: []
});
