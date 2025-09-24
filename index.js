const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.get('/api/greet', (req, res) => {
  const name = req.query.name || 'world';
  res.json({ message: `Hello, ${name}!` });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app; // exported for tests
