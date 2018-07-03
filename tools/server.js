const url = require('url');
const express = require('express');
const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const proxy = require('http-proxy-middleware');
// 协作后台
const http = require('http');
const ShareDB = require('sharedb');
const WebSocket = require('ws');
const WebSocketJSONStream = require('websocket-json-stream');
const initDoc = require('./initDoc');

let webpackConfig = require('./webpack.base.js');
let config = require('../config/project');
let configWebpack = config.webpack;
let port = configWebpack.port;
let route = Array.isArray(configWebpack.route) ? configWebpack.route : [configWebpack.route];
let apiPort = configWebpack['api-port'];
let apiRoute = configWebpack['api-route'];

function addProtocal(urlString) {
    if (urlString.indexOf('http:') !== -1 || urlString.indexOf('https:') !== -1) {
        return urlString;
    }

    return 'http:' + urlString;
}

let urlObject = url.parse(addProtocal(configWebpack.webserver));

for (let key in webpackConfig.entry) {
    if (webpackConfig.entry.hasOwnProperty(key)) {
        webpackConfig.entry[key].unshift(`webpack-hot-middleware/client?reload=true&dynamicPublicPath=true&path=__webpack_hmr`);
        webpackConfig.entry[key].unshift('react-hot-loader/patch');
    }
}

let compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    stats: {
        colors: true
    },
    publicPath: configWebpack.webserver
}));

app.use(webpackHotMiddleware(compiler, {
    // 这里和上面的client配合，可以修正 webpack_hmr 的路径为项目路径的子路径，而不是直接成为 host 子路径（从publicPath开始，而不是根开始）
    // https://github.com/glenjamin/webpack-hot-middleware/issues/24
    path: `${urlObject.path}__webpack_hmr`
}));

// 静态资源转发
route.forEach((rt) => {
    app.use(rt, proxy({ target: `http://127.0.0.1:${port}`, pathRewrite: { [`^${rt}`]: '/' }}));
});

// 后台转发
apiRoute.forEach((rt) => {
    app.use(rt, proxy({ target: `http://127.0.0.1:${apiPort}` }));
});

// app.listen(port, function(err) {
//     if (err) {
//         console.error(err);
//     }
//     else {
//         console.info('Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
//     }
// });

// 协作后台
let backend = new ShareDB();
createDoc(startServer);

// Create initial document then fire callback
function createDoc(callback) {
    let connection = backend.connect();
    let doc = connection.get('archer', 'slides');
    doc.fetch(function(err) {
        if (err) throw err;
        if (doc.type === null) {
            console.log(initDoc);
            doc.create(initDoc, callback);
            return;
        }
        callback();
    });
}

function startServer() {
    // Create a web server to serve files and listen to WebSocket connections
    let server = http.createServer(app);

    // Connect any incoming WebSocket connection to ShareDB
    let wss = new WebSocket.Server({ server: server });
    wss.on('connection', function(ws, req) {
        let stream = new WebSocketJSONStream(ws);
        backend.listen(stream);
    });

    server.listen(port, function(err) {
        if (err) {
            console.error(err);
        }
        else {
            console.info('Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
        }
    });
}
