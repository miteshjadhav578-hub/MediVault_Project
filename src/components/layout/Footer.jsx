import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import LegalOverlay from '../common/LegalOverlay';
import './Footer.css';

const Footer = () => {
  const [showLegal, setShowLegal] = useState(false);
  const [legalType, setLegalType] = useState('all');

  const handleLegalClick = (e, type) => {
    e.preventDefault();
    setLegalType(type);
    setShowLegal(true);
  };

  return (
    <>
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/images/logo.png" alt="MediVault Logo" className="logo-img" />
            <span className="logo-text">MediVault</span>
          </div>
          <p className="footer-description">
            Biometric-secured, centralized medical records for modern hospitals. Ensuring patient safety when seconds matter.
          </p>
        </div>
        
        <div className="footer-links-group">
          <div className="footer-col">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#security">Security</a>
            <a href="#how-it-works">How It Works</a>
          </div>
          
          <div className="footer-col">
            <h4>Hospitals</h4>
            <a href="/register">Register Organization</a>
            <a href="/login">Hospital Login</a>
            <a href="#api">API Verification</a>
          </div>
          
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#privacy" onClick={(e) => handleLegalClick(e, 'privacy')}>Privacy Policy</a>
            <a href="#terms" onClick={(e) => handleLegalClick(e, 'terms')}>Terms of Service</a>
            <a href="#nha">NHA Compliance</a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} MediVault Systems. All rights reserved.</p>
      </div>
    </footer>
    <LegalOverlay isOpen={showLegal} onClose={() => setShowLegal(false)} documentType={legalType} />
    </>
  );
};

export default Footer;
