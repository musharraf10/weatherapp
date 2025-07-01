import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import './LoadingSpinner.css';

export default function LoadingSpinner({ message = 'Loading weather data...' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="loading-container"
    >
      <Box className="loading-content">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <CircularProgress 
            size={60} 
            thickness={4}
            sx={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              }
            }}
          />
        </motion.div>
        <Typography variant="body1" className="loading-text">
          {message}
        </Typography>
      </Box>
    </motion.div>
  );
}