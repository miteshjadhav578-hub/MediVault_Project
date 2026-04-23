import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, UserPlus, Fingerprint, ShieldCheck } from 'lucide-react';
import BiometricModal from '../../components/dashboard/BiometricModal';
import { FinalConfirmModal } from '../../components/dashboard/InpatientManagementModals';
import './PatientEnrollmentForm.css';

const PatientEnrollmentForm = ({ onBack }) => {
  const [isVerifyingData, setIsVerifyingData] = useState(false);
  const [isBiometricActive, setIsBiometricActive] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    phone: '',
    e1Relation: '',
    e1Name: '',
    e1Phone: '',
    e2Relation: '',
    e2Name: '',
    e2Phone: ''
  });

  const handleInputChange = (e, field) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const isFormValid = Object.values(formData).every(val => val.trim() !== '');

  const handleFinalizeClick = () => {
    if (isFormValid) {
      setIsVerifyingData(true);
    }
  };

  const handleDataConfirmed = () => {
    setIsVerifyingData(false);
    setIsBiometricActive(true);
  };

  const handleBiometricSuccess = () => {
    setIsBiometricActive(false);
    alert('New Patient Digital ID Created & Synchronized to MediVault Network Successfully!');
    onBack();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="enrollment-layout"
    >
      <div className="staff-header no-border">
        <button className="btn-back-glass" onClick={onBack}>
          <ArrowLeft size={16} /> Cancel Enrollment
        </button>
        <div className="biometric-locked">
          <Fingerprint size={16} /> Biometric hash captured
        </div>
      </div>

      <div className="enrollment-card glass-panel">
        <div className="enrollment-header">
          <div className="enroll-icon-circle">
            <UserPlus size={24} />
          </div>
          <div className="enroll-title-stack">
            <h2>Digital ID Enrollment</h2>
            <p>Create a secure MediVault medical profile for this biometric hash</p>
          </div>
        </div>

        <form className="enrollment-form-grid" onSubmit={(e) => e.preventDefault()}>
          {/* SECTION 1: PERSONAL */}
          <div className="form-section">
            <h4 className="section-subtitle">PERSONAL INFORMATION</h4>
            <div className="input-row-multi">
              <div className="glass-input-group">
                <label>Full Name <span className="req-star">*</span></label>
                <input 
                  type="text" 
                  value={formData.fullName}
                  onChange={(e) => handleInputChange(e, 'fullName')}
                  required 
                  placeholder="Enter patient full name" 
                  className="glass-input-lite" 
                />
              </div>
              <div className="glass-input-group small">
                <label>Date of Birth <span className="req-star">*</span></label>
                <input 
                  type="date" 
                  value={formData.dob}
                  onChange={(e) => handleInputChange(e, 'dob')}
                  required 
                  className="glass-input-lite" 
                />
              </div>
            </div>

            <div className="input-row-multi">
              <div className="glass-input-group">
                <label>Gender <span className="req-star">*</span></label>
                <select 
                  required 
                  value={formData.gender}
                  onChange={(e) => handleInputChange(e, 'gender')}
                  className="glass-input-lite"
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="glass-input-group">
                <label>Blood Group <span className="req-star">*</span></label>
                <select 
                  required 
                  value={formData.bloodGroup}
                  onChange={(e) => handleInputChange(e, 'bloodGroup')}
                  className="glass-input-lite"
                >
                  <option value="">Select</option>
                  <option>A+</option>
                  <option>B+</option>
                  <option>O+</option>
                  <option>AB+</option>
                  <option>A-</option>
                  <option>B-</option>
                  <option>O-</option>
                  <option>AB-</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 2: CONTACT */}
          <div className="form-section">
            <h4 className="section-subtitle">CONTACT & EMERGENCY</h4>
            <div className="glass-input-group full-width">
              <label>Phone Number <span className="req-star">*</span></label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => handleInputChange(e, 'phone')}
                required 
                placeholder="+91 XXXXX XXXXX" 
                className="glass-input-lite" 
              />
            </div>

            <div className="emergency-divider">
              <span className="divider-text">Primary Emergency Contact</span>
            </div>
            
            <div className="input-row-tri">
              <div className="glass-input-group">
                <label>Relation <span className="req-star">*</span></label>
                <input 
                  type="text" 
                  value={formData.e1Relation}
                  onChange={(e) => handleInputChange(e, 'e1Relation')}
                  required 
                  placeholder="e.g. Son" 
                  className="glass-input-lite" 
                />
              </div>
              <div className="glass-input-group">
                <label>Contact Name <span className="req-star">*</span></label>
                <input 
                  type="text" 
                  value={formData.e1Name}
                  onChange={(e) => handleInputChange(e, 'e1Name')}
                  required 
                  placeholder="Full Name" 
                  className="glass-input-lite" 
                />
              </div>
              <div className="glass-input-group">
                <label>Emergency Phone <span className="req-star">*</span></label>
                <input 
                  type="tel" 
                  value={formData.e1Phone}
                  onChange={(e) => handleInputChange(e, 'e1Phone')}
                  required 
                  placeholder="+91 XXXXX XXXXX" 
                  className="glass-input-lite" 
                />
              </div>
            </div>

            <div className="emergency-divider mt-4">
              <span className="divider-text">Secondary Emergency Contact</span>
            </div>

            <div className="input-row-tri">
              <div className="glass-input-group">
                <label>Relation <span className="req-star">*</span></label>
                <input 
                  type="text" 
                  value={formData.e2Relation}
                  onChange={(e) => handleInputChange(e, 'e2Relation')}
                  required 
                  placeholder="e.g. Brother" 
                  className="glass-input-lite" 
                />
              </div>
              <div className="glass-input-group">
                <label>Contact Name <span className="req-star">*</span></label>
                <input 
                  type="text" 
                  value={formData.e2Name}
                  onChange={(e) => handleInputChange(e, 'e2Name')}
                  required 
                  placeholder="Full Name" 
                  className="glass-input-lite" 
                />
              </div>
              <div className="glass-input-group">
                <label>Emergency Phone <span className="req-star">*</span></label>
                <input 
                  type="tel" 
                  value={formData.e2Phone}
                  onChange={(e) => handleInputChange(e, 'e2Phone')}
                  required 
                  placeholder="+91 XXXXX XXXXX" 
                  className="glass-input-lite" 
                />
              </div>
            </div>
          </div>

          <div className="enrollment-footer">
            <div className="security-guarantee">
              <ShieldCheck size={14} /> This data is encrypted with the patients biometric hash
            </div>
            <button 
              className={`btn-finalize-enroll ${!isFormValid ? 'disabled' : ''}`} 
              onClick={handleFinalizeClick}
              disabled={!isFormValid}
            >
              Complete Enrollment
            </button>
          </div>
        </form>
      </div>

      <FinalConfirmModal 
        isOpen={isVerifyingData}
        onClose={() => setIsVerifyingData(false)}
        onConfirm={handleDataConfirmed}
        staffName="Dr. Vikram Desai"
        title="Verify Clinical Data"
        message="I confirm that the demographic and emergency contact data entered for this patient is correct and has been verified with legal identification."
        showNotice={false}
      />

      <BiometricModal 
        isOpen={isBiometricActive}
        onClose={() => setIsBiometricActive(false)}
        onScanSuccess={handleBiometricSuccess}
        title="Staff Authorization"
        subtitle="Dr. or Staff fingerprint required to finalize enrollment"
      />
    </motion.div>
  );
};

export default PatientEnrollmentForm;
