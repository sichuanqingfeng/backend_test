const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  console.log(Math.random())
  res.end('AUTO AUTO Hello from ACK Node.js!   ' + Math.floor(Math.random() * 10000));
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
