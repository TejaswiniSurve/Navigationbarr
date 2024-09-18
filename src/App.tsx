
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar'; // Use NavigationBar instead of Sidebar
import AppRoutes from './Routes';// Import the routes component
import './App.css'; // Import CSS for layout styling

const App = () => {
  return (
    <Router>
      <div className="app-layout">
        <NavigationBar />  {/* Fixed NavigationBar */}
        <div className="content-area">
          <AppRoutes />  {/* This will render the different routes and pages */}
        </div>
      </div>
    </Router>
  );
};

export default App;

