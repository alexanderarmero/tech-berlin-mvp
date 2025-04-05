import React from 'react';
import { Box, Paper, Typography, Avatar } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';

interface TeacherResponseProps {
  response: string;
}

const TeacherResponse: React.FC<TeacherResponseProps> = ({ response }) => {
  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Paper
        elevation={2}
        sx={{
          p: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '12px',
          minHeight: '100px',
          maxHeight: '200px',
          overflowY: 'auto',
          display: 'flex',
          gap: 2,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0, 0, 0, 0.05)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            '&:hover': {
              background: 'rgba(0, 0, 0, 0.2)',
            },
          },
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: 'primary.main',
          }}
        >
          <SmartToyIcon />
        </Avatar>
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
          {response}
        </Typography>
      </Paper>
    </Box>
  );
};

export default TeacherResponse; 