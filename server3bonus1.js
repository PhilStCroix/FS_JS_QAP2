const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const EventEmitter = require('events');

// Step 1: Create a custom event emitter
class MyEmitter extends EventEmitter {}

// Step 2: Initialize the custom event emitter
const myEmitter = new MyEmitter();

// Define the log directory where log files will be stored
const logDirectory = 'logs';

// Create the log directory if it doesn't exist
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Step 3: Parse the URL
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Emit an event when a route is requested
  myEmitter.emit('routeRequested', pathname);

  // Handle routes with a switch statement
  switch (pathname) {
    case '/':
      serveHtmlFile('home.html', res);
      break;
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
      // Emit an event when a route is not available
      myEmitter.emit('routeNotAvailable', pathname);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Page not found');
  }
});

// Set the port to listen on
const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Function to serve HTML files
function serveHtmlFile(filename, res) {
  const filePath = path.join(__dirname, 'views', filename);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Emit an event when a file is not available
      myEmitter.emit('fileNotAvailable', filename);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
    } else {
      // Emit an event when a file is successfully read
      myEmitter.emit('fileReadSuccess', filename);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
}

// Step 4: Define event listeners
myEmitter.on('routeRequested', (pathname) => {
  console.log(`Route requested: ${pathname}`);
  // Step 5: Log the event to a log file
  logToFile('routeRequested', `Route requested: ${pathname}`);
});

myEmitter.on('routeNotAvailable', (pathname) => {
  console.error(`Route not available: ${pathname}`);
  // Log the event to a log file
  logToFile('routeNotAvailable', `Route not available: ${pathname}`);
});

myEmitter.on('fileReadSuccess', (filename) => {
  console.log(`File read successfully: ${filename}`);
  // Log the event to a log file
  logToFile('fileReadSuccess', `File read successfully: ${filename}`);
});

myEmitter.on('fileNotAvailable', (filename) => {
  console.error(`File not available: ${filename}`);
  // Log the event to a log file
  logToFile('fileNotAvailable', `File not available: ${filename}`);
});

// Function to log events to daily log files
function logToFile(eventName, message) {
  // Get the current date
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const logDate = `${year}-${month}-${day}`;
  const logFileName = path.join(logDirectory, `${logDate}.log`);

  // Create a log message with a timestamp
  const logMessage = `[${now.toISOString()}] ${message}\n`;

  // Append the log message to the log file
  fs.appendFile(logFileName, logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
}
