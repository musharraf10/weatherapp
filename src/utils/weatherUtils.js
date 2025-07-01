export const getWeatherIcon = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const getWeatherBackground = (weatherMain, isDay = true) => {
  const backgrounds = {
    Clear: isDay 
      ? 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)'
      : 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
    Clouds: 'linear-gradient(135deg, #ddd6fe 0%, #8b5cf6 100%)',
    Rain: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
    Drizzle: 'linear-gradient(135deg, #81ecec 0%, #00b894 100%)',
    Thunderstorm: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
    Snow: 'linear-gradient(135deg, #ddd6fe 0%, #a29bfe 100%)',
    Mist: 'linear-gradient(135deg, #b2bec3 0%, #636e72 100%)',
    Fog: 'linear-gradient(135deg, #b2bec3 0%, #636e72 100%)',
    Haze: 'linear-gradient(135deg, #fab1a0 0%, #e17055 100%)'
  };

  return backgrounds[weatherMain] || backgrounds.Clear;
};

export const formatTime = (timestamp, timezone = 0) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    timeZone: 'UTC'
  });
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

export const getWindDirection = (degrees) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

export const getAirQualityLevel = (aqi) => {
  if (aqi <= 50) return { level: 'Good', color: '#00e676' };
  if (aqi <= 100) return { level: 'Moderate', color: '#ffeb3b' };
  if (aqi <= 150) return { level: 'Unhealthy for Sensitive', color: '#ff9800' };
  if (aqi <= 200) return { level: 'Unhealthy', color: '#f44336' };
  if (aqi <= 300) return { level: 'Very Unhealthy', color: '#9c27b0' };
  return { level: 'Hazardous', color: '#795548' };
};