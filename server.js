const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // for application/json
app.use(express.urlencoded({ extended: true })); // for form submissions

app.post('/', async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing target URL.' });
  }

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(req.body).toString()
    });

    const contentType = response.headers.get('content-type');

    // Handle both JSON and HTML responses
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return res.status(200).json(data);
    } else {
      const text = await response.text();
      return res.status(200).json({ success: true, message: "Non-JSON response relayed.", raw: text });
    }

  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ error: 'Proxy failed to forward request.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
