import React, { useEffect, useState } from 'react';

const TicketTable: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://your-backend-api.com/tickets');
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="ticket-table">
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

export default TicketTable;
