import React, { useEffect, useState } from 'react';

interface Ticket {
  id: number;
  requester: string;
  subject: string;
  agent: string;
  status: string;
  lastMessage: string;
}

const AllTicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    // Fetch ticket data from your backend here
    const fetchData = async () => {
      try {
        const response = await fetch('https://your-backend-api.com/tickets'); // Replace with your API endpoint
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>All Tickets</h1>
      <table>
        <thead>
          <tr>
            <th>Requester</th>
            <th>Subject</th>
            <th>Agent</th>
            <th>Status</th>
            <th>Last Message</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.requester}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.agent}</td>
              <td>{ticket.status}</td>
              <td>{ticket.lastMessage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTicketsPage;
