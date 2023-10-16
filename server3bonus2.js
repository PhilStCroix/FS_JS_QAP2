const http = require('http');
const url = require('url');
const axios = require('axios');

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === '/daily-info') {
    // Fetch and display daily information
    const dailyInfo = await fetchDailyInformation();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<html><head><title>Daily Information</title></head><body>${dailyInfo}</body></html>`);
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

async function fetchDailyInformation() {
  // You can use APIs or npm packages to fetch daily information here
  // For example, let's fetch a sample quote of the day from an API
  try {
    const response = await axios.get('https://favqs.com/api/qotd');
    const quote = response.data.quote.body;
    return `<h1>Quote of the Day</h1><p>${quote}</p>`;
  } catch (error) {
    console.error('Error fetching daily information:', error);
    return '<p>Failed to fetch daily information.</p>';
  }
}
