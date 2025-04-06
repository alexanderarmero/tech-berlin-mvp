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
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '280px'
    }}>
      {/* Main content container with fixed height to prevent layout shifts */}
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '280px',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Button container */}
        <Box
          sx={{
            position: 'relative',
            width: '140px',
            height: '140px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&::before': isListening ? {
              content: '""',
              position: 'absolute',
              width: '90%',
              height: '90%',
              borderRadius: '50%',
              background: 'linear-gradient(0deg, #2563EB, #7C3AED)',
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
              background: 'linear-gradient(0deg, #7C3AED, #2563EB)',
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
              width: 120,
              height: 120,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
              },
              transition: 'all 0.3s ease',
              transform: isListening ? 'scale(1.05)' : 'scale(1)',
              position: 'relative',
              zIndex: 1,
              ...(isListening && {
                background: 'linear-gradient(0deg, #2563EB, #7C3AED)',
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
            <MicIcon sx={{ fontSize: 48 }} />
          </Fab>
        </Box>

        {/* Visualizer with fixed height container to prevent shifts */}
        <Box sx={{ 
          height: '60px', 
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {isListening && <VoiceVisualizer isListening={isListening} />}
        </Box>

        {/* Transcript container with fixed height */}
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          alignItems: 'flex-start', 
          width: '100%',
          minHeight: '60px'
        }}>
          <Avatar
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            sx={{
              width: 40,
              height: 40,
              border: '1px solid',
              borderColor: 'primary.main',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'white',
              flexShrink: 0,
              '& img': {
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              },
            }}
          />
          <Paper
            elevation={1}
            sx={{
              p: 2,
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              minHeight: '60px',
              display: 'flex',
              alignItems: 'flex-start',
              maxWidth: 'calc(100% - 56px)',
              border: '1px solid rgba(0, 0, 0, 0.04)',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: '1rem',
                color: '#1E293B',
                textAlign: 'left',
                minHeight: '24px',
                letterSpacing: '0.01em',
                width: '100%',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
            >
              {transcript || "Tap the microphone and start speaking..."}
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default VoiceRecorder; 