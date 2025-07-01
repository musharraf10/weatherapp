import axios from 'axios';

const API_KEY = process.env.OPENWEATHER_API_KEY;
const GEO_URL = 'http://api.openweathermap.org/geo/1.0';

export const searchCities = async (query) => {
  try {
    const response = await axios.get(`${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`);
    
    return response.data.map(city => ({
      name: city.name,
      country: city.country,
      state: city.state,
      lat: city.lat,
      lon: city.lon,
      displayName: `${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}`
    }));
  } catch (error) {
    throw new Error('Failed to search cities');
  }
};