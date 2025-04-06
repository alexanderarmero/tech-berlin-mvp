import React from 'react';
import { Box, Paper, Typography, IconButton, Collapse, Avatar, Divider } from '@mui/material';
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
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          color: 'primary.main', 
          fontWeight: 600,
          fontSize: '1.1rem',
          letterSpacing: '-0.01em',
          pb: 1.5,
          borderBottom: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.06)',
          mb: 2
        }}
      >
        Conversation History
      </Typography>
      {messages.length === 0 ? (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100%',
          opacity: 0.7 
        }}>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              textAlign: 'center',
              fontStyle: 'italic'
            }}
          >
            Your conversation will appear here
          </Typography>
        </Box>
      ) : (
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
          {messages.map((message, index) => (
            <Paper
              elevation={0}
              sx={{
                p: 1.5,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: 'rgba(0, 0, 0, 0.04)',
                backgroundColor: message.isUser 
                  ? 'rgba(37, 99, 235, 0.03)' 
                  : 'rgba(124, 58, 237, 0.03)',
                '&:hover': {
                  backgroundColor: message.isUser 
                    ? 'rgba(37, 99, 235, 0.07)' 
                    : 'rgba(124, 58, 237, 0.07)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                },
              }}
              onClick={() => handleClick(index)}
              key={index}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="subtitle2" sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'text.secondary',
                  opacity: 0.8
                }}>
                  {index === 0 ? 'Latest' : `Message ${messages.length - index}`}
                </Typography>
                <IconButton 
                  size="small" 
                  sx={{ 
                    p: 0.3, 
                    color: 'text.secondary',
                    opacity: 0.7
                  }}
                >
                  {expandedMessage === index ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
                </IconButton>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
              }}>
                {!message.isUser ? (
                  <Avatar 
                    src="https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                    sx={{ 
                      width: 32, 
                      height: 32,
                      border: '1px solid',
                      borderColor: 'secondary.light',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: 'primary.light',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      border: '1px solid',
                      borderColor: 'primary.main',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    {message.isUser && 'You'.charAt(0)}
                  </Avatar>
                )}
                <Box>
                  <Typography variant="subtitle1" sx={{ 
                    fontWeight: 600, 
                    fontSize: '0.85rem',
                    color: message.isUser ? 'primary.dark' : 'secondary.dark',
                    lineHeight: 1.2
                  }}>
                    {message.isUser ? 'You' : 'AI Tutor'}
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    fontSize: '0.7rem',
                    color: 'text.secondary',
                    opacity: 0.7
                  }}>
                    {formatDate(message.timestamp)}
                  </Typography>
                </Box>
              </Box>
              <Collapse in={expandedMessage === index} timeout="auto" unmountOnExit>
                <Divider sx={{ my: 1.5, opacity: 0.6 }} />
                <Paper
                  elevation={0}
                  sx={{
                    p: 1.5,
                    backgroundColor: 'rgba(0, 0, 0, 0.01)',
                    borderRadius: '6px',
                  }}
                >
                  {message.isUser ? (
                    <Typography variant="body2" sx={{ 
                      fontSize: '0.8rem',
                      color: 'text.primary',
                      opacity: 0.9,
                    }}>
                      {message.text}
                    </Typography>
                  ) : (
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <Typography variant="body2" sx={{ fontSize: '0.8rem', mb: 1, lineHeight: 1.6 }}>{children}</Typography>
                        ),
                        h1: ({ children }) => (
                          <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600, mb: 1 }}>{children}</Typography>
                        ),
                        h2: ({ children }) => (
                          <Typography variant="subtitle1" sx={{ fontSize: '0.9rem', fontWeight: 600, mb: 1 }}>{children}</Typography>
                        ),
                        h3: ({ children }) => (
                          <Typography variant="subtitle2" sx={{ fontSize: '0.85rem', fontWeight: 600, mb: 1 }}>{children}</Typography>
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
                            ? <Typography component="code" sx={{ backgroundColor: 'rgba(0,0,0,0.04)', p: 0.3, borderRadius: 0.5, fontSize: '0.75rem' }} {...props}>{children}</Typography>
                            : <Paper sx={{ p: 1, backgroundColor: 'rgba(0,0,0,0.02)', mb: 1, overflowX: 'auto', borderRadius: '4px' }}><pre style={{ margin: 0, fontSize: '0.75rem' }}><code {...props}>{children}</code></pre></Paper>
                        ),
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                  )}
                </Paper>
              </Collapse>
            </Paper>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default MessageList; 