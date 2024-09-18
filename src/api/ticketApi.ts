import axios from 'axios';

const API_URL = 'http://localhost:5000/tickets';

export const getTickets = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return [];
  }
};

export const createTicket = async (ticket: any) => {
  try {
    await axios.post(API_URL, ticket);
  } catch (error) {
    console.error('Error creating ticket:', error);
  }
};
