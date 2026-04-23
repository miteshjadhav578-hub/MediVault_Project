import React, { useState, useEffect } from 'react';
import { Bell, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LogoutModal from './LogoutModal';
import './DashboardHeader.css';

const DashboardHeader = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    navigate('/login');
  };

  return (
    <>
      <header className="dashboard-header glass-panel">
        <div className="header-left">
          <h1 className="header-datetime">{formatDate(currentDate)}<span className="separator">|</span><span className="time-text">{formatTime(currentDate)}</span></h1>
        </div>

        <div className="header-right">
          <button className="icon-btn notification-btn" onClick={() => navigate('/dashboard/notifications')}>
            <Bell size={18} />
            <span className="notification-badge-dot"></span>
          </button>

          <div className="logout-trigger-wrapper" style={{ position: 'relative' }}>
            <button className="logout-btn-header" onClick={() => setShowLogoutModal(true)}>
              <span>Log out</span>
              <div className="dots-icon-box">
                <MoreHorizontal size={16} />
              </div>
            </button>

            <LogoutModal 
              isOpen={showLogoutModal}
              onConfirm={handleLogout}
              onCancel={() => setShowLogoutModal(false)}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default DashboardHeader;
