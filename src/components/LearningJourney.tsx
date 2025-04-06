import React from 'react';
import { Box, Paper, Typography, Card, CardContent, Divider } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FlagIcon from '@mui/icons-material/Flag';

interface LearningJourneyProps {
  steps: string[];
}

const LearningJourney: React.FC<LearningJourneyProps> = ({ steps }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        height: '100%',
        minHeight: '400px',
        maxHeight: 'calc(100vh - 32px)',
        width: '300px',
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        display: 'flex',
        flexDirection: 'column',
        borderTopRightRadius: '10px',
        borderBottomRightRadius: '10px',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        boxShadow: '1px 0 10px rgba(0, 0, 0, 0.08)',
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1, 
        pb: 1.5,
        borderBottom: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.06)',
        mb: 2
      }}>
        <SchoolIcon sx={{ color: 'primary.main' }} />
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            color: 'primary.main', 
            fontWeight: 600,
            fontSize: '1.1rem',
            letterSpacing: '-0.01em',
            m: 0
          }}
        >
          Learning Journey
        </Typography>
      </Box>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 3,
        overflowY: 'auto',
        overflowX: 'hidden',
        flex: 1,
        pr: 1,
        pl: 0.5,
        pb: 2,
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(0,0,0,0.02)',
          borderRadius: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(37, 99, 235, 0.2)',
          borderRadius: '8px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(37, 99, 235, 0.3)',
        },
      }}>
        {steps.map((step, index) => (
          <Card 
            key={index}
            sx={{ 
              border: '1px solid',
              borderColor: 'rgba(0, 0, 0, 0.04)',
              backgroundColor: index === 0 ? 'rgba(37, 99, 235, 0.06)' : 'rgba(255, 255, 255, 0.8)',
              boxShadow: index === 0 ? '0 3px 5px rgba(0, 0, 0, 0.08)' : 'none',
              transition: 'all 0.2s ease',
              position: 'relative',
              minHeight: '200px',
              display: 'flex',
              flexDirection: 'column',
              '&::before': index === 0 ? {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '4px',
                height: '100%',
                backgroundColor: 'primary.main',
              } : {},
              '&:hover': {
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.08)',
              },
            }}
          >
            <CardContent sx={{ 
              padding: '20px 16px 24px 16px',
              '&:last-child': { paddingBottom: '24px' },
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5,
                mb: 2,
              }}>
                <Box sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  bgcolor: index === 0 ? 'primary.main' : 'grey.300',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  boxShadow: index === 0 ? '0 2px 4px rgba(37, 99, 235, 0.3)' : 'none',
                }}>
                  {index + 1}
                </Box>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 600, 
                    color: index === 0 ? 'primary.main' : 'text.primary',
                    fontSize: '1rem'
                  }}
                >
                  Stage {index + 1}
                </Typography>
                {index === 0 && (
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 0.5,
                    bgcolor: 'primary.main',
                    color: 'white',
                    py: 0.3,
                    px: 1,
                    borderRadius: '16px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    ml: 'auto',
                  }}>
                    <PlayArrowIcon fontSize="small" sx={{ fontSize: '0.875rem' }} />
                    Current
                  </Box>
                )}
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontSize: '0.95rem',
                    color: index === 0 ? 'text.primary' : 'text.secondary',
                    fontWeight: index === 0 ? 500 : 400,
                    lineHeight: 1.8,
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                  }}
                >
                  {step}
                </Typography>
                {index === steps.length - 1 && (
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 0.5,
                    mt: 2,
                    color: 'secondary.main',
                    fontSize: '0.85rem'
                  }}>
                    <FlagIcon fontSize="small" />
                    <Typography variant="caption" sx={{ fontStyle: 'italic', fontSize: '0.85rem' }}>
                      Learning plan completion
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Paper>
  );
};

export default LearningJourney; 