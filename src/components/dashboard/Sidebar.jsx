import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, Bell, Activity, HelpCircle, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Doctors & Staff', path: '/dashboard/staff', icon: <Users size={20} /> },
    { name: 'Inpatients', path: '/dashboard/patients', icon: <UserPlus size={20} /> },
    { name: 'Notifications', path: '/dashboard/notifications', icon: <Bell size={20} /> },
    { name: 'Activity Log', path: '/dashboard/activity', icon: <Activity size={20} /> },
    { name: 'Help', path: '/dashboard/help', icon: <HelpCircle size={20} /> },
  ];

  return (
    <aside className="dashboard-sidebar glass-panel">
      <div className="sidebar-brand-dual">
        <div className="brand-logo-inline">
          <img src="/images/hospital_logo.png" alt="Hospital" className="brand-img" />
          <h4 className="brand-text">Apex</h4>
        </div>
        
        <div className="brand-divider"></div>
        
        <div className="brand-logo-inline">
          <img src="/images/logo.png" alt="MV" className="brand-img" />
          <h4 className="brand-text">MediVault</h4>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path} 
            end={item.path === '/dashboard'}
            className={({ isActive }) => `sidebar-link-dot ${isActive ? 'active' : ''}`}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="nav-active-bg"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30
                    }}
                  />
                )}
                <div className="nav-link-content">
                  <div className="nav-icon-3d">{item.icon}</div>
                  <span className="sidebar-link-text">{item.name}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </div>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <NavLink 
            to="/dashboard/settings" 
            className={({ isActive }) => `sidebar-link-dot ${isActive ? 'active' : ''}`}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="nav-active-bg"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30
                    }}
                  />
                )}
                <div className="nav-link-content">
                  <div className="nav-icon-3d"><Settings size={20} /></div>
                  <span className="sidebar-link-text">Settings</span>
                </div>
              </>
            )}
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
