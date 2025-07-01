import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Box, Typography } from '@mui/material';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import SearchBox from './components/SearchBox/SearchBox';
import WeatherCard from './components/WeatherCard/WeatherCard';
import ForecastCard from './components/ForecastCard/ForecastCard';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { useWeather } from './hooks/useWeather';
import { getWeatherBackground } from './utils/weatherUtils';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#74b9ff',
    },
    secondary: {
      main: '#a29bfe',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
        },
      },
    },
  },
});

function App() {
  const { currentWeather, forecast, loading, error, fetchWeatherByCity, fetchWeatherByCoords } = useWeather();
  const [backgroundStyle, setBackgroundStyle] = useState('');

  useEffect(() => {
    // Load default city on app start
    fetchWeatherByCity('New York');
  }, []);

  useEffect(() => {
    if (currentWeather) {
      const isDay = new Date().getHours() >= 6 && new Date().getHours() < 18;
      setBackgroundStyle(getWeatherBackground(currentWeather.weatherMain, isDay));
    }
  }, [currentWeather]);

  const handleSearch = (city) => {
    fetchWeatherByCity(city);
  };

  const handleLocationSearch = (lat, lon) => {
    fetchWeatherByCoords(lat, lon);
  };

  const handleRetry = () => {
    if (currentWeather) {
      fetchWeatherByCity(currentWeather.city);
    } else {
      fetchWeatherByCity('New York');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app" style={{ background: backgroundStyle }}>
        <div className="app-overlay">
          <Container maxWidth="md" className="app-container">
            <Box className="app-header">
              <Typography variant="h3" className="app-title">
                Weather App
              </Typography>
              <Typography variant="subtitle1" className="app-subtitle">
                Get real-time weather information for any city
              </Typography>
            </Box>

            <SearchBox
              onSearch={handleSearch}
              onLocationSearch={handleLocationSearch}
              loading={loading}
            />

            {loading && <LoadingSpinner />}

            {error && !loading && (
              <ErrorMessage error={error} onRetry={handleRetry} />
            )}

            {currentWeather && !loading && !error && (
              <>
                <WeatherCard weather={currentWeather} />
                <ForecastCard forecast={forecast} />
              </>
            )}
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;