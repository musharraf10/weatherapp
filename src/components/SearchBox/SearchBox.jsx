import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Autocomplete,
  Box,
  InputAdornment,
  IconButton,
  Chip
} from '@mui/material';
import {
  Search as SearchIcon,
  MyLocation as MyLocationIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { weatherAPI } from '../../services/api';
import { useGeolocation } from '../../hooks/useGeolocation';
import './SearchBox.css';

export default function SearchBox({ onSearch, onLocationSearch, loading }) {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  
  const { location, loading: locationLoading, getCurrentLocation } = useGeolocation();

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (location) {
      onLocationSearch(location.lat, location.lon);
    }
  }, [location, onLocationSearch]);

  const searchCities = async (searchQuery) => {
    if (searchQuery.length < 2) {
      setCities([]);
      return;
    }

    setSearchLoading(true);
    try {
      const results = await weatherAPI.searchCities(searchQuery);
      setCities(results);
    } catch (error) {
      console.error('Failed to search cities:', error);
      setCities([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearch = (city) => {
    if (city) {
      onSearch(city.name || city);
      
      // Add to recent searches
      const newSearch = typeof city === 'string' ? city : city.displayName;
      const updated = [newSearch, ...recentSearches.filter(s => s !== newSearch)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      
      setQuery('');
    }
  };

  const handleLocationClick = () => {
    getCurrentLocation();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <motion.div
      className="search-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box className="search-box">
        <Autocomplete
          freeSolo
          options={cities}
          getOptionLabel={(option) => option.displayName || option}
          loading={searchLoading}
          onInputChange={(event, newValue) => {
            setQuery(newValue);
            searchCities(newValue);
          }}
          onChange={(event, newValue) => {
            if (newValue) {
              handleSearch(newValue);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for a city"
              variant="outlined"
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleLocationClick}
                      disabled={locationLoading || loading}
                      color="primary"
                      title="Use current location"
                    >
                      <MyLocationIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}
          className="search-input"
        />
      </Box>

      {recentSearches.length > 0 && (
        <motion.div
          className="recent-searches"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Box className="recent-header">
            <span>Recent Searches</span>
            <IconButton size="small" onClick={clearRecentSearches}>
              <ClearIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box className="recent-chips">
            {recentSearches.map((search, index) => (
              <Chip
                key={index}
                label={search}
                onClick={() => handleSearch(search)}
                variant="outlined"
                size="small"
                className="recent-chip"
              />
            ))}
          </Box>
        </motion.div>
      )}
    </motion.div>
  );
}