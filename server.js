// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const sheetUrl = 'https://script.google.com/macros/s/AKfycbxdeSplETYeE3j_MahOfN_Dj5Qxitwr9hy67HV7px1N3e1YNBm02twGbotA7CUUc1t0sA/exec';

app.post('/', async (req, res) => {
  try {
    const response = await fetch(sheetUrl, {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    console.log("✅ Google Sheet Response:", data);
    res.json(data);
  } catch (error) {
    console.error("❌ Proxy Error:", error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on port ${PORT}`);
});
