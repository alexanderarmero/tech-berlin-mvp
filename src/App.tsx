import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Typography, Box, Paper } from '@mui/material';
import MessageList from './components/MessageList';
import LearningJourney from './components/LearningJourney';
import VoiceRecorder from './components/VoiceRecorder';
import BackgroundPatterns from './components/BackgroundPatterns';
import AnimatedSubtitle from './components/AnimatedSubtitle';
import TypewriterResponse from './components/TypewriterResponse';
import LoadingIndicator from './components/LoadingIndicator';
import { Message } from './types';
import { v4 as uuidv4 } from 'uuid';
import { teacherAgentApi } from './services/teacherAgentApi';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    subtitle1: {
      letterSpacing: '0.01em',
    },
    body1: {
      letterSpacing: '0.01em',
      lineHeight: 1.7,
    },
    body2: {
      letterSpacing: '0.01em',
      lineHeight: 1.7,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#2563EB', // More professional blue
      light: '#60A5FA',
      dark: '#1D4ED8',
    },
    secondary: {
      main: '#7C3AED', // More professional purple
      light: '#A78BFA',
      dark: '#5B21B6',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B',
      secondary: '#475569',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: '8px',
          padding: '8px 16px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#1E293B',
        },
      },
    },
  },
});

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userName, setUserName] = useState<string>('there');
  const [sessionId, setSessionId] = useState<string>('');
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [latestResponse, setLatestResponse] = useState<string>('');
  const [learningPlanSteps, setLearningPlanSteps] = useState<string[]>([]);

  useEffect(() => {
    // Initialize session ID or get from localStorage
    const storedSessionId = localStorage.getItem('teacherAgentSessionId');
    if (storedSessionId) {
      console.log('Using existing session ID:', storedSessionId);
      setSessionId(storedSessionId);
    } else {
      const newSessionId = uuidv4();
      console.log('Created new session ID:', newSessionId);
      localStorage.setItem('teacherAgentSessionId', newSessionId);
      setSessionId(newSessionId);
    }

    // Check API health on mount
    const checkApiHealth = async () => {
      try {
        const healthResult = await teacherAgentApi.checkHealth();
        console.log('Teacher Agent API health check result:', healthResult);
      } catch (error) {
        console.error('Teacher Agent API is not available:', error);
      }
    };
    
    checkApiHealth();
  }, []);

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

  const handleMessageSubmit = async (text: string) => {
    console.log('Message submitted:', text);
    console.log('Current session ID:', sessionId);
    
    // Create user message
    const userMessage: Message = {
      id: Date.now(),
      text,
      timestamp: new Date(),
      isUser: true
    };
    
    setMessages((prevMessages) => [userMessage, ...prevMessages]);
    
    // Call the Teacher Agents API if we have a session ID
    if (sessionId) {
      setApiLoading(true);
      console.log('Sending message to Teacher Agent API...');
      
      try {
        const response = await teacherAgentApi.sendMessage(sessionId, text);
        console.log('Received response from Teacher Agent API:', response);
        
        // Set the latest response for the typewriter effect
        setLatestResponse(response.reply);
        
        // Check if learning plan steps are available
        if (response.learning_plan_steps && response.learning_plan_steps.length > 0) {
          console.log('Learning plan steps detected:', response.learning_plan_steps);
          setLearningPlanSteps(response.learning_plan_steps);
        }
        
        // Create teacher response message
        const teacherMessage: Message = {
          id: Date.now() + 1,
          text: response.reply,
          timestamp: new Date(),
          isUser: false
        };
        
        setMessages((prevMessages) => [teacherMessage, ...prevMessages]);
      } catch (error) {
        console.error('Error getting response from Teacher Agent:', error);
        
        const errorText = "I'm sorry, I'm having trouble connecting to my knowledge base. Please try again in a moment.";
        
        // Set the error message for the typewriter effect
        setLatestResponse(errorText);
        
        // Create error message
        const errorMessage: Message = {
          id: Date.now() + 1,
          text: errorText,
          timestamp: new Date(),
          isUser: false
        };
        
        setMessages((prevMessages) => [errorMessage, ...prevMessages]);
      } finally {
        setApiLoading(false);
      }
    } else {
      console.error('No session ID available for API call');
    }
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
        <BackgroundPatterns />
        
        <Container maxWidth="lg" sx={{ 
          py: 4, 
          position: 'relative', 
          zIndex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          minHeight: '100vh',
          gap: 2,
          pt: 4,
          pb: 8
        }}>
          {/* Left sidebar - Message List or Learning Journey */}
          <Box sx={{ 
            width: '300px',
            height: 'calc(100vh - 16px)', 
            position: 'fixed',
            top: 8,
            left: 0,
            overflowY: 'auto',
            zIndex: 10,
            pl: 2
          }}>
            {learningPlanSteps.length > 0 ? (
              <LearningJourney steps={learningPlanSteps} />
            ) : (
              <MessageList messages={messages} />
            )}
          </Box>
          
          {/* Main content area */}
          <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 2,
            ml: '300px', /* Add margin to account for fixed sidebar */
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
                bottom: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '3px',
                background: theme.palette.primary.main,
                borderRadius: '2px',
                opacity: 0.7,
              },
            }}>
              <Typography 
                variant="h3" 
                component="h1" 
                sx={{ 
                  fontWeight: 700,
                  color: theme.palette.primary.dark,
                  textAlign: 'center',
                  mb: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {learningPlanSteps.length > 0 ? 'Learning Journey' : 'Personal Learning Assistant'}
              </Typography>
              
              <AnimatedSubtitle />
            </Box>

            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography 
                variant="h5" 
                component="h2" 
                sx={{ 
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                Hello, {userName}!
              </Typography>
              {!latestResponse && (
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    maxWidth: '600px',
                    mx: 'auto',
                    lineHeight: 1.6,
                    fontWeight: 400,
                  }}
                >
                  Share your thoughts and experiences with me. I'm here to help you learn and grow.
                </Typography>
              )}
            </Box>

            {/* Display the latest response with typewriter effect or loading state */}
            {apiLoading ? (
              <Box sx={{ width: '100%', maxWidth: '800px' }}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 3,
                    my: 3,
                    backgroundColor: '#FFFFFF',
                    borderRadius: '10px',
                    minHeight: '100px',
                    width: '100%',
                    border: '1px solid rgba(37, 99, 235, 0.1)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    opacity: 0.5,
                  }}
                >
                  <Box 
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      background: 'linear-gradient(to right, #2563EB, #7C3AED)',
                      opacity: 0.8,
                    }}
                  />
                  <LoadingIndicator />
                </Paper>
              </Box>
            ) : latestResponse && (
              <Box sx={{ width: '100%', maxWidth: '800px' }}>
                <TypewriterResponse text={latestResponse} typingSpeed={10} />
              </Box>
            )}

            <Box sx={{ width: '100%', maxWidth: '600px' }}>
              <VoiceRecorder onMessageSubmit={handleMessageSubmit} />
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App; 