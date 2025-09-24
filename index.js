// Import the express library for building the web server
const express = require('express');
// Import the http library to create a server instance
const http = require('http');

// Create a new Express application instance
const app = express();

// Set the port for the server to listen on
const port = 3000;

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// A simple /health endpoint to check if the app is running
// This endpoint returns a status of "ok" and the server's uptime
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime()
  });
});

// A greet endpoint that takes a name as a query parameter
app.get('/api/greet', (req, res) => {
  // Get the name from the request query parameters, defaulting to "World"
  const name = req.query.name || 'World';
  // Send a JSON response with a personalized greeting
  res.json({ message: `Hello, ${name}!` });
});

// Create an HTTP server from the Express app
const server = http.createServer(app);

// Start the server and listen on the specified port
server.listen(port, () => {
  // Log a message to the console once the server is successfully running
  console.log(`App listening on port ${port}`);
});

// Export the server instance to make it available for testing
// This is the key change that allows Jest to access the `close` method
module.exports = server;
