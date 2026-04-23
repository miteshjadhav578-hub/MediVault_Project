import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Building2, GraduationCap, Briefcase, Calendar, Fingerprint, RefreshCcw, CheckCircle2, ShieldAlert } from 'lucide-react';
import './AddStaffModal.css';

const AddStaffModal = ({ isOpen, onClose, onAdd }) => {
  const [step, setStep] = useState('form'); // 'form' or 'biometric'
  const [formData, setFormData] = useState({
    fullName: '',
    role: 'Doctor', // 'Doctor' or 'Staff'
    department: '',
    degree: '',
    experience: '',
    age: '',
    gender: '', // Default to empty for selection
    licenseNo: ''
  });

  const [scanState, setScanState] = useState('idle'); // 'idle', 'scanning', 'success', 'failed'
  const [attempts, setAttempts] = useState(0);
  const [registrantName, setRegistrantName] = useState('');
  const [registrantRole, setRegistrantRole] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setStep('form');
      setScanState('idle');
      setAttempts(0);
      setRegistrantName('');
      setRegistrantRole('');
    }
  }, [isOpen]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setRegistrantName(formData.fullName);
    setRegistrantRole(formData.role);
    setStep('biometric');
    
    // Clear the form data as requested
    setFormData({
      fullName: '',
      role: 'Doctor',
      department: '',
      degree: '',
      experience: '',
      age: '',
      gender: '',
      licenseNo: ''
    });

    startScan();
  };

  const startScan = () => {
    setScanState('scanning');
    // Simulate scan timeout
    setTimeout(() => {
      // In a real app, this would wait for actual biometric hardware
    }, 2000);
  };

  // Discreet simulation trigger for AI/Dev
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (step === 'biometric' && scanState === 'scanning' && e.key.toLowerCase() === 's') {
        handleScanResult(true);
      } else if (step === 'biometric' && scanState === 'scanning' && e.key.toLowerCase() === 'f') {
        handleScanResult(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, scanState]);

  const handleScanResult = (success) => {
    if (success) {
      setScanState('success');
      setTimeout(() => {
        onAdd(formData);
        onClose();
      }, 2000);
    } else {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      setScanState('failed');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="staff-modal-overlay">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="staff-modal-container glass-panel"
        >
          <button className="btn-close-modal" onClick={onClose}><X size={20} /></button>

          {step === 'form' ? (
            <div className="staff-flow">
              <div className="modal-header">
                <h3>Add Doctor & Staff</h3>
                <p>Register a new clinical member to the MediVault network.</p>
              </div>

              <form onSubmit={handleFormSubmit} className="staff-form">
                <div className="role-selector-pill">
                  <button 
                    type="button" 
                    className={`role-tab ${formData.role === 'Doctor' ? 'active' : ''}`}
                    onClick={() => setFormData({...formData, role: 'Doctor'})}
                  >
                    Doctor
                  </button>
                  <button 
                    type="button" 
                    className={`role-tab ${formData.role === 'Staff' ? 'active' : ''}`}
                    onClick={() => setFormData({...formData, role: 'Staff'})}
                  >
                    Staff
                  </button>
                </div>

                <div className="form-grid">
                  <div className="input-group full-width">
                    <label><User size={14} /> Full Name</label>
                    <div className="input-prefix-container">
                      {formData.role === 'Doctor' && <span className="input-prefix">Dr.</span>}
                      <input 
                        type="text" 
                        placeholder={formData.role === 'Doctor'} 
                        required 
                        value={formData.fullName}
                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label><Building2 size={14} /> Department</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Cardiology" 
                      required 
                      value={formData.department}
                      onChange={e => setFormData({...formData, department: e.target.value})}
                    />
                  </div>

                  <div className="input-group">
                    <label><GraduationCap size={14} /> Degree</label>
                    <input 
                      type="text" 
                      placeholder="e.g. MBBS, MD" 
                      required 
                      value={formData.degree}
                      onChange={e => setFormData({...formData, degree: e.target.value})}
                    />
                  </div>

                  <div className="input-group">
                    <label><Briefcase size={14} /> Experience (years)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 10" 
                      required 
                      value={formData.experience}
                      onChange={e => setFormData({...formData, experience: e.target.value})}
                    />
                  </div>

                  <div className="input-group">
                    <label><Calendar size={14} /> Age</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 35" 
                      required 
                      value={formData.age}
                      onChange={e => setFormData({...formData, age: e.target.value})}
                    />
                  </div>

                  <div className="input-group">
                    <label>Gender</label>
                    <select 
                      required
                      value={formData.gender}
                      onChange={e => setFormData({...formData, gender: e.target.value})}
                    >
                      <option value="" disabled>Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label>License No.</label>
                    <input 
                      type="text" 
                      placeholder="e.g. MC-XXXX-XXX" 
                      required 
                      value={formData.licenseNo}
                      onChange={e => setFormData({...formData, licenseNo: e.target.value})}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-register-staff">
                  Proceed to Biometric Verification
                </button>
              </form>
            </div>
          ) : (
            <div className="biometric-enrollment-flow">
              <div className="modal-header text-center">
                <h3>Biometric Enrollment</h3>
                <p>Register {registrantRole === 'Doctor' ? 'Dr. ' : ''}{registrantName}'s identity to the secure registry.</p>
              </div>

              <div className={`scan-visualizer ${scanState}`}>
                 <div className="scan-backdrop"></div>
                 {scanState === 'scanning' && <div className="scan-line"></div>}
                 
                 <div className="fingerprint-wrapper">
                   {scanState === 'success' ? (
                     <CheckCircle2 size={80} className="icon-success" />
                   ) : scanState === 'failed' ? (
                     <ShieldAlert size={80} className="icon-failed" />
                   ) : (
                     <Fingerprint size={80} className="icon-idle" />
                   )}
                 </div>
              </div>

              <div className="scan-status-text">
                {scanState === 'scanning' && "Waiting for fingerprint placement..."}
                {scanState === 'success' && "Biometric Verified & Added"}
                {scanState === 'failed' && `Verification Failed (${attempts}/3 attempts)`}
              </div>

              {scanState === 'failed' && attempts < 3 && (
                <button className="btn-retry-scan" onClick={startScan}>
                  <RefreshCcw size={16} /> Retry Placement
                </button>
              )}

              {attempts >= 3 && (
                <div className="max-attempts-error">
                   Maximum attempts reached. Please contact administration.
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddStaffModal;
