// src/components/SetupInstructions.tsx

import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const SetupInstructions: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Setup Instructions</Typography>
      <Typography variant="body1">
        Instructions for setting up email forwarding to get tickets will go here.
      </Typography>
    </Box>
  );
};

export default SetupInstructions;
