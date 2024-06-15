const express = require('express');
const request = require('request');
const app = express();

const ZOHO_API_URL = 'https://creator.zoho.com/api/v2/nexxsuite';
const ACCESS_TOKEN = '1000.9a8a982ea98076b09310c695a1b59ebf.f0a43cd2adfa35091f83ba77bbac2b6e'; // Replace with your actual access token

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
