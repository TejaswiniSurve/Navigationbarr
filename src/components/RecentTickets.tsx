import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

interface Ticket {
  id: number;
  requester: string;
  subject: string;
  agent: string;
  status: string;
  lastMessage: string;
}

const RecentTickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:5001/tickets');
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  // Assuming "Last 7 Days" refers to filtering tickets based on a date range
  // Adjust this logic based on your actual requirements
  const filteredTickets = tickets.filter(ticket => {
    const ticketDate = new Date(ticket.lastMessage); // Adjust as needed
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    return ticketDate >= sevenDaysAgo;
  });

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Recent Tickets (Last 7 Days)
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Requester</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Agent</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTickets.map(ticket => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.requester}</TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>{ticket.agent}</TableCell>
                <TableCell>{ticket.status}</TableCell>
                <TableCell>{ticket.lastMessage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RecentTickets;
