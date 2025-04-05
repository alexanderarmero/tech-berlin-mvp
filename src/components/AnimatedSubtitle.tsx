import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const GradientText = styled('span')(({ theme }) => ({
  background: 'linear-gradient(45deg, #9c27b0, #1976d2)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  display: 'inline-block',
  animation: 'gradient 3s ease infinite',
  '@keyframes gradient': {
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 50%',
    },
  },
}));

const AnimatedSubtitle: React.FC = () => {
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(50);

  const texts = [
    "unlock your full potential with every lesson learned",
    "master challenges by embracing knowledge daily",
    "achieve greatness at your own unique pace",
    "transform curiosity into brilliance step by step",
    "navigate learning paths tailored just for you",
    "discover the genius waiting inside yourself",
    "turn doubts into strengths through guided growth",
    "elevate your skills beyond all limits",
    "learn smarter, faster, and more effectively",
    "build confidence with personalized insights",
    "empower yourself to shape a brighter future",
    "find clarity in even the toughest concepts",
    "grow stronger with each new discovery",
    "ignite an unstoppable passion for success",
    "shape your destiny one idea at a time",
    "conquer fears by trusting your abilities",
    "make progress feel effortless and rewarding",
    "redefine what is possible with determination",
    "be unstoppable on your path to excellence",
    "awaken hidden talents through focused effort",
    "fuel ambition with actionable knowledge",
    "break barriers others thought were unbreakable",
    "create opportunities from every challenge faced",
    "inspire others by becoming your best self",
    "overcome obstacles with relentless persistence",
    "harness the power of lifelong learning",
    "pursue dreams with unwavering dedication",
    "see failure as a stepping stone to success",
    "believe in yourself; everything else will follow",
    "strive for greatness, through time and space",
    "understand yourself better than anyone else",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const currentWord = texts[currentIndex];
    
    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
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
  }, [currentText, isDeleting, currentIndex, typingSpeed]);

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
      <GradientText>{currentText}</GradientText>
    </Typography>
  );
};

export default AnimatedSubtitle; 