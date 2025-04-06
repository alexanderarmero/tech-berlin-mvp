import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, keyframes } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';

// Create a pulsing animation keyframe
const pulse = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.3);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(124, 58, 237, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(124, 58, 237, 0);
  }
`;

const LoadingIndicator: React.FC = () => {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 2 
    }}>
      <Avatar
        sx={{
          bgcolor: 'secondary.light',
          animation: `${pulse} 2s infinite`,
          width: 36,
          height: 36,
        }}
      >
        <SmartToyIcon fontSize="small" />
      </Avatar>
      <Typography sx={{ 
        fontStyle: 'italic', 
        fontWeight: 500,
        color: 'text.secondary',
        display: 'flex',
        alignItems: 'center'
      }}>
        AI Tutor is thinking
        <Box component="span" sx={{ 
          display: 'inline-block', 
          width: '4px', 
          textAlign: 'left',
          ml: 0.5
        }}>
          <Box 
            component="span" 
            sx={{ 
              opacity: dots.length >= 1 ? 1 : 0, 
              transition: 'opacity 0.2s',
              ml: '1px'
            }}
          >.</Box>
          <Box 
            component="span" 
            sx={{ 
              opacity: dots.length >= 2 ? 1 : 0, 
              transition: 'opacity 0.2s',
              ml: '1px'
            }}
          >.</Box>
          <Box 
            component="span" 
            sx={{ 
              opacity: dots.length >= 3 ? 1 : 0, 
              transition: 'opacity 0.2s',
              ml: '1px'
            }}
          >.</Box>
        </Box>
      </Typography>
    </Box>
  );
};

export default LoadingIndicator; 