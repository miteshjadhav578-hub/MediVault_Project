import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, X } from 'lucide-react';
import './LogoutModal.css';

const LogoutModal = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="logout-popover-container">
          <motion.div 
            className="logout-popover-card glass-panel"
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="popover-content">
              <LogOut size={18} className="popover-icon" />
              <p>Sign out of MediVault?</p>
            </div>

            <div className="popover-actions">
              <button className="btn-popover btn-popover-cancel" onClick={onCancel}>
                Stay
              </button>
              <button className="btn-popover btn-popover-confirm" onClick={onConfirm}>
                Sign Out
              </button>
            </div>
          </motion.div>
          {/* Invisible overlay for click-outside-to-close */}
          <div className="popover-click-capture" onClick={onCancel} />
        </div>
      )}
    </AnimatePresence>
  );
};

export default LogoutModal;
