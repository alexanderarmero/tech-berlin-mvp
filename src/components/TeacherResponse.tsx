import React from 'react';
import { Box, Paper, Typography, Avatar } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';

interface TeacherResponseProps {
  response: string;
}

const TeacherResponse: React.FC<TeacherResponseProps> = ({ response }) => {
  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', width: '100%' }}>
        <Avatar
          src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
          sx={{
            width: 60,
            height: 60,
            border: '2px solid',
            borderColor: 'primary.main',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
            flexShrink: 0,
            '& img': {
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            },
          }}
        />
        <Paper
          elevation={2}
          sx={{
            p: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '12px',
            minHeight: '100px',
            width: '150%',
            maxWidth: '900px',
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.3rem',
              color: 'rgba(0, 0, 0, 0.7)',
              textAlign: 'left',
              minHeight: '24px',
              letterSpacing: '0.5px',
              width: '100%',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            {response}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default TeacherResponse; 