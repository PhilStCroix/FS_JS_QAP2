const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  switch (path) {
    case '/about':
      serveHtmlFile('about.html', res);
      break;
    case '/contact':
      serveHtmlFile('contact.html', res);
      break;
    case '/products':
      serveHtmlFile('products.html', res);
      break;
    case '/subscribe':
      serveHtmlFile('subscribe.html', res);
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Page not found');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

function serveHtmlFile(filename, res) {
  const filePath = path.join(__dirname, 'views', filename);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
}
