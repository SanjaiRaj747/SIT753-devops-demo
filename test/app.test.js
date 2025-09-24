// Import the supertest library for making HTTP requests to our app
const request = require('supertest');
// Import the app server from your main index.js file
const server = require('../index');

// A simple test suite to group related tests
describe('API Endpoints', () => {

  // Test the /health endpoint
  it('GET /health - should return health status', async () => {
    // Use supertest to make a GET request to the /health endpoint
    const response = await request(server).get('/health');
    // Assert that the HTTP status code is 200 (OK)
    expect(response.statusCode).toBe(200);
    // Assert that the response body has the correct status
    // We're now only checking the 'status' property since the uptime can vary
    expect(response.body.status).toEqual('ok');
    // Ensure the uptime property exists, but don't check its value as it's dynamic
    expect(response.body).toHaveProperty('uptime');
  });

  // Test the /api/greet endpoint
  it('GET /api/greet - should return greeting with a name', async () => {
    // Use supertest to make a GET request with a query parameter
    const response = await request(server).get('/api/greet?name=Jest');
    // Assert that the HTTP status code is 200 (OK)
    expect(response.statusCode).toBe(200);
    // Assert that the response body is the expected personalized JSON object
    expect(response.body).toEqual({ message: 'Hello, Jest!' });
  });

});

// This is the crucial part that fixes the hanging issue.
// The `afterAll` hook runs after all tests in the suite have completed.
// It's used to clean up resources, in this case, by closing the server.
afterAll(done => {
  // Gracefully close the server to allow Jest to exit
  server.close(done);
});