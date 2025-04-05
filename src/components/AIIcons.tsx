import React from 'react';
import { Box } from '@mui/material';

const AIIcons: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L0 50h100L50 0zm0 100L0 50h100L50 100z' fill='%23e0e0e0' fill-opacity='0.1'/%3E%3C/svg%3E"),
          url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0c27.6 0 50 22.4 50 50S77.6 100 50 100 0 77.6 0 50 22.4 0 50 0zm0 80c16.6 0 30-13.4 30-30S66.6 20 50 20 20 33.4 20 50s13.4 30 30 30z' fill='%23e0e0e0' fill-opacity='0.1'/%3E%3C/svg%3E")
        `,
        backgroundSize: '100px 100px, 100px 100px',
        backgroundPosition: '0 0, 50px 50px',
        zIndex: 0,
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 0c55.2 0 100 44.8 100 100s-44.8 100-100 100S0 155.2 0 100 44.8 0 100 0zm0 180c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80z' fill='%23e0e0e0' fill-opacity='0.1'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 0L0 100h200L100 0zm0 200L0 100h200L100 200z' fill='%23e0e0e0' fill-opacity='0.1'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 0c55.2 0 100 44.8 100 100s-44.8 100-100 100S0 155.2 0 100 44.8 0 100 0zm0 180c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80z' fill='%23e0e0e0' fill-opacity='0.1'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 0c27.6 0 50 22.4 50 50s-22.4 50-50 50-50-22.4-50-50 22.4-50 50-50zm0 80c16.6 0 30-13.4 30-30s-13.4-30-30-30-30 13.4-30 30 13.4 30 30 30z' fill='%23e0e0e0' fill-opacity='0.1'/%3E%3C/svg%3E")
          `,
          backgroundSize: '200px 200px, 200px 200px, 200px 200px, 200px 200px',
          backgroundPosition: '0 0, 100px 100px, 200px 200px, 300px 300px',
          opacity: 0.2,
          zIndex: 0,
        },
      }}
    />
  );
};

export default AIIcons; 