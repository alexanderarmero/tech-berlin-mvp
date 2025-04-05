import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Typography, Box } from '@mui/material';
import MessageList from './components/MessageList';
import VoiceRecorder from './components/VoiceRecorder';
import BackgroundPatterns from './components/BackgroundPatterns';
import AnimatedSubtitle from './components/AnimatedSubtitle';
import { Message } from './types';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          borderRadius: '12px',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 6px 24px rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
  },
});

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userName, setUserName] = useState<string>('there');

  useEffect(() => {
    // Extract name from messages
    const extractName = () => {
      if (messages.length > 0) {
        const latestMessage = messages[0].text.toLowerCase();
        // Look for common name indicators
        const nameMatch = latestMessage.match(/(?:my name is|i am|i'm|call me)\s+([a-zA-Z]+)/);
        if (nameMatch && nameMatch[1]) {
          const name = nameMatch[1];
          setUserName(name.charAt(0).toUpperCase() + name.slice(1));
        }
      }
    };

    extractName();
  }, [messages]);

  const handleMessageSubmit = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      timestamp: new Date(),
      isUser: true
    };
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.9) 100%)',
            zIndex: 0,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(224, 224, 224, 0.5)',
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ 
          py: 4, 
          position: 'relative', 
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 4
        }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            mb: 4,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '4px',
              background: 'linear-gradient(90deg, #42a5f5, #9c27b0, #42a5f5)',
              borderRadius: '2px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            },
          }}>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 'bold',
                color: 'primary.main',
                textAlign: 'center',
                mb: 1,
                fontSize: '2.4rem',
              }}
            >
              Personal Superhuman Teacher
            </Typography>
            
            <AnimatedSubtitle />
          </Box>

          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                color: 'text.secondary',
                fontWeight: 'medium',
                mb: 1,
              }}
            >
              Hello, {userName}!
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: 'text.secondary',
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              Share your thoughts and experiences with me. I'm here to help you learn and grow.
            </Typography>
          </Box>
          <Box sx={{ width: '100%', maxWidth: '600px' }}>
            <VoiceRecorder onMessageSubmit={handleMessageSubmit} />
          </Box>
          <Box sx={{ width: '100%', maxWidth: '1200px' }}>
            <MessageList messages={messages} />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App; 