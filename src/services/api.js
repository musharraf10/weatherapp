import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://weatherapp-69v7.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Weather API calls
export const weatherAPI = {
  getCurrentWeather: async (city) => {
    const response = await api.get(
      `/weather/current/${encodeURIComponent(city)}`
    );
    return response.data;
  },

  getCurrentWeatherByCoords: async (lat, lon) => {
    const response = await api.get(`/weather/coordinates/${lat}/${lon}`);
    return response.data;
  },

  getForecast: async (city) => {
    const response = await api.get(`/forecast/${encodeURIComponent(city)}`);
    return response.data;
  },

  getForecastByCoords: async (lat, lon) => {
    const response = await api.get(`/forecast/coordinates/${lat}/${lon}`);
    return response.data;
  },

  searchCities: async (query) => {
    const response = await api.get(
      `/location/search/${encodeURIComponent(query)}`
    );
    return response.data;
  },
};

export default api;
