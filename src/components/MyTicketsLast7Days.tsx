import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define a type for the ticket
interface Ticket {
  id: number;
  subject: string;
  // Add other properties if needed
}

const MyTicketsLast7Days: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:5001/tickets');
        const data: Ticket[] = response.data;

        // Since there's no date field, we can't filter by date.
        // If you need a specific filter, you can add it here.
        setTickets(data); // Simply set all fetched tickets

      } catch (error) {
        console.error('There was an error fetching the tickets!', error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div>
      <h1>My Tickets Last 7 Days</h1>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>{ticket.subject}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyTicketsLast7Days;
