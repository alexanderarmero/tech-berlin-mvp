import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const words = [
    "unlock your full potential with every lesson learned",
    "master challenges by embracing knowledge daily",
    "achieve greatness at your own unique pace",
    "transform curiosity into brilliance step by step",
    "navigate learning paths tailored just for you",
    "discover the genius waiting inside yourself",
    "turn doubts into strengths through guided growth",
    "elevate your skills beyond all limits",
    "lLearn smarter, faster, and more effectively",
    "build confidence with personalized insights",
    "empower yourself to shape a brighter future",
    "find clarity in even the toughest concepts",
    "grow stronger with each new discovery",
    "ignite an unstoppable passion for success",
    "hhape your destiny one idea at a time",
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