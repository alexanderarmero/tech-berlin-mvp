import React, { useState, useEffect, useRef } from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

interface TypewriterResponseProps {
  text: string;
  typingSpeed?: number;
}

const TypewriterResponse: React.FC<TypewriterResponseProps> = ({ 
  text, 
  typingSpeed = 55 
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
      // Start with the first character already displayed
      setDisplayedText(text.charAt(0));
      // Start index at 1 since we've already added the first character
      charIndexRef.current = 1;
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
      elevation={1}
      sx={{
        p: 3,
        my: 3,
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        minHeight: '150px',
        width: '100%',
        border: '1px solid rgba(37, 99, 235, 0.1)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
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
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <AutoFixHighIcon sx={{ color: '#7C3AED', mr: 1.5, fontSize: '1.2rem' }} />
        <Typography
          variant="h6"
          component="h3"
          sx={{
            color: '#1E293B',
            fontWeight: 600,
            fontSize: '1.1rem',
            letterSpacing: '-0.01em',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Tutor Response
          {isTyping && (
            <Box component="span" sx={{
              display: 'inline-block', 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%',
              backgroundColor: '#7C3AED',
              ml: 1.5,
              animation: 'pulse 1.2s infinite',
              '@keyframes pulse': {
                '0%': { opacity: 0.4, transform: 'scale(0.8)' },
                '50%': { opacity: 1, transform: 'scale(1.2)' },
                '100%': { opacity: 0.4, transform: 'scale(0.8)' },
              }
            }} />
          )}
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 2, opacity: 0.6 }} />
      
      <Box sx={{ 
        fontFamily: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '1rem',
        lineHeight: 1.7,
        color: '#1E293B',
        letterSpacing: '0.01em',
      }}>
        <ReactMarkdown
          components={{
            p: ({ children }) => (
              <Typography variant="body1" sx={{ mb: 2, color: '#1E293B', lineHeight: 1.7 }}>{children}</Typography>
            ),
            h1: ({ children }) => (
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, mt: 3, color: '#1E293B', letterSpacing: '-0.01em' }}>{children}</Typography>
            ),
            h2: ({ children }) => (
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, mt: 3, color: '#1E293B', letterSpacing: '-0.01em' }}>{children}</Typography>
            ),
            h3: ({ children }) => (
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, mt: 3, color: '#1E293B', letterSpacing: '-0.01em' }}>{children}</Typography>
            ),
            ul: ({ children }) => (
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>{children}</Box>
            ),
            ol: ({ children }) => (
              <Box component="ol" sx={{ pl: 3, mb: 2 }}>{children}</Box>
            ),
            li: ({ children }) => (
              <Typography component="li" variant="body1" sx={{ mb: 1, color: '#1E293B' }}>{children}</Typography>
            ),
            code: ({ node, inline, children, ...props }) => (
              inline 
                ? <Typography component="code" sx={{ backgroundColor: 'rgba(0,0,0,0.04)', p: 0.5, borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9em' }} {...props}>{children}</Typography>
                : <Paper sx={{ p: 2, backgroundColor: 'rgba(0,0,0,0.02)', mb: 2, overflowX: 'auto', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.05)' }}>
                    <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.9em' }}>
                      <code {...props}>{children}</code>
                    </pre>
                  </Paper>
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