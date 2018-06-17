import sharedb from './lib/client/connection';

function connect(initCb){
  // var sharedb = require('./lib/client');
  console.debug('sharedb',sharedb);
  var socket = new WebSocket('ws://127.0.0.1:8080');
  var connection = new sharedb.Connection(socket);
  var doc = connection.get('archer', 'slides');
  doc.subscribe(initCb);
  return doc;
}

export default {
  connect
};
