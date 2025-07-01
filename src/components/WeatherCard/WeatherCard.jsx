import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Grid,
  Divider
} from '@mui/material';
import {
  Thermostat,
  Water,
  Visibility,
  Air,
  WbSunny,
  NightsStay,
  Compress
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { getWeatherIcon, formatTime, getWindDirection } from '../../utils/weatherUtils';
import './WeatherCard.css';

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  const isDay = new Date().getHours() >= 6 && new Date().getHours() < 18;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="weather-card-container"
    >
      <Card className="weather-card" elevation={0}>
        <CardContent className="weather-content">
          {/* Header */}
          <Box className="weather-header">
            <Box>
              <Typography variant="h4" className="city-name">
                {weather.city}
              </Typography>
              <Typography variant="subtitle1" className="country-name">
                {weather.country}
              </Typography>
            </Box>
            <Chip 
              label={weather.weather} 
              className="weather-chip"
              size="small"
            />
          </Box>

          {/* Main Temperature */}
          <Box className="temperature-section">
            <Box className="temp-display">
              <img 
                src={getWeatherIcon(weather.icon)} 
                alt={weather.weather}
                className="weather-icon"
              />
              <Typography variant="h1" className="temperature">
                {weather.temp}°
              </Typography>
            </Box>
            <Typography variant="body1" className="feels-like">
              Feels like {weather.feelsLike}°
            </Typography>
            <Box className="temp-range">
              <Typography variant="body2">
                H: {weather.tempMax}° L: {weather.tempMin}°
              </Typography>
            </Box>
          </Box>

          <Divider className="divider" />

          {/* Weather Details Grid */}
          <Grid container spacing={2} className="details-grid">
            <Grid item xs={6} sm={4}>
              <Box className="detail-item">
                <Water className="detail-icon" />
                <Typography variant="caption" className="detail-label">
                  Humidity
                </Typography>
                <Typography variant="body2" className="detail-value">
                  {weather.humidity}%
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6} sm={4}>
              <Box className="detail-item">
                <Air className="detail-icon" />
                <Typography variant="caption" className="detail-label">
                  Wind
                </Typography>
                <Typography variant="body2" className="detail-value">
                  {weather.windSpeed} m/s {getWindDirection(weather.windDirection)}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6} sm={4}>
              <Box className="detail-item">
                <Visibility className="detail-icon" />
                <Typography variant="caption" className="detail-label">
                  Visibility
                </Typography>
                <Typography variant="body2" className="detail-value">
                  {weather.visibility} km
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6} sm={4}>
              <Box className="detail-item">
                <Compress className="detail-icon" />
                <Typography variant="caption" className="detail-label">
                  Pressure
                </Typography>
                <Typography variant="body2" className="detail-value">
                  {weather.pressure} hPa
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6} sm={4}>
              <Box className="detail-item">
                <WbSunny className="detail-icon" />
                <Typography variant="caption" className="detail-label">
                  Sunrise
                </Typography>
                <Typography variant="body2" className="detail-value">
                  {formatTime(weather.sunrise, weather.timezone)}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6} sm={4}>
              <Box className="detail-item">
                <NightsStay className="detail-icon" />
                <Typography variant="caption" className="detail-label">
                  Sunset
                </Typography>
                <Typography variant="body2" className="detail-value">
                  {formatTime(weather.sunset, weather.timezone)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </motion.div>
  );
}