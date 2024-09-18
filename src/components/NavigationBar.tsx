import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaTicketAlt, FaUsers, FaChartBar, FaBolt, FaCog } from 'react-icons/fa';

export const NavigationBar = () => {
  return (
    <div className="navigationBar">
      <nav>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          <FaTachometerAlt />
        </NavLink>
        <NavLink to="/coupons" className={({ isActive }) => (isActive ? 'active' : '')}>
          <FaTicketAlt />
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : '')}>
          <FaUsers />
        </NavLink>
        <NavLink to="/stats" className={({ isActive }) => (isActive ? 'active' : '')}>
          <FaChartBar />
        </NavLink>
        <NavLink to="/power" className={({ isActive }) => (isActive ? 'active' : '')}>
          <FaBolt />
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
          <FaCog />
        </NavLink>
      </nav>
    </div>
  );
};
