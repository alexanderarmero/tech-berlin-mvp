import React, { useState, useEffect, useRef } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';

interface TypewriterResponseProps {
  text: string;
  typingSpeed?: number;
}

const TypewriterResponse: React.FC<TypewriterResponseProps> = ({ 
  text, 
  typingSpeed = 30 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const fullTextRef = useRef('');
  const charIndexRef = useRef(0);

  useEffect(() => {
    if (text && text !== fullTextRef.current) {
      // Reset state when text changes
      fullTextRef.current = text;
      charIndexRef.current = 0;
      setDisplayedText('');
      setIsComplete(false);
      setIsTyping(true);
    }
  }, [text]);

  useEffect(() => {
    if (!isTyping || !fullTextRef.current) return;

    const timer = setTimeout(() => {
      if (charIndexRef.current < fullTextRef.current.length) {
        setDisplayedText(prevText => prevText + fullTextRef.current.charAt(charIndexRef.current));
        charIndexRef.current += 1;
      } else {
        setIsTyping(false);
        setIsComplete(true);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [isTyping, displayedText, typingSpeed]);

  if (!text) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        my: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '12px',
        minHeight: '150px',
        width: '100%',
        border: '1px solid rgba(25, 118, 210, 0.2)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '4px',
          height: '100%',
          background: 'linear-gradient(to bottom, #1976d2, #42a5f5)',
          borderTopLeftRadius: '12px',
          borderBottomLeftRadius: '12px',
        }
      }}
    >
      <Typography
        variant="h6"
        component="h3"
        sx={{
          color: 'primary.main',
          fontWeight: 'bold',
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <span role="img" aria-label="teacher">🧠</span> Teacher's Response
        {isTyping && (
          <Box component="span" sx={{
            display: 'inline-block', 
            width: '12px', 
            height: '12px', 
            borderRadius: '50%',
            backgroundColor: 'secondary.main',
            ml: 2,
            animation: 'pulse 1s infinite',
            '@keyframes pulse': {
              '0%': { opacity: 0.4, transform: 'scale(0.8)' },
              '50%': { opacity: 1, transform: 'scale(1.2)' },
              '100%': { opacity: 0.4, transform: 'scale(0.8)' },
            }
          }} />
        )}
      </Typography>
      
      <Box sx={{ 
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '1.1rem',
        lineHeight: 1.6,
        color: 'text.primary',
      }}>
        <ReactMarkdown
          components={{
            p: ({ children }) => (
              <Typography variant="body1" sx={{ mb: 2 }}>{children}</Typography>
            ),
            h1: ({ children }) => (
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, mt: 3 }}>{children}</Typography>
            ),
            h2: ({ children }) => (
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, mt: 3 }}>{children}</Typography>
            ),
            h3: ({ children }) => (
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1.5, mt: 3 }}>{children}</Typography>
            ),
            ul: ({ children }) => (
              <Box component="ul" sx={{ pl: 4, mb: 2 }}>{children}</Box>
            ),
            ol: ({ children }) => (
              <Box component="ol" sx={{ pl: 4, mb: 2 }}>{children}</Box>
            ),
            li: ({ children }) => (
              <Typography component="li" variant="body1" sx={{ mb: 1 }}>{children}</Typography>
            ),
            code: ({ node, inline, children, ...props }) => (
              inline 
                ? <Typography component="code" sx={{ backgroundColor: 'rgba(0,0,0,0.05)', p: 0.5, borderRadius: 1 }} {...props}>{children}</Typography>
                : <Paper sx={{ p: 2, backgroundColor: 'rgba(0,0,0,0.03)', mb: 2, overflowX: 'auto' }}><pre style={{ margin: 0 }}><code {...props}>{children}</code></pre></Paper>
            ),
          }}
        >
          {displayedText}
        </ReactMarkdown>
      </Box>
    </Paper>
  );
};

export default TypewriterResponse; 