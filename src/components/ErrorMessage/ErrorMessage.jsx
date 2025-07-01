import { Alert, AlertTitle, Button, Box } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import './ErrorMessage.css';

export default function ErrorMessage({ error, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="error-container"
    >
      <Alert 
        severity="error" 
        className="error-alert"
        action={
          onRetry && (
            <Button
              color="inherit"
              size="small"
              onClick={onRetry}
              startIcon={<RefreshIcon />}
            >
              Retry
            </Button>
          )
        }
      >
        <AlertTitle>Weather Data Unavailable</AlertTitle>
        {error || 'Unable to fetch weather information. Please try again.'}
      </Alert>
    </motion.div>
  );
}