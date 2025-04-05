import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const words = [
  "learn",
  "evaluate",
  "plan",
  "iterate",
  "brainstorm",
  "gather information",
  "test assumptions",
  "achieve better results",
  "excell",
  "progress faster",
  "understand yourself better than anyone else",
  "record your daily thoughts",
  "fill your knowledge gaps",
  "explain you complex knowledge",
  "memorize intuitively",
  "learn efficiently",
  "excell and grow",
  "advice and guide",
  "make superintelligent",
  "more competitive",
  "grasp knowledge",
  "having fun while succeeding"
];

const AnimatedSubtitle: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(50);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setTypingSpeed(50);
      } else {
        setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, typingSpeed);
      }
    } else {
      if (currentText === currentWord) {
        setTimeout(() => {
          setIsDeleting(true);
          setTypingSpeed(25);
        }, 2000);
      } else {
        setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        }, typingSpeed);
      }
    }
  }, [currentText, isDeleting, currentWordIndex, typingSpeed]);

  return (
    <Typography
      variant="h4"
      component="h2"
      sx={{
        color: 'primary.main',
        fontWeight: 'bold',
        textAlign: 'left',
        mb: 0,
        minHeight: '2em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontSize: '1.8rem',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      }}
    >
      <span style={{ minWidth: '120px', display: 'inline-block', marginRight: '8px' }}>that helps you</span>
      <span style={{ display: 'inline-block', textOverflow: 'ellipsis' }}>{currentText}</span>
    </Typography>
  );
};

export default AnimatedSubtitle; 