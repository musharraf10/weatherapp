import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import { getWeatherIcon, formatDate } from '../../utils/weatherUtils';
import './ForecastCard.css';

export default function ForecastCard({ forecast }) {
  if (!forecast || !forecast.forecast) return null;

  // Group forecast by day (take first entry of each day)
  const dailyForecast = [];
  const seenDates = new Set();
  
  forecast.forecast.forEach(item => {
    const date = new Date(item.datetime * 1000).toDateString();
    if (!seenDates.has(date) && dailyForecast.length < 5) {
      seenDates.add(date);
      dailyForecast.push(item);
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="forecast-container"
    >
      <Card className="forecast-card" elevation={0}>
        <CardContent className="forecast-content">
          <Typography variant="h6" className="forecast-title">
            5-Day Forecast
          </Typography>
          
          <Grid container spacing={1} className="forecast-grid">
            {dailyForecast.map((day, index) => (
              <Grid item xs={12} key={index}>
                <motion.div
                  className="forecast-item"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box className="forecast-day">
                    <Typography variant="body2" className="day-name">
                      {index === 0 ? 'Today' : formatDate(day.datetime)}
                    </Typography>
                  </Box>
                  
                  <Box className="forecast-weather">
                    <img 
                      src={getWeatherIcon(day.icon)} 
                      alt={day.weather}
                      className="forecast-icon"
                    />
                    <Typography variant="caption" className="forecast-desc">
                      {day.weather}
                    </Typography>
                  </Box>
                  
                  <Box className="forecast-temp">
                    <Typography variant="body2" className="temp-high">
                      {day.tempMax}°
                    </Typography>
                    <Typography variant="body2" className="temp-low">
                      {day.tempMin}°
                    </Typography>
                  </Box>
                  
                  <Box className="forecast-details">
                    <Typography variant="caption" className="humidity">
                      💧 {day.humidity}%
                    </Typography>
                    {day.pop > 0 && (
                      <Typography variant="caption" className="precipitation">
                        🌧️ {Math.round(day.pop)}%
                      </Typography>
                    )}
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </motion.div>
  );
}