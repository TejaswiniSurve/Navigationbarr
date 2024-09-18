import * as React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { getTickets } from '../api/ticketApi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const HomePage = () => {
  const [tickets, setTickets] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchTickets = async () => {
      const allTickets = await getTickets();
      setTickets(allTickets);
    };

    fetchTickets();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Home Page
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/new-ticket">
        Create New Ticket
      </Button>
      <Typography variant="h6" gutterBottom>
        Recent Tickets
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
            {tickets.slice(0, 5).map(ticket => (
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
    </div>
  );
};

export default HomePage;
