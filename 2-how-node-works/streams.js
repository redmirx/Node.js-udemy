const fs = require('fs');
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  // Solution 1
  // fs.readFile('./test-file.txt', 'utf-8', (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   res.end(data);
  // });

  // Solution 2: Streams
  //   const readable = fs.createReadStream('./test-file.txt');
  //   readable.on('data', (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on('end', (end) => {
  //     res.end();
  //   });
  //   readable.on('error', (err) => {
  //     res.statusCode = 500;
  //     console.log(err);
  //     res.end('file not found')
  //   });

  // Solution 3
  const readable = fs.createReadStream('./test-file.txt');
  readable.pipe(res);
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Waiting to requests');
});
