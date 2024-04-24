const express = require('express');
const serverless = require('serverless-http');
const fs = require('fs');
const app = express();
const port = 3000; // or any port you prefer

app.get('/', (req, res) => {
  // Make sure to provide the correct path to your JSON file
  fs.readFile('parsed_locations.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Data is already in JSON format, so we can directly parse it
    const jsonContent = JSON.parse(data);

    // Set header to application/json
    res.setHeader('Content-Type', 'application/json');

    // Send the JSON content as the response
    res.json(jsonContent);
  });
});

module.exports = app;
module.exports.handler = serverless(app);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });