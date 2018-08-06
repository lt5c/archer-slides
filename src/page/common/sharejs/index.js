import sharedb from './lib/client/connection';

function connect() {
    // var sharedb = require('./lib/client');
    console.dev('sharedb', sharedb);
    let socket = new WebSocket('ws://127.0.0.1:10086');
    let connection = new sharedb.Connection(socket);
    let doc = connection.get('archer', 'slides');
    return doc;
}

export default {
    connect
};
