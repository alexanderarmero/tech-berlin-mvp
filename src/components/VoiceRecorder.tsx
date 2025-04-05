import React from 'react';
import { Box, Fab, Paper, Typography, Avatar } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import PersonIcon from '@mui/icons-material/Person';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import VoiceVisualizer from './VoiceVisualizer';
import TeacherResponse from './TeacherResponse';

interface VoiceRecorderProps {
  onMessageSubmit: (text: string) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onMessageSubmit }) => {
  const [isListening, setIsListening] = React.useState(false);
  const [teacherResponse, setTeacherResponse] = React.useState('');
  
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
      // Simulate teacher's response (replace this with actual AI response)
      setTeacherResponse(`Thank you for sharing your thoughts. I understand that you said: "${transcript}". Let me help you analyze and reflect on this.`);
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
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(25,118,210,0.2) 0%, rgba(25,118,210,0) 70%)',
            animation: 'pulse 2s infinite',
          } : {},
          '&::after': isListening ? {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(25,118,210,0.1) 0%, rgba(25,118,210,0) 70%)',
            animation: 'pulse 2s infinite',
            animationDelay: '1s',
          } : {},
          '@keyframes pulse': {
            '0%': {
              transform: 'scale(1)',
              opacity: 1,
            },
            '100%': {
              transform: 'scale(1.5)',
              opacity: 0,
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

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          width: '100%',
        }}>
          <Avatar 
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            sx={{ 
              width: 60, 
              height: 60,
              border: '2px solid',
              borderColor: 'primary.main',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'white',
            }}
          />
          <Paper
            elevation={2}
            sx={{
              p: 3,
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              minHeight: '60px',
              display: 'flex',
              alignItems: 'center',
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
              }}
            >
              {transcript}
            </Typography>
          </Paper>
        </Box>
      </Box>

      {teacherResponse && <TeacherResponse response={teacherResponse} />}
    </Box>
  );
};

export default VoiceRecorder; 