const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // Use the url module to parse the request URL
    const parsedUrl = url.parse(req.url, true);
  
    // Extract the path from the parsed URL
    const path = parsedUrl.pathname;
  
    // Use a switch statement to handle different routes
    switch (path) {
      case '/about':
        console.log('About page requested');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('About page');
        break;
      case '/contact':
        console.log('Contact page requested');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Contact page');
        break;
      case '/products':
        console.log('Products page requested');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Products page');
        break;
      case '/subscribe':
        console.log('Subscribe page requested');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Subscribe page');
        break;
      default:
        console.log('Default page requested');
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
  });
  
  // Set the port to listen on
  const port = 3000;
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
  