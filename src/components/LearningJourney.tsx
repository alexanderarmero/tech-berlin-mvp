import React from 'react';
import { Box, Paper, Typography, Card, CardContent, Stepper, Step, StepLabel, StepContent } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { StepIconProps } from '@mui/material/StepIcon';

interface LearningJourneyProps {
  steps: string[];
}

// Custom step icon component
const CustomStepIcon = (props: StepIconProps) => {
  const { active, completed, icon } = props;
  
  return (
    <Box sx={{ 
      color: active ? 'primary.main' : completed ? 'primary.main' : 'grey.500',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {active ? (
        <PlayArrowIcon />
      ) : completed ? (
        <CheckCircleIcon />
      ) : (
        <Box 
          sx={{ 
            width: 24, 
            height: 24, 
            borderRadius: '50%', 
            bgcolor: 'grey.400',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: 'bold'
          }}
        >
          {icon}
        </Box>
      )}
    </Box>
  );
};

const LearningJourney: React.FC<LearningJourneyProps> = ({ steps }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        height: '100%',
        minHeight: '400px',
        maxHeight: 'calc(100vh - 32px)',
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
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
        gap: 1.5,
        overflowY: 'auto',
        flex: 1,
        pr: 1,
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
        <Stepper orientation="vertical" activeStep={0}>
          {steps.map((step, index) => (
            <Step key={index} completed={index === 0}>
              <StepLabel 
                StepIconComponent={CustomStepIcon}
                sx={{
                  '& .MuiStepIcon-root': {
                    color: index === 0 ? 'primary.main' : 'grey.500',
                  },
                  '& .MuiStepIcon-text': {
                    fill: '#fff',
                    fontWeight: 'bold',
                  }
                }}
              >
                <Typography sx={{ fontWeight: 600, color: index === 0 ? 'primary.main' : 'text.primary' }}>
                  Stage {index + 1}
                </Typography>
              </StepLabel>
              <StepContent>
                <Card sx={{ 
                  mb: 2, 
                  border: '1px solid',
                  borderColor: 'rgba(0, 0, 0, 0.04)',
                  backgroundColor: index === 0 ? 'rgba(37, 99, 235, 0.06)' : 'rgba(255, 255, 255, 0.8)',
                  boxShadow: index === 0 ? '0 2px 4px rgba(0, 0, 0, 0.05)' : 'none',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden',
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
                    transform: 'translateY(-1px)',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
                  },
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      {index === 0 && (
                        <CheckCircleIcon 
                          fontSize="small" 
                          sx={{ 
                            color: 'primary.main',
                            mt: 0.4
                          }} 
                        />
                      )}
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontSize: '0.9rem',
                          color: index === 0 ? 'text.primary' : 'text.secondary',
                          fontWeight: index === 0 ? 500 : 400
                        }}
                      >
                        {step}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Paper>
  );
};

export default LearningJourney; 