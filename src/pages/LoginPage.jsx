import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Mail, Fingerprint, Eye, EyeOff } from 'lucide-react';
import AnimatedBackground from '../components/layout/AnimatedBackground';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      {/* Absolute positioning to fill the background entirely */}
      <div className="auth-background">
        <AnimatedBackground />
      </div>
      
      <Link to="/" className="auth-back-link">
        <ArrowLeft size={20} /> Back to Home
      </Link>

      <motion.div 
        className="auth-card split-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Left Information Pane (Glass) */}
        <div className="auth-info-pane">
          <h2 className="info-heading">Welcome to MediVault</h2>
          
          <div className="info-graphic-wrapper">
            <img src="/images/logo.png" alt="MediVault Logo" className="info-graphic auth-main-logo" />
          </div>

          <p className="info-description">
            Manage your hospital staff, verify patient identities securely, and access critical medical records.
          </p>
          <div className="info-disclaimer-container">
            <p className="info-disclaimer">Secure Healthcare Platform.</p>
          </div>
        </div>

        {/* Right Form Pane */}
        <div className="auth-form-pane-wrapper">
          <div className="auth-form-pane">
            <div className="auth-header-right">
              <h1 className="heading-md">Log In to Your Account</h1>
            </div>

            <form onSubmit={handleLogin} className="auth-form">
              <div className="input-group">
                <label htmlFor="username">Admin Username</label>
                 <div className="input-wrapper boxed">
                   <input 
                      type="text" 
                      id="username" 
                      placeholder="Username" 
                      value={email} // You can rename the state variable to 'username' for clarity
                      onChange={(e) => setEmail(e.target.value.toLowerCase())} // Automatically makes it lowercase
                      pattern="[a-z0-9]+" // Only allows small letters and numbers
                      title="Username must contain only lowercase letters and numbers. No special characters or spaces."
                      required 
                   />
                 <Mail size={16} className="input-icon-right" />
               </div>
             </div>

              <div className="input-group">
                <div className="label-row">
                  <label htmlFor="password">Password</label>
                  <a href="#" className="forgot-link">Forgot?</a>
                </div>
                <div className="input-wrapper boxed">
                  <input 
                    type={showPassword ? "text" : "password"}
                    id="password" 
                    placeholder="••••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                  <button 
                    type="button" 
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-submit-btn pill-btn glossy-btn">
                Log In
              </button>
            </form>

            <p className="auth-footer-text">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
