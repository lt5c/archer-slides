module.exports = function(config) {

    let configWebpack = config.webpack;
    let isProduction = config.env === 'production';

    let rules = [
        {
            test: /\.ico$/,
            loader: 'url-loader',
            options: {
                name: '[name].[ext]'
            }
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        publicPath: isProduction ? configWebpack.imgCdn : configWebpack.webserver,
                        limit: 10,
                        name: `img/[path]${configWebpack.hashName}.[ext]`
                    }
                }
            ]
        },
        {
            test: /\.(woff|woff2|eot|ttf)\??.*$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10,
                        name: `font/[path]${configWebpack.hashName}.[ext]`
                    }
                }
            ]
        }
    ];

    return rules;
};
