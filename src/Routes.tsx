// src/Routes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Open from './components/Open';
import Pending from './components/Pending';
import OnHold from './components/OnHold';
import Solved from './components/Solved';
import Closed from './components/Closed';
import RecentTickets from './components/RecentTickets';
import TicketsToHandle from './components/TicketsToHandle';
import MyOpenTickets from './components/MyOpenTickets';
import MyTicketsLast7Days from './components/MyTicketsLast7Days';

import Dashboard from './pages/Dashboard';
import Coupons from './pages/Coupons';
import Users from './pages/Users';
import Stats from './pages/Stats';
import Power from './pages/Power';
import Settings from './pages/Settings';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/coupons" element={<Coupons />} />
      <Route path="/users" element={<Users />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/power" element={<Power />} />
      <Route path="/settings" element={<Settings />} />
   
  





      <Route path="/open" element={<Open />} />
      <Route path="/pending" element={<Pending />} />
      <Route path="/on-hold" element={<OnHold />} />
      <Route path="/solved" element={<Solved />} />
      <Route path="/closed" element={<Closed />} />
      <Route path="/all-recent-tickets" element={<RecentTickets />} />
      <Route path="/tickets-to-handle" element={<TicketsToHandle />} />
      <Route path="/my-open-tickets" element={<MyOpenTickets />} />
      <Route path="/my-tickets-last-7-days" element={<MyTicketsLast7Days />} />
    </Routes>
  );
};

export default AppRoutes;
