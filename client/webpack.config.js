const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require('dotenv').config();

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: { path: path.join(__dirname, "build"), filename: "index.bundle.js" },
    mode: process.env.NODE_ENV,
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: [".js", ".jsx"]
    },
    devServer: { contentBase: path.join(__dirname, "src") },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: "[name]__[local]___[hash:base64:5]",
                            },
                        }
                    }
                ],
                include: /\.module\.css$/
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                exclude: /\.module\.css$/
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                SERVICE_URL: JSON.stringify(process.env.SERVICE_URL),
                FIREBASE_ENABLE: JSON.stringify(process.env.FIREBASE_ENABLE),
                FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
                FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                FIREBASE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
                FIREBASE_APP_ID: JSON.stringify(process.env.FIREBASE_APP_ID),
                FIREBASE_MEASURMENT_ID: JSON.stringify(process.env.FIREBASE_MEASURMENT_ID),
            },
        })
    ],
    devtool: 'source-map',
};