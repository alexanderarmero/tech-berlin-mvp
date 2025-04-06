import React from 'react';
import { Box, Paper, Typography, Grid, IconButton, Collapse, Avatar } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const [expandedMessage, setExpandedMessage] = React.useState<number | null>(null);

  const handleClick = (messageId: number) => {
    setExpandedMessage(expandedMessage === messageId ? null : messageId);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        height: '100%',
        minHeight: '400px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        Messages
      </Typography>
      {messages.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
          No messages yet
        </Typography>
      ) : (
        <Grid container spacing={1}>
          {messages.map((message, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.5)', // 50% transparent primary blue
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover::before': {
                    opacity: 1,
                  },
                  backgroundColor: expandedMessage === index ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                }}
                onClick={() => handleClick(index)}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}>
                    Message {messages.length - index}
                  </Typography>
                  <IconButton size="small" sx={{ p: 0.5 }}>
                    {expandedMessage === index ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 1,
                  gap: 1,
                }}>
                  {!message.isUser && (
                    <Avatar 
                      src="https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                      sx={{ 
                        width: 60, 
                        height: 60,
                        border: '2px solid',
                        borderColor: 'secondary.main',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                  )}
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {message.isUser ? 'You' : 'AI Teacher'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(message.timestamp)}
                    </Typography>
                  </Box>
                </Box>
                <Collapse in={expandedMessage === index} timeout="auto" unmountOnExit>
                  <Paper
                    elevation={0}
                    sx={{
                      mt: 1,
                      p: 1,
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      borderRadius: '4px',
                    }}
                  >
                    {message.isUser ? (
                      <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{message.text}</Typography>
                    ) : (
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => (
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', mb: 1 }}>{children}</Typography>
                          ),
                          h1: ({ children }) => (
                            <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold', mb: 1 }}>{children}</Typography>
                          ),
                          h2: ({ children }) => (
                            <Typography variant="subtitle1" sx={{ fontSize: '0.9rem', fontWeight: 'bold', mb: 1 }}>{children}</Typography>
                          ),
                          h3: ({ children }) => (
                            <Typography variant="subtitle2" sx={{ fontSize: '0.85rem', fontWeight: 'bold', mb: 1 }}>{children}</Typography>
                          ),
                          ul: ({ children }) => (
                            <Box component="ul" sx={{ pl: 2, mb: 1 }}>{children}</Box>
                          ),
                          ol: ({ children }) => (
                            <Box component="ol" sx={{ pl: 2, mb: 1 }}>{children}</Box>
                          ),
                          li: ({ children }) => (
                            <Typography component="li" variant="body2" sx={{ fontSize: '0.8rem', mb: 0.5 }}>{children}</Typography>
                          ),
                          code: ({ node, inline, children, ...props }) => (
                            inline 
                              ? <Typography component="code" sx={{ backgroundColor: 'rgba(0,0,0,0.05)', p: 0.3, borderRadius: 0.5 }} {...props}>{children}</Typography>
                              : <Paper sx={{ p: 1, backgroundColor: 'rgba(0,0,0,0.03)', mb: 1, overflowX: 'auto' }}><pre style={{ margin: 0 }}><code {...props}>{children}</code></pre></Paper>
                          ),
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>
                    )}
                  </Paper>
                </Collapse>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  );
};

export default MessageList; 