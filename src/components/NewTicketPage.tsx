import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTicket } from '../api/ticketApi';

const NewTicketPage = () => {
  const [requester, setRequester] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [agent, setAgent] = React.useState('');
  const [status, setStatus] = React.useState('Open');
  const [lastMessage, setLastMessage] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newTicket = { requester, subject, agent, status, lastMessage };
    await createTicket(newTicket);
    navigate('/');
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Create New Ticket
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Requester"
          value={requester}
          onChange={(e) => setRequester(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Agent"
          value={agent}
          onChange={(e) => setAgent(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Message"
          value={lastMessage}
          onChange={(e) => setLastMessage(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default NewTicketPage;
