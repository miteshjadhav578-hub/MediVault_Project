import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar glass-panel">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/images/logo.png" alt="MediVault Logo" className="logo-img" />
          <span className="logo-text">MediVault</span>
        </Link>
        
        <nav className="navbar-links">
          <a href="#how-it-works">How It Works</a>
          <a href="#features">Features</a>
          <a href="#security">Security</a>
          <a href="#faq">FAQ</a>
        </nav>
        
        <div className="navbar-actions">
          <Link to="/contact" className="btn-secondary nav-btn">Contact Us</Link>
          <Link to="/register" className="btn-primary nav-btn">For Hospitals</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
