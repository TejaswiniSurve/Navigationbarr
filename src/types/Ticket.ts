// src/types/Ticket.ts
export interface Ticket {
    id: number;
    requester: string;
    email: string;
    subject: string;
    agent: string;
    status: string;
    lastMessage: string;
  }
  