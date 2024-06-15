const express = require('express');
const request = require('request');
const app = express();

const ZOHO_API_URL = 'https://creator.zoho.com/api/v2/nexxsuite';
const ACCESS_TOKEN = '1000.ac5541eacb4f7844cd3e77c153636251.ebe7901ce70d8ec5a533bd6cf792cb37';

app.use(express.json());

app.post('/proxy', (req, res) => {
  const url = `${ZOHO_API_URL}${req.body.endpoint}`;
  const options = {
    method: req.body.method,
    url: url,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Zoho-oauthtoken ${ACCESS_TOKEN}`
    },
    body: JSON.stringify(req.body.data)
  };

  request(options, (error, response, body) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(body);
    }
  });
});

app.listen(3000, () => {
  console.log('Proxy server listening on port 3000');
});
