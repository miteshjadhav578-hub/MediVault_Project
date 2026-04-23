import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import AnimatedBackground from '../layout/AnimatedBackground';

const LegalOverlay = ({ isOpen, onClose, documentType = 'all' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="legal-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}
        >
          {/* We import the AnimatedBackground purely for aesthetic parity with auth pages */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
            <AnimatedBackground />
          </div>

          <motion.div 
            className="auth-card"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              width: '90%',
              maxWidth: '800px',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid var(--color-border)',
              borderRadius: '24px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: 'var(--shadow-xl)',
              overflow: 'hidden'
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '24px 32px',
              borderBottom: '1px solid var(--color-border)'
            }}>
              <h2 className="heading-md" style={{ margin: 0 }}>
                {documentType === 'terms' ? 'Terms & Conditions' : documentType === 'privacy' ? 'Privacy Policy' : 'Legal Agreements'}
              </h2>
              <button 
                onClick={onClose}
                style={{
                  background: 'rgba(255,0,0,0.1)',
                  color: '#e53e3e',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ 
              flex: 1, 
              overflowY: 'auto', 
              padding: '32px', 
              color: 'var(--color-text-secondary)',
              fontSize: '0.9rem',
              lineHeight: '1.7'
            }}>
                  { (documentType === 'all' || documentType === 'terms') && (
                    <div style={{ marginBottom: documentType === 'all' ? '32px' : '0' }}>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--color-text)' }}>TERMS & CONDITIONS</h3>
                      <p style={{ marginBottom: '16px', fontStyle: 'italic' }}>Effective Date: 02/04/2026</p>
                      <p style={{ marginBottom: '16px' }}>By accessing or using MediVault, hospitals and organizations agree to be bound by these Terms and Conditions. Only duly registered hospitals and healthcare organizations are permitted to use the platform, and all users must ensure that the information provided during registration and use of the platform is accurate, complete, and lawful.</p>
                      <p style={{ marginBottom: '16px' }}>MediVault provides a secure, web-based platform for the storage and management of medical records, incorporating biometric-based authentication and role-based access control for authorized doctors and staff. MediVault is strictly a technology platform and does not operate as a healthcare provider, nor does it offer medical services.</p>
                      <p style={{ marginBottom: '16px' }}>Hospitals are solely responsible for managing their accounts, ensuring that access is granted only to authorized personnel, and maintaining the confidentiality and security of login credentials. Access to patient data requires biometric authentication, and hospitals must ensure that such biometric data is collected lawfully and with proper consent. MediVault shall not be held liable for any misuse of biometric data at the hospital level.</p>
                      <p style={{ marginBottom: '16px' }}>Hospitals act as data fiduciaries with respect to patient data, while MediVault functions as a data processor. It is the responsibility of hospitals to obtain valid and informed consent from patients prior to uploading or processing their data on the platform.</p>
                      <p style={{ marginBottom: '16px' }}>MediVault may provide emergency access features strictly for critical situations. Any misuse of such features may result in suspension of access or legal action. Additionally, the platform may include AI-based features that provide insights or suggestions; however, these are purely informational in nature and must not be considered as medical advice. All medical decisions must be made by qualified healthcare professionals.</p>
                      <p style={{ marginBottom: '16px' }}>MediVault does not provide medical advice, diagnosis, or treatment, and any medical-related outputs generated by the platform are intended solely for assistance purposes. MediVault shall not be liable for inaccuracies in data entered by hospitals, medical decisions made based on such data, unauthorized access resulting from negligence by the hospital, or any system downtime or technical failures beyond reasonable control.</p>
                      <p style={{ marginBottom: '16px' }}>Users may request deletion of data in accordance with applicable laws, and MediVault reserves the right to suspend or terminate access in cases of misuse, legal violations, or security concerns. The platform is currently offered free of charge; however, MediVault reserves the right to introduce pricing in the future with prior notice.</p>
                      <p style={{ marginBottom: '16px' }}>All intellectual property rights related to the platform, including its design, technology, and content, are owned by MediVault Private Limited. These Terms shall be governed by the laws of India, and any disputes arising shall fall under the jurisdiction of the courts in Pune, Maharashtra. For any queries or concerns, users may contact <a href="mailto:medivault.co@gmail.com" style={{color: 'var(--color-accent-blue)'}}>medivault.co@gmail.com</a>.</p>
                    </div>
                  )}
                  
                  { (documentType === 'all' || documentType === 'privacy') && (
                    <div>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--color-text)' }}>PRIVACY POLICY</h3>
                      <p style={{ marginBottom: '16px' }}>MediVault Private Limited (“MediVault”, “we”, “our”, “us”) operates a secure web-based platform designed to enable hospitals and healthcare organizations to store, manage, and access patient medical records using biometric authentication. We are committed to protecting personal data in compliance with applicable Indian laws, including the Information Technology Act, 2000, the SPDI Rules, 2011, and the Digital Personal Data Protection Act, 2023.</p>
                      <p style={{ marginBottom: '16px' }}>This Privacy Policy applies to hospitals and organizations registered on MediVault, as well as their authorized doctors, staff, and patients whose data is processed through the platform. MediVault collects various categories of data to enable its services. This includes patient data such as name, age, gender, contact details, address, emergency contact information, medical history, treatment records, health reports, current conditions, and biometric identifiers such as fingerprints or iris data. It also includes data related to doctors and staff, such as their personal details, contact information, qualifications, experience, license numbers, and hospital affiliations. Additionally, MediVault collects organizational data including hospital name, address, license details, and login credentials, along with authentication data such as email, phone number, OTP, username, and system activity logs.</p>
                      <p style={{ marginBottom: '16px' }}>Certain categories of data, including health and biometric information, are classified as Sensitive Personal Data under Indian law. MediVault processes such data only with explicit consent, for lawful healthcare-related purposes, and with strict security safeguards in place.</p>
                      <p style={{ marginBottom: '16px' }}>The data collected is used to enable secure storage and retrieval of medical records, authenticate authorized users through biometric verification, facilitate emergency medical access, improve platform functionality, and provide AI-based insights where applicable. MediVault does not sell personal data and only shares information with registered hospitals and authorized personnel, trusted cloud service providers such as AWS or Google Cloud, and government authorities when required by law.</p>
                      <p style={{ marginBottom: '16px' }}>All data is stored within India, and MediVault employs robust security measures including encryption, role-based access control, biometric authentication, and secure cloud infrastructure to protect personal information. Users have rights under the Digital Personal Data Protection Act, 2023, including the right to access their data, request corrections, request deletion, and withdraw consent.</p>
                      <p style={{ marginBottom: '16px' }}>Data is retained only for as long as necessary to fulfill healthcare and legal obligations or until a valid deletion request is received, subject to applicable laws. MediVault does not directly collect data from minors; hospitals are responsible for ensuring lawful data collection and consent in such cases.</p>
                      <p style={{ marginBottom: '16px' }}>For grievance redressal, users may contact the designated Grievance Officer, Krish Bansod / Amiya Bar, at <a href="mailto:medivault.co@gmail.com" style={{color: 'var(--color-accent-blue)'}}>medivault.co@gmail.com</a>. All complaints will be addressed within 30 days in accordance with Indian legal requirements. For general inquiries, MediVault can be contacted at <a href="mailto:medivault.co@gmail.com" style={{color: 'var(--color-accent-blue)'}}>medivault.co@gmail.com</a>.</p>
                    </div>
                  )}
            </div>
            
            <div style={{ 
              padding: '24px 32px', 
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              justifyContent: 'flex-end',
              background: 'rgba(255,255,255,0.4)'
            }}>
              <button 
                className="auth-submit-btn pill-btn glossy-btn" 
                onClick={onClose}
                style={{ width: 'auto', padding: '12px 32px' }}
              >
                Accept & Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Safely mount the modal at the absolute root of the DOM to avoid CSS strict stacking context issues
  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
};

export default LegalOverlay;
