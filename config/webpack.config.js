const path = require('path'),
      HTMLWebpackPlugin = require('html-webpack-plugin'),
      MiniCSSExtractPlugin = require('mini-css-extract-plugin'),
      { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => ({
    mode: argv.mode,
    entry: path.resolve(__dirname, '../src/core/main.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: argv.mode === 'development' ? '[name].bundle.js' : '[name].[contenthash].js'
    },
    resolve: {
        extensions: ['.js', '.json', '.scss'],
        alias: {
            "@": path.resolve(__dirname, '../src')
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            favicon: path.resolve(__dirname, '../src/favicon.ico'),
            scriptLoading: 'defer',
            minify: true
        }),
        new MiniCSSExtractPlugin({
            filename: argv.mode === 'development' ? '[name].bundle.css' : '[name].[contenthash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: './fonts/[name][ext]',
                },
            }
        ]
    },
    devServer: {
        port: 4200,
        hot: true,
        open: true
    }
});