import express from 'express';
import { getCurrentWeather } from '../services/weatherService.js';

const router = express.Router();

router.get('/current/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const weatherData = await getCurrentWeather(city);
    res.json(weatherData);
  } catch (error) {
    res.status(404).json({ 
      error: 'City not found', 
      message: error.message 
    });
  }
});

router.get('/coordinates/:lat/:lon', async (req, res) => {
  try {
    const { lat, lon } = req.params;
    const weatherData = await getCurrentWeather(null, lat, lon);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch weather data', 
      message: error.message 
    });
  }
});

export default router;