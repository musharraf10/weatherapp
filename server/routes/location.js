import express from 'express';
import { searchCities } from '../services/locationService.js';

const router = express.Router();

router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const cities = await searchCities(query);
    res.json(cities);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to search cities', 
      message: error.message 
    });
  }
});

export default router;