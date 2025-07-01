import express from 'express';
import { getForecast } from '../services/weatherService.js';

const router = express.Router();

router.get('/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const forecastData = await getForecast(city);
    res.json(forecastData);
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
    const forecastData = await getForecast(null, lat, lon);
    res.json(forecastData);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch forecast data', 
      message: error.message 
    });
  }
});

export default router;