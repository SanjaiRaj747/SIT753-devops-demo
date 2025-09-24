// Import the express library
const express = require('express');

// Create a new express application
const app = express();
// Define the port the app will run on. It will use the environment variable PORT if available, otherwise it will default to 3000.
const port = process.env.PORT || 3000;

// Enable JSON body parsing for the application
app.use(express.json());

// Main route to check the application status
app.get('/health', (req, res) => {
    // Send a JSON response with status and uptime
    res.json({
        status: 'ok',
        uptime: process.uptime(),
    });
});

// An API route that takes a name as a query parameter and returns a greeting
app.get('/api/greet', (req, res) => {
    const name = req.query.name || 'World';
    res.json({ message: `Hello, ${name}!` });
});

// The app listens for connections on the specified port.
const server = app.listen(port, () => {
    // Log a message to the console once the server is successfully running.
    console.log(`App listening on port ${port}`);
});

// Export the app and the server instance. This is crucial for testing.
// We export the app separately so we can test routes without starting the server, and the server itself so we can close it after tests.
module.exports = { app, server };
