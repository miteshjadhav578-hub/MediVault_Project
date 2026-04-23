import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, CheckCircle2, X } from 'lucide-react';
import './BiometricModal.css';

const BiometricModal = ({ 
  isOpen, 
  onClose, 
  onScanSuccess, 
  onEnrollSuccess, 
  isEnroll = false,
  title,
  subtitle
}) => {
  const [scanProgress, setScanProgress] = useState(0);
  const [status, setStatus] = useState('scanning'); // 'scanning', 'success', 'error', 'conflict'
  const [fingerDetected, setFingerDetected] = useState(false);

  useEffect(() => {
    let interval;
    if (isOpen) {
      setScanProgress(0);
      setStatus('scanning');
      setFingerDetected(false);
      
      const startTime = Date.now();
      const duration = 10000; // 10 seconds timeout

      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);
        
        setScanProgress(progress);

        if (progress >= 100 && !fingerDetected) {
          clearInterval(interval);
          setStatus('error'); // Timeout: No fingerprint detected
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isOpen, fingerDetected]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isOpen && status === 'scanning') {
        const key = e.key.toLowerCase();
        if (key === 's' || key === 'a') {
          handleSimulateDetection(false); // Success (Unique)
        } else if (key === 'c') {
          handleSimulateDetection(true);  // Conflict (Duplicate)
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, status]);

  if (!isOpen) return null;

  const handleSimulateDetection = (forceConflict = false) => {
    setFingerDetected(true);
    setStatus('processing'); // Visual transition

    // Simulate backend processing delay
    setTimeout(() => {
      if (isEnroll) {
        // If forceConflict is specifically requested via 'C' key
        if (forceConflict) {
          setStatus('conflict');
        } else {
          // Default to success for testing 'unique' enroll
          setStatus('success');
          setTimeout(() => {
            onClose();
            onEnrollSuccess?.();
          }, 1500);
        }
      } else {
        // Scan mode: Always success if detected in this simulation
        setStatus('success');
        setTimeout(() => {
          onClose();
          onScanSuccess?.();
        }, 1500);
      }
    }, 1200);
  };

  const getStatusContent = () => {
    switch (status) {
      case 'processing':
        return {
          title: 'Analyzing Pattern...',
          desc: 'Decrypting biometric hash and checking database',
          icon: <Fingerprint size={80} className="fingerprint-icon pulse" />,
          theme: isEnroll ? 'enroll-theme' : 'scan-theme'
        };
      case 'success':
        return {
          title: isEnroll ? 'Access Granted' : 'Identity Verified',
          desc: isEnroll ? 'New patient record ready for creation' : 'Medical profile found. Redirecting...',
          icon: <CheckCircle2 size={95} className="success-icon" />,
          theme: 'success-theme'
        };
      case 'error':
        return {
          title: 'No Fingerprint Detected',
          desc: 'Scanning timed out. Please ensure finger is placed firmly on the scanner.',
          icon: <X size={90} className="error-icon" />,
          theme: 'error-theme'
        };
      case 'conflict':
        return {
          title: 'Already Registered',
          desc: 'This biometric ID is already linked to an existing MediVault record.',
          icon: <X size={90} className="error-icon" />,
          theme: 'error-theme'
        };
      default:
        return {
          title: title || (isEnroll ? 'Biometric Enrollment' : 'Biometric Header'),
          desc: subtitle || 'Please place finger on the physical scanner',
          icon: <Fingerprint size={80} className="fingerprint-icon" />,
          theme: isEnroll ? 'enroll-theme' : 'scan-theme'
        };
    }
  };

  const content = getStatusContent();

  return (
    <AnimatePresence>
      <div className="scan-modal-overlay">
        <motion.div 
          className={`scan-card glass-panel ${content.theme}`}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
        >
          <button className="scan-close-btn" onClick={onClose}>
            <X size={20} />
          </button>

          <div className="scan-content">
            <div className={`scan-icon-wrapper ${status !== 'scanning' ? 'status-active' : ''}`}>
              {content.icon}
              {status === 'scanning' && <div className="scanning-line" />}
              {status === 'processing' && <div className="scanning-line fast" />}
            </div>

            <div className="text-group">
              <h3>{content.title}</h3>
              <p>{content.desc}</p>
            </div>

            {status === 'scanning' && (
              <div className="scan-timeout-warning">
                Timeout in {Math.ceil(10 - (scanProgress / 10))}s
              </div>
            )}

            {(status === 'error' || status === 'conflict') && (
              <button className="btn-retry-scan" onClick={onClose}>
                Close and Try Again
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BiometricModal;
