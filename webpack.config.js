// webpack v4
const path = require('path');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const devMode = process.env.NODE_ENV === 'development';
const port = process.env.PORT || 4200;

module.exports = {
    devtool: 'source-map',
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    devServer: {
        port
    },
    plugins: [
      new CleanWebpackPlugin('dist', {}),
      new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: false,
            hash: true,
            filename: 'index.html'
        }),
//    new ExtractTextPlugin({filename: 'style.[hash].css', disable: false, allChunks: true}
//    ),
    new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
        }),

    new WebpackMd5Hash(),
    new SpriteLoaderPlugin({
            plainSprite: true
        })
  ],
    optimization: {
        minimizer: [new UglifyJsPlugin({
            test: /\.js(\?.*)?$/i
        })]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
      },
            {
                test: /\.(scss|css)$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {sourceMap: true, minimize: true}}, 
                    {loader: 'postcss-loader', options: {sourceMap: true}},
                    {loader: 'sass-loader', options: {sourceMap: true}}
                ]
      },
            {
                test: /\.(jpg|png|svg|gif|otf)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: '[name].[ext]',
                        outputPath: './images'
                    }
                }
        },
            {
                test: /icons\/.*\.svg$/,
                loader: 'svg-sprite-loader',
                options: {
                    extract: true,
                    spriteFilename: './public/dist/img/icons.svg',
                    runtimeCompat: true
                }
    }

//      {
//        test: /\.scss$/,
//        use: ExtractTextPlugin.extract(
//          {
//            fallback: 'style-loader',
//            use: ['css-loader', 'sass-loader']
//          })
//      }
    ]
    }
};