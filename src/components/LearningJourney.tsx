import React from 'react';
import { Box, Paper, Typography, Card, CardContent, Divider } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FlagIcon from '@mui/icons-material/Flag';

interface LearningJourneyProps {
  steps: string[];
  current_step_index?: number;
}

const LearningJourney: React.FC<LearningJourneyProps> = ({ steps, current_step_index = 0 }) => {
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
        {steps.map((step, index) => {
          // Determine step state
          const isCompleted = index < current_step_index;
          const isCurrent = index === current_step_index;
          const isFuture = index > current_step_index;
          
          return (
            <Card 
              key={index}
              sx={{ 
                border: '1px solid',
                borderColor: 'rgba(0, 0, 0, 0.04)',
                backgroundColor: isCurrent 
                  ? 'rgba(37, 99, 235, 0.06)' 
                  : isCompleted 
                    ? 'rgba(16, 185, 129, 0.05)' 
                    : 'rgba(255, 255, 255, 0.8)',
                boxShadow: isCurrent 
                  ? '0 3px 5px rgba(0, 0, 0, 0.08)' 
                  : isCompleted 
                    ? '0 2px 4px rgba(16, 185, 129, 0.15)' 
                    : 'none',
                transition: 'all 0.2s ease',
                position: 'relative',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                '&::before': (isCurrent || isCompleted) ? {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '100%',
                  backgroundColor: isCompleted ? 'success.main' : 'primary.main',
                } : {},
                '&:hover': {
                  backgroundColor: isCurrent 
                    ? 'rgba(37, 99, 235, 0.1)' 
                    : isCompleted 
                      ? 'rgba(16, 185, 129, 0.08)' 
                      : 'rgba(0, 0, 0, 0.02)',
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
                    bgcolor: isCompleted 
                      ? 'success.main' 
                      : isCurrent 
                        ? 'primary.main' 
                        : 'grey.300',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    boxShadow: (isCurrent || isCompleted) 
                      ? `0 2px 4px ${isCompleted ? 'rgba(16, 185, 129, 0.3)' : 'rgba(37, 99, 235, 0.3)'}` 
                      : 'none',
                  }}>
                    {isCompleted ? (
                      <CheckCircleIcon fontSize="small" />
                    ) : (
                      index + 1
                    )}
                  </Box>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 600, 
                      color: isCompleted 
                        ? 'success.dark' 
                        : isCurrent 
                          ? 'primary.main' 
                          : 'text.primary',
                      fontSize: '1rem'
                    }}
                  >
                    Stage {index + 1}
                  </Typography>
                  {isCurrent && (
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
                  
                  {isCompleted && (
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 0.5,
                      bgcolor: 'success.main',
                      color: 'white',
                      py: 0.3,
                      px: 1,
                      borderRadius: '16px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      ml: 'auto',
                    }}>
                      <CheckCircleIcon fontSize="small" sx={{ fontSize: '0.875rem' }} />
                      Completed
                    </Box>
                  )}
                </Box>
                <Divider sx={{ 
                  mb: 2,
                  borderColor: isCompleted ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0, 0, 0, 0.06)'
                }} />
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontSize: '0.95rem',
                      color: isCompleted 
                        ? 'success.dark' 
                        : isCurrent 
                          ? 'text.primary' 
                          : 'text.secondary',
                      fontWeight: isCurrent ? 500 : 400,
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
                      color: isCompleted ? 'success.main' : 'secondary.main',
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
          );
        })}
      </Box>
    </Paper>
  );
};

export default LearningJourney; 