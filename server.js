const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ status: 'error', message: 'Missing URL query parameter' });
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error('❌ Proxy error:', error);
    res.status(500).json({ status: 'error', message: 'Proxy failed', error: error.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on port ${PORT}`);
});
