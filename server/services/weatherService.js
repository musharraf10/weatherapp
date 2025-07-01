import axios from 'axios';

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getCurrentWeather = async (city, lat, lon) => {
  try {
    let url;
    if (city) {
      url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
    } else {
      url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    }

    const response = await axios.get(url);
    const data = response.data;

    return {
      city: data.name,
      country: data.sys.country,
      temp: Math.round(data.main.temp),
      tempMin: Math.round(data.main.temp_min),
      tempMax: Math.round(data.main.temp_max),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      feelsLike: Math.round(data.main.feels_like),
      weather: data.weather[0].description,
      weatherMain: data.weather[0].main,
      icon: data.weather[0].icon,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      visibility: data.visibility / 1000, // Convert to km
      cloudiness: data.clouds.all,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      timezone: data.timezone,
      coordinates: {
        lat: data.coord.lat,
        lon: data.coord.lon
      }
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
  }
};

export const getForecast = async (city, lat, lon) => {
  try {
    let url;
    if (city) {
      url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    } else {
      url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    }

    const response = await axios.get(url);
    const data = response.data;

    const forecast = data.list.map(item => ({
      datetime: item.dt,
      temp: Math.round(item.main.temp),
      tempMin: Math.round(item.main.temp_min),
      tempMax: Math.round(item.main.temp_max),
      humidity: item.main.humidity,
      weather: item.weather[0].description,
      weatherMain: item.weather[0].main,
      icon: item.weather[0].icon,
      windSpeed: item.wind.speed,
      pop: item.pop * 100 // Probability of precipitation
    }));

    return {
      city: data.city.name,
      country: data.city.country,
      forecast: forecast.slice(0, 40) // 5 days * 8 (3-hour intervals)
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch forecast data');
  }
};