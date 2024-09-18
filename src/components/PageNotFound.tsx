// src/components/PageNotFound.tsx

import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const PageNotFound: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">404 Page Not Found</Typography>
      <Typography variant="body1">The page you are looking for does not exist.</Typography>
    </Box>
  );
};

export default PageNotFound;
