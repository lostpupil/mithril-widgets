const path = require('path');
const webpack = require('webpack');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        index: ['./index.js'],
    },
    output: {
        filename: `[name].js`,
        path: path.resolve(__dirname, 'dist/prod')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    "presets": ["@babel/preset-env"]
                }
            }
        },{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // 将 JS 字符串生成为 style 节点
            }, {
                loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
            }, {
                loader: "sass-loader" // 将 Sass 编译成 CSS
            }]
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new cleanWebpackPlugin(['dist/prod'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new UglifyJSPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        })
    ]
}
