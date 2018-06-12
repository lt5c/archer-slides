const path = require('path');

let Clean = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin-hash');
let WriteFilePlugin = require('write-file-webpack-plugin');
let FileWebpackPlugin = require('file-webpack-plugin');
let HappyPack = require('happypack');
let HtmlResWebpackPlugin = require('html-res-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(config, webpack) {

    let configWebpack = config.webpack;
    let isProduction = config.env === 'production';

    let plugins = [
        new HappyPack({
            id: '1',
            verbose: false,
            loaders: [{
                path: 'babel-loader',
                options: {
                    cacheDirectory: './.cache/'
                }
            }]
        }),
        new HappyPack({
            id: '2',
            verbose: false,
            loaders: [{
                path: 'babel-loader',
                options: {
                    'plugins': [
                        ['transform-react-jsx', { 'pragma': 'h' }]
                    ],
                    cacheDirectory: './.cache/'
                },
            }]
        }),
        new MiniCssExtractPlugin({
            filename: `css/${config.webpack.contenthashName}.css`,
            chunkFilename: 'css/[name]-[id]-[hash].css'
        }),

    ];

    if (isProduction) {
        let useCdn = configWebpack.useCdn || true;

        if (useCdn) {
            plugins.push(new FileWebpackPlugin({
                'after-emit': [
                    {
                        from: path.join(configWebpack.path.dist, '**/*'),
                        to: path.join(configWebpack.path.dist, configWebpack.path.distCdn),
                        action: 'move',
                        options: {
                            cwd: configWebpack.path.dist,
                            absolute: true,
                            ignore: [
                                '*.html',
                                '**/*.html'
                            ]
                        }
                    },
                    {
                        from: path.join(configWebpack.path.dist, '*.html'),
                        to: path.join(configWebpack.path.dist, configWebpack.path.distWebserver),
                        action: 'move',
                        options: {
                            cwd: configWebpack.path.dist,
                            absolute: true,
                        }
                    }
                ]
            }));
        }
    }
    else {
        if (configWebpack.showSource) {
            plugins.push(new WriteFilePlugin());
        }
    }

    if (configWebpack.clean) {
        plugins.push(new Clean([isProduction ? configWebpack.path.dist : configWebpack.path.dev], { root: path.resolve() }));
    }

    if (config.webpack.promise) {
        plugins.push(new webpack.ProvidePlugin({
            Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise'
        }));
    }

    configWebpack.static.forEach((item) => {
        plugins.push(new CopyWebpackPlugin([{
            from: item.src,
            to: (item.dist || item.src) + (item.hash ? '[path]' + configWebpack.hashName : '[path][name]') + '.[ext]',
        }]));
    });

    config.webpack.html.forEach(function(page, key) {
        plugins.push(new HtmlResWebpackPlugin({
            // removeUnMatchedAssets: true,
            env: isProduction ? 'production' : 'development',
            mode: 'html',
            filename: page.key + '.html',
            template: page.path,
            favicon: 'src/favicon.ico',
            htmlMinify: null,
            entryLog: !key,
            cssPublicPath: isProduction ? config.webpack.cssCdn : config.webpack.webserver,
            templateContent: function(tpl) {
                return tpl;
            }
        }));
    });

    return plugins;
};
