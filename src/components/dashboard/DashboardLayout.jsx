import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import AnimatedBackground from '../layout/AnimatedBackground';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <div className="dashboard-root">
      {/* Stable Background Layer */}
      <div className="dashboard-bg-layer"></div>
      
      <Sidebar />
      
      <main className="dashboard-main-content">
        <DashboardHeader />
        
        <div className="dashboard-scroll-area">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              style={{ minHeight: '100%' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
