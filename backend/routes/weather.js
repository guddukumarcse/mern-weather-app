const express = require('express');
const axios = require('axios');
const router = express.Router();

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
if (!OPENWEATHER_API_KEY) {
  console.warn('OPENWEATHER_API_KEY not set!');
}

// Get current weather by city name
router.get('/city/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const resp = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: OPENWEATHER_API_KEY,
        units: 'metric'
      }
    });
    res.json(resp.data);
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(err.response?.status || 500).json({ error: err.response?.data?.message || 'Server error' });
  }
});

// Optionally: get by lat/lon
router.get('/coords', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const resp = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { lat, lon, appid: OPENWEATHER_API_KEY, units: 'metric' }
    });
    res.json(resp.data);
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(err.response?.status || 500).json({ error: 'Server error' });
  }
});

module.exports = router;
