import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, AlertTriangle, CheckCircle2, MessageSquare, AlertCircle, ShieldCheck } from 'lucide-react';
import './InpatientManagementModals.css';

export const ExtendDaysModal = ({ isOpen, onClose, onConfirm, patientName }) => {
  const [duration, setDuration] = useState('7');
  const [customDays, setCustomDays] = useState('');
  const [reason, setReason] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirm = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onConfirm({ duration: duration === 'custom' ? customDays : duration, reason });
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="mgmt-modal-overlay" onClick={onClose}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="mgmt-modal-container glass-panel"
          onClick={e => e.stopPropagation()}
        >
          <button className="btn-close-modal" onClick={onClose}><X size={20} /></button>

          {!showSuccess ? (
            <div className="modal-content">
              <div className="modal-icon-header extend">
                <Calendar size={32} />
              </div>
              <h3>Extend Stay for {patientName}</h3>
              <p className="subtitle">Select the additional duration for recovery monitoring.</p>

              <div className="duration-options">
                {['7', '15', '30'].map(d => (
                  <button 
                    key={d}
                    className={`duration-btn ${duration === d ? 'active' : ''}`}
                    onClick={() => setDuration(d)}
                  >
                    {d} days
                  </button>
                ))}
                <button 
                  className={`duration-btn ${duration === 'custom' ? 'active' : ''}`}
                  onClick={() => setDuration('custom')}
                >
                  Custom
                </button>
              </div>

              {duration === 'custom' && (
                <div className="custom-input-group">
                  <label>Enter days (Max 30)</label>
                  <input 
                    type="number" 
                    max="30" 
                    placeholder="e.g. 10"
                    value={customDays}
                    onChange={e => setCustomDays(Math.min(30, e.target.value))}
                  />
                </div>
              )}

              <div className="reason-input-group">
                <label>Reason for extension (Optional)</label>
                <textarea 
                  placeholder="e.g. Continued monitoring required..."
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                />
              </div>

              <button className="btn-confirm-mgmt extend" onClick={handleConfirm}>
                Confirm Extension
              </button>
            </div>
          ) : (
            <div className="mgmt-success-state">
              <div className="success-icon-wrapper">
                <CheckCircle2 size={64} />
              </div>
              <h3>Duration Extended</h3>
              <p>The patient's stay has been updated in the clinical registry.</p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export const DischargeModal = ({ isOpen, onClose, onConfirm, patientName }) => {
  const [reason, setReason] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirm = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onConfirm(reason);
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="mgmt-modal-overlay" onClick={onClose}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="mgmt-modal-container glass-panel"
          onClick={e => e.stopPropagation()}
        >
          <button className="btn-close-modal" onClick={onClose}><X size={20} /></button>

          {!showSuccess ? (
            <div className="modal-content">
              <div className="modal-icon-header discharge">
                <AlertTriangle size={32} />
              </div>
              <h3>Discharge {patientName}?</h3>
              <p className="subtitle">Are you sure you want to discharge this patient? This action will finalize their clinical records.</p>

              <div className="reason-input-group mt-4">
                <label>Clinical Reason (Optional)</label>
                <textarea 
                  placeholder="e.g. Full recovery accomplished..."
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                />
              </div>

              <div className="modal-actions-horizontal">
                <button className="btn-cancel-mgmt" onClick={onClose}>Cancel</button>
                <button className="btn-confirm-mgmt discharge" onClick={handleConfirm}>
                  Confirm Discharge
                </button>
              </div>
            </div>
          ) : (
            <div className="mgmt-success-state">
              <div className="success-icon-wrapper discharge">
                <CheckCircle2 size={64} />
              </div>
              <h3>Patient Discharged</h3>
              <p>The discharge protocol has been completed successfully.</p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export const FinalConfirmModal = ({ isOpen, onClose, onConfirm, staffName, title, message, showNotice = true }) => {
  const [isAgreed, setIsAgreed] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="mgmt-modal-overlay" onClick={onClose}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="mgmt-modal-container glass-panel accountability-modal"
          onClick={e => e.stopPropagation()}
        >
          <button className="btn-close-modal" onClick={onClose}><X size={20} /></button>

          <div className="modal-content">
            <div className="modal-icon-header accountability">
              <ShieldCheck size={32} />
            </div>
            <h3>{title || "Clinical Accountability"}</h3>
            <p className="subtitle">{message || "You are about to commit changes to a clinical record. Please confirm your professional responsibility."}</p>

            {showNotice && (
              <div className="accountability-alert glass-panel-inner">
                 <AlertCircle size={20} className="alert-icon" />
                 <div className="alert-text">
                    <strong>Professional Notice:</strong>
                    <p>As {staffName}, you acknowledge that all data and records have been verified against physical clinical data.</p>
                 </div>
              </div>
            )}

            <label className="checkbox-container-custom">
               <input 
                 type="checkbox" 
                 checked={isAgreed} 
                 onChange={e => setIsAgreed(e.target.checked)} 
               />
               <span className="checkmark"></span>
               <span className="label-text">I confirm that the entered data is correct and verified.</span>
            </label>

            <div className="modal-actions-horizontal mt-4">
              <button className="btn-cancel-mgmt" onClick={onClose}>Cancel</button>
              <button 
                className={`btn-confirm-mgmt accountability ${!isAgreed ? 'disabled' : ''}`} 
                onClick={() => isAgreed && onConfirm()}
                disabled={!isAgreed}
              >
                Confirm & Proceed
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
