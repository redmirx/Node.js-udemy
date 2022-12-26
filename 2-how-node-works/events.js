const http = require('http');

const server = http.createServer();
server.on('request', (req, res) => {
  console.log('Request 1');
  console.log(req.url);
  res.end('Request 1');
});
server.on('request', (req, res) => {
  console.log('Request 2');
  console.log(req.url);
});

server.close('request', (req, res) => {
  console.log('Server closed');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests');
});
