import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, ShieldCheck, BellRing, Save } from 'lucide-react';
import BiometricModal from '../../components/dashboard/BiometricModal';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Hospital Profile');
  const [isVerifyingPassword, setIsVerifyingPassword] = useState(false);

  const handlePasswordUpdate = () => {
    // In a real app, check if fields are matching first
    setIsVerifyingPassword(true);
  };

  const onVerificationSuccess = () => {
    setIsVerifyingPassword(false);
    alert('Administrative Password Updated & Synchronized via MediVault Security Protocol.');
  };

  const tabs = [
    { name: 'Hospital Profile', icon: <Building2 size={18} /> },
    { name: 'Security', icon: <ShieldCheck size={18} /> },
    { name: 'Notifications', icon: <BellRing size={18} /> }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Hospital Profile':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="settings-card glass-panel profile-view"
          >
            <div className="profile-header-section">
              <div className="hospital-logo-container glass-panel-inner">
                <img src="/images/hospital_logo.png" alt="Hospital Logo" />
              </div>
              <div className="profile-badge-info">
                <h3>Apex Hospital</h3>
                <span className="verified-badge">
                  <ShieldCheck size={14} /> Verified Facility
                </span>
              </div>
            </div>

            <div className="settings-form-grid info-only">
              <div className="settings-input-group">
                <label>Hospital name</label>
                <div className="info-value-box">Apex Hospital</div>
              </div>
              <div className="settings-input-group">
                <label>License number</label>
                <div className="info-value-box">MH-2018-04421</div>
              </div>
              <div className="settings-input-group full-width">
                <label>Address</label>
                <div className="info-value-box">Sector 7, Pune, Maharashtra</div>
              </div>
              <div className="settings-input-group">
                <label>Type</label>
                <div className="info-value-box">Private</div>
              </div>
              <div className="settings-input-group">
                <label>Contact email</label>
                <div className="info-value-box">admin@apexhospital.in</div>
              </div>
            </div>
          </motion.div>
        );
      case 'Security':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="settings-card glass-panel"
          >
            <div className="settings-form-grid">
              <div className="settings-input-group full-width">
                <label>Current password</label>
                <input type="password" placeholder="••••••••" className="glass-input" />
              </div>
              <div className="settings-input-group">
                <label>New password</label>
                <input type="password" placeholder="New password" className="glass-input" />
              </div>
              <div className="settings-input-group">
                <label>Confirm password</label>
                <input type="password" placeholder="Confirm" className="glass-input" />
              </div>
            </div>
            <button className="btn-save-settings" onClick={handlePasswordUpdate}>
              Update password
            </button>

            <BiometricModal 
              isOpen={isVerifyingPassword} 
              onClose={() => setIsVerifyingPassword(false)}
              onScanSuccess={onVerificationSuccess}
              title="Admin Verification"
              subtitle="Dr. or Staff fingerprint required to update administrative password"
            />
          </motion.div>
        );
      case 'Notifications':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="settings-card glass-panel"
          >
            <div className="settings-toggle-list">
              <div className="toggle-item">
                <div className="toggle-info">
                  <h4>Login from a recognized device</h4>
                  <p>Get notified when a known device logs in</p>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="toggle-item">
                <div className="toggle-info">
                  <h4>Inpatient discharge alerts</h4>
                  <p>Notify when patient is being discharged</p>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="toggle-item">
                <div className="toggle-info">
                  <h4>System updates</h4>
                  <p>MediVault maintenance and updates</p>
                </div>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="settings-layout">
      <div className="staff-header">
        <div className="staff-title-group">
          <h2>Settings</h2>
          <span>Manage hospital identity, security, and alert preferences</span>
        </div>
      </div>

      <div className="settings-tabs-row">
        {tabs.map(tab => (
          <button 
            key={tab.name} 
            className={`settings-tab-btn ${activeTab === tab.name ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
            {activeTab === tab.name && (
              <motion.div 
                layoutId="active-tab-line" 
                className="active-tab-line"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="settings-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Settings;
