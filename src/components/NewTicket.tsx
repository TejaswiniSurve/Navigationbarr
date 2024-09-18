// src/components/NewTicket.tsx

import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const NewTicket: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">New Ticket</Typography>
      <Typography variant="body1">
        Form to create a new ticket will go here.
      </Typography>
    </Box>
  );
};

export default NewTicket;
