import React from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

interface User {
  email: string;
  phone: string;
}

const userData: Record<string, User> = {
  'John Doe': { email: 'john@example.com', phone: '123-456-7890' },
  'Alice Brown': { email: 'alice@example.com', phone: '987-654-3210' },
  // Add more dummy user data if needed
};

const UserInfo: React.FC = () => {
  const { requester } = useParams<{ requester: string }>();

  const user = userData[decodeURIComponent(requester || '')] || { email: 'N/A', phone: 'N/A' };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Information
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h6">Name: {requester}</Typography>
        <Typography variant="body1">Email: {user.email}</Typography>
        <Typography variant="body1">Phone: {user.phone}</Typography>
      </Paper>
    </Box>
  );
};

export default UserInfo;
