import React from 'react';
import { Box, Fab, Paper, Typography, Avatar } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import VoiceVisualizer from './VoiceVisualizer';

interface VoiceRecorderProps {
  onMessageSubmit: (text: string) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onMessageSubmit }) => {
  const [isListening, setIsListening] = React.useState(false);
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const handleStartListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    if (transcript.trim()) {
      onMessageSubmit(transcript);
      resetTranscript();
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <Typography>Browser doesn't support speech recognition.</Typography>;
  }

  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px'
    }}>
      <Box
        sx={{
          position: 'relative',
          width: '320px',
          height: '320px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': isListening ? {
            content: '""',
            position: 'absolute',
            width: '90%',
            height: '90%',
            borderRadius: '50%',
            background: 'linear-gradient(0deg, #1565c0, #00c853, #00bcd4, #9c27b0, #1565c0)',
            backgroundSize: '200% 200%',
            animation: 'gradient 0.8s linear infinite',
            opacity: 0.15,
          } : {},
          '&::after': isListening ? {
            content: '""',
            position: 'absolute',
            width: '85%',
            height: '85%',
            borderRadius: '50%',
            background: 'linear-gradient(0deg, #9c27b0, #1565c0, #00c853, #00bcd4, #9c27b0)',
            backgroundSize: '200% 200%',
            animation: 'gradient 0.8s linear infinite',
            animationDelay: '0.4s',
            opacity: 0.11,
          } : {},
          '@keyframes gradient': {
            '0%': {
              backgroundPosition: '0% 0%',
            },
            '100%': {
              backgroundPosition: '0% 100%',
            },
          },
        }}
      >
        <Fab
          color={isListening ? "secondary" : "primary"}
          onClick={isListening ? handleStopListening : handleStartListening}
          sx={{
            width: 240,
            height: 240,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              boxShadow: '0 6px 24px rgba(0, 0, 0, 0.15)',
            },
            transition: 'all 0.3s ease',
            transform: isListening ? 'scale(1.1)' : 'scale(1)',
            position: 'relative',
            zIndex: 1,
            ...(isListening && {
              background: 'linear-gradient(0deg, #1565c0, #00c853, #00bcd4, #9c27b0)',
              backgroundSize: '100% 200%',
              animation: 'buttonGradient 0.6s linear infinite',
              '@keyframes buttonGradient': {
                '0%': {
                  backgroundPosition: '0% 0%',
                },
                '100%': {
                  backgroundPosition: '0% 100%',
                },
              },
            }),
          }}
        >
          <MicIcon sx={{ fontSize: 96 }} />
        </Fab>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        width: '100%',
        maxWidth: '600px',
        mx: 'auto',
      }}>
        {isListening && <VoiceVisualizer isListening={isListening} />}

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', width: '100%' }}>
          <Box
            sx={{
              position: 'relative',
              width: 60,
              height: 60,
              '&::before': isListening ? {
                content: '""',
                position: 'absolute',
                width: '120%',
                height: '120%',
                top: '-10%',
                left: '-10%',
                borderRadius: '50%',
                background: 'linear-gradient(0deg, #1565c0, #00c853, #00bcd4, #9c27b0, #1565c0)',
                backgroundSize: '200% 200%',
                animation: 'gradient 0.8s linear infinite',
                opacity: 0.15,
              } : {},
              '&::after': isListening ? {
                content: '""',
                position: 'absolute',
                width: '110%',
                height: '110%',
                top: '-5%',
                left: '-5%',
                borderRadius: '50%',
                background: 'linear-gradient(0deg, #9c27b0, #1565c0, #00c853, #00bcd4, #9c27b0)',
                backgroundSize: '200% 200%',
                animation: 'gradient 0.8s linear infinite',
                animationDelay: '0.4s',
                opacity: 0.11,
              } : {},
              '@keyframes gradient': {
                '0%': {
                  backgroundPosition: '0% 0%',
                },
                '100%': {
                  backgroundPosition: '0% 100%',
                },
              },
            }}
          >
            <Avatar
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              sx={{
                width: 60,
                height: 60,
                border: '2px solid',
                borderColor: 'primary.main',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'white',
                flexShrink: 0,
                '& img': {
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                },
              }}
            />
          </Box>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              minHeight: '60px',
              display: 'flex',
              alignItems: 'flex-start',
              width: '150%',
              maxWidth: '900px',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.3rem',
                color: 'rgba(0, 0, 0, 0.7)',
                textAlign: 'left',
                minHeight: '24px',
                letterSpacing: '0.5px',
                width: '100%',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
            >
              {transcript}
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default VoiceRecorder; 