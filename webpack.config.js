// html-webpack-plugin快速创建一个html5文件，并自动引入打包后的js文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    // 模式
    mode: 'development',
    // mode: 'production',
    // 入口文件
    entry: './src/index.js',
    // 输出地
    output: {
        path: __dirname + '/dist',
        filename: 'index.js'
    },
    // loader加载器
    module: {
        rules: [
            // css-loader
            // { test: /\.css$/, use: ['style-loader', 'css-loader'] },

            // 将css代码分离成独立的css文件
            { test: /\.css$/, use: [ MiniCssExtractPlugin.loader, 'css-loader']},
            // babel-loader
            {
                test: /\.js$/,
                exclude: /node_modules/ , // exclude指定的目录中的js文件不使用该加载器
                use: ['babel-loader']
            },
            {
                test: /\.(gif|jpe?g|png)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8*1024,
                        fallback: 'file-loader'
                    }
                }
            },
            { test: /\.html/, use: {loader: 'html-loader'}}
        ]
    },
    // 插件
    plugins: [
        // new HtmlWebpackPlugin() // 生成的html5文件,文件名称叫index.html
        new HtmlWebpackPlugin({
            template: './src/index.html', // 以这个为模板生成新的html文件
            filename: 'index.html', // 默认为index.html
            // favicon: './src/favicon.ico' // 指定网页的小图标
            // minify: { // 压缩html,适用于mode为production(生产环境)
            //     collapseWhitespace: true // 去掉空白
            // }
        }),

        new MiniCssExtractPlugin({
            filename: 'index.css'
        }),

        // 不需要经过webpack打包的资源文件原封不动复制到输出地
        new CopyWebpackPlugin([
            { from:'static', to: 'static' }
        ]),
        // 打包之前先清空dist目录（output.path）
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin() // 创建要替换的热更新插件
    ],

    devServer: {
        hot: true, // 替换热更新
        open: true,
        // 架设代理服务器
        proxy: {
            '/api': {
                target: 'http://192.168.0.2:8888',
                // 路径重写
                // 如果不重写 /api会添加到url中，比如（/api/sys/user/all => http://192.168.0.2:8888/api/sys/user/all）
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    performance: { // 性能的配置
        hints: false // false 表示不提示文件太大的警告
    }
}