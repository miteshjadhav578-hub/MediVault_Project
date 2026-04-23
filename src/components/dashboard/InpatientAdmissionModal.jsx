import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, FileText, ChevronRight, CheckCircle2 } from 'lucide-react';
import './InpatientAdmissionModal.css';

const InpatientAdmissionModal = ({ isOpen, onClose, patientName, onConfirm }) => {
  const [duration, setDuration] = useState('7 days');
  const [customDays, setCustomDays] = useState('');
  const [reason, setReason] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const durations = ['7 days', '15 days', '30 days', 'Custom'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalDuration = duration === 'Custom' ? `${customDays} days` : duration;
    setIsSuccess(true);
    setTimeout(() => {
      onConfirm({ duration: finalDuration, reason });
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="admission-modal-overlay">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="admission-modal-container glass-panel"
        >
          <button className="btn-close-modal" onClick={onClose}><X size={20} /></button>

          {!isSuccess ? (
            <div className="admission-flow">
              <div className="admission-header">
                <h3>Are you sure want to inpatient <span className="highlight-name">{patientName}</span>?</h3>
                <p>Fill details to proceed</p>
              </div>

              <form onSubmit={handleSubmit} className="admission-form">
                <div className="form-section">
                  <label><Calendar size={16} /> Select duration</label>
                  <div className="duration-grid">
                    {durations.map(d => (
                      <button 
                        key={d} 
                        type="button"
                        className={`duration-btn ${duration === d ? 'active' : ''}`}
                        onClick={() => setDuration(d)}
                      >
                        {d}
                      </button>
                    ))}
                  </div>

                  {duration === 'Custom' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="custom-days-input"
                    >
                      <input 
                        type="number" 
                        max="30" 
                        placeholder="Enter days (max 30)" 
                        value={customDays}
                        onChange={(e) => setCustomDays(e.target.value)}
                        required
                      />
                      <span className="unit-label">days</span>
                    </motion.div>
                  )}
                </div>

                <div className="form-section mt-6">
                  <label><FileText size={16} /> Reason for admission</label>
                  <textarea 
                    placeholder="Provide a clinical reason..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-submit-admission">
                  Complete Admission <ChevronRight size={18} />
                </button>
              </form>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="success-state"
            >
              <div className="success-icon-box">
                <CheckCircle2 size={64} className="icon-green" />
              </div>
              <h4>Admission Recorded</h4>
              <p>{patientName} is now registered as an inpatient.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default InpatientAdmissionModal;
