
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Building2, MapPin, Mail, Key, User, Lock, ChevronRight, Fingerprint, Eye, EyeOff } from 'lucide-react';
import AnimatedBackground from '../components/layout/AnimatedBackground';
import './RegisterPage.css';

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 40 : -40,
    opacity: 0
  })
};

const RegisterPage = () => {
  const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
  const [[page, direction], setPage] = useState([0, 0]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const otpRefs = useRef([]);
  const navigate = useNavigate();

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

const handleComplete = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Registration Successful");
      navigate("/login");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
    alert("Server Error");
  }
};

  return (
    <div className="auth-container">
      <div className="auth-background">
        <AnimatedBackground />
      </div>

      <Link to="/" className="auth-back-link">
        <ArrowLeft size={20} /> Back to Home
      </Link>

      <motion.div 
        className="auth-card split-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Left Information Pane */}
        <div className="auth-info-pane">
          <h2 className="info-heading">Join the Network</h2>
          
          <div className="info-graphic-wrapper">
            <img src="/images/logo.png" alt="MediVault Logo" className="info-graphic auth-main-logo" />
          </div>

          <p className="info-description">
            Verify your NHA identity to establish your organization's decentralized biometric node securely.
          </p>
          <div className="info-disclaimer-container">
            <p className="info-disclaimer">Secure Healthcare Platform.</p>
          </div>
        </div>

        {/* Right Form Pane */}
        <div className="auth-form-pane-wrapper">
          <div className="auth-form-pane register-form-pane">
            
            {showTerms ? (
              <div className="terms-policy-view" style={{ display: 'flex', flexDirection: 'column', height: '100%', maxHeight: '540px' }}>
                <h1 className="heading-md" style={{ marginBottom: '16px', textAlign: 'center' }}>Legal Agreements</h1>
                
                <div className="legal-scroll-area" style={{ overflowY: 'auto', paddingRight: '12px', fontSize: '0.85rem', lineHeight: '1.6', color: 'var(--color-text)', textAlign: 'left', flex: 1, marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>TERMS & CONDITIONS</h3>
                  <p style={{ marginBottom: '12px', fontStyle: 'italic' }}>Effective Date: 02/04/2026</p>
                  <p style={{ marginBottom: '12px' }}>By accessing or using MediVault, hospitals and organizations agree to be bound by these Terms and Conditions. Only duly registered hospitals and healthcare organizations are permitted to use the platform, and all users must ensure that the information provided during registration and use of the platform is accurate, complete, and lawful.</p>
                  <p style={{ marginBottom: '12px' }}>MediVault provides a secure, web-based platform for the storage and management of medical records, incorporating biometric-based authentication and role-based access control for authorized doctors and staff. MediVault is strictly a technology platform and does not operate as a healthcare provider, nor does it offer medical services.</p>
                  <p style={{ marginBottom: '12px' }}>Hospitals are solely responsible for managing their accounts, ensuring that access is granted only to authorized personnel, and maintaining the confidentiality and security of login credentials. Access to patient data requires biometric authentication, and hospitals must ensure that such biometric data is collected lawfully and with proper consent. MediVault shall not be held liable for any misuse of biometric data at the hospital level.</p>
                  <p style={{ marginBottom: '12px' }}>Hospitals act as data fiduciaries with respect to patient data, while MediVault functions as a data processor. It is the responsibility of hospitals to obtain valid and informed consent from patients prior to uploading or processing their data on the platform.</p>
                  <p style={{ marginBottom: '12px' }}>MediVault may provide emergency access features strictly for critical situations. Any misuse of such features may result in suspension of access or legal action. Additionally, the platform may include AI-based features that provide insights or suggestions; however, these are purely informational in nature and must not be considered as medical advice. All medical decisions must be made by qualified healthcare professionals.</p>
                  <p style={{ marginBottom: '12px' }}>MediVault does not provide medical advice, diagnosis, or treatment, and any medical-related outputs generated by the platform are intended solely for assistance purposes. MediVault shall not be liable for inaccuracies in data entered by hospitals, medical decisions made based on such data, unauthorized access resulting from negligence by the hospital, or any system downtime or technical failures beyond reasonable control.</p>
                  <p style={{ marginBottom: '12px' }}>Users may request deletion of data in accordance with applicable laws, and MediVault reserves the right to suspend or terminate access in cases of misuse, legal violations, or security concerns. The platform is currently offered free of charge; however, MediVault reserves the right to introduce pricing in the future with prior notice.</p>
                  <p style={{ marginBottom: '24px' }}>All intellectual property rights related to the platform, including its design, technology, and content, are owned by MediVault Private Limited. These Terms shall be governed by the laws of India, and any disputes arising shall fall under the jurisdiction of the courts in Pune, Maharashtra. For any queries or concerns, users may contact medivault.co@gmail.com.</p>
                  
                  <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>PRIVACY POLICY</h3>
                  <p style={{ marginBottom: '12px' }}>MediVault Private Limited (“MediVault”, “we”, “our”, “us”) operates a secure web-based platform designed to enable hospitals and healthcare organizations to store, manage, and access patient medical records using biometric authentication. We are committed to protecting personal data in compliance with applicable Indian laws, including the Information Technology Act, 2000, the SPDI Rules, 2011, and the Digital Personal Data Protection Act, 2023.</p>
                  <p style={{ marginBottom: '12px' }}>This Privacy Policy applies to hospitals and organizations registered on MediVault, as well as their authorized doctors, staff, and patients whose data is processed through the platform. MediVault collects various categories of data to enable its services. This includes patient data such as name, age, gender, contact details, address, emergency contact information, medical history, treatment records, health reports, current conditions, and biometric identifiers such as fingerprints or iris data. It also includes data related to doctors and staff, such as their personal details, contact information, qualifications, experience, license numbers, and hospital affiliations. Additionally, MediVault collects organizational data including hospital name, address, license details, and login credentials, along with authentication data such as email, phone number, OTP, username, and system activity logs.</p>
                  <p style={{ marginBottom: '12px' }}>Certain categories of data, including health and biometric information, are classified as Sensitive Personal Data under Indian law. MediVault processes such data only with explicit consent, for lawful healthcare-related purposes, and with strict security safeguards in place.</p>
                  <p style={{ marginBottom: '12px' }}>The data collected is used to enable secure storage and retrieval of medical records, authenticate authorized users through biometric verification, facilitate emergency medical access, improve platform functionality, and provide AI-based insights where applicable. MediVault does not sell personal data and only shares information with registered hospitals and authorized personnel, trusted cloud service providers such as AWS or Google Cloud, and government authorities when required by law.</p>
                  <p style={{ marginBottom: '12px' }}>All data is stored within India, and MediVault employs robust security measures including encryption, role-based access control, biometric authentication, and secure cloud infrastructure to protect personal information. Users have rights under the Digital Personal Data Protection Act, 2023, including the right to access their data, request corrections, request deletion, and withdraw consent.</p>
                  <p style={{ marginBottom: '12px' }}>Data is retained only for as long as necessary to fulfill healthcare and legal obligations or until a valid deletion request is received, subject to applicable laws. MediVault does not directly collect data from minors; hospitals are responsible for ensuring lawful data collection and consent in such cases.</p>
                  <p style={{ marginBottom: '12px' }}>For grievance redressal, users may contact the designated Grievance Officer, Krish Bansod / Amiya Bar, at medivault.co@gmail.com. All complaints will be addressed within 30 days in accordance with Indian legal requirements. For general inquiries, MediVault can be contacted at medivault.co@gmail.com.</p>
                </div>
                
                <button type="button" className="auth-submit-btn pill-btn glossy-btn" onClick={() => setShowTerms(false)}>
                  Back
                </button>
              </div>
            ) : (
              <>
                <div className="wizard-progress">
                  <div className={`progress-step ${page >= 0 ? 'active' : ''}`}></div>
                  <div className={`progress-step ${page >= 1 ? 'active' : ''}`}></div>
                  <div className={`progress-step ${page >= 2 ? 'active' : ''}`}></div>
                </div>

                <div className="auth-header-right register-header-right">
                   {page === 0 && <h1 className="heading-md">Organization Identity</h1>}
                   {page === 1 && <h1 className="heading-md">Security Verification</h1>}
                   {page === 2 && <h1 className="heading-md">Admin Credentials</h1>}
                </div>

          <div className="wizard-content">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              {page === 0 && (
                <motion.form 
                  key="step1"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                  onSubmit={(e) => { e.preventDefault(); paginate(1); }}
                  className="auth-form"
                >
                  <p className="step-desc">Enter your official credentials.</p>
                  
                  <div className="input-group">
                    <label>NHA Hospital ID</label>
                    <div className="input-wrapper boxed">
                      <input type="text" placeholder="NHA-XXXX-XXXX" required />
                      <Key size={18} className="input-icon-right" />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Legal Hospital Name</label>
                    <div className="input-wrapper boxed">
                      <input type="text" placeholder="General City Hospital" required />
                      <Building2 size={18} className="input-icon-right" />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>City and State</label>
                    <div className="input-wrapper boxed">
                      <input type="text" placeholder="e.g. Pune, Maharashtra" required />
                      <MapPin size={18} className="input-icon-right" />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Authorized Email</label>
                    <div className="input-wrapper boxed">
                      <input type="email" placeholder="admin@hospital.org" required />
                      <Mail size={18} className="input-icon-right" />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', marginTop: '8px', marginBottom: '8px' }}>
                    <input 
                      type="checkbox" 
                      required 
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      style={{ width: '15px', height: '15px', flexShrink: 0, cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
                      I accept the <button type="button" onClick={() => setShowTerms(true)} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-accent-blue)', textDecoration: 'underline', cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit' }}>Terms & Conditions and Privacy Policies</button>.
                    </span>
                  </div>

                  <button type="submit" className="auth-submit-btn pill-btn glossy-btn inline-submit">
                    Verify Identity <ChevronRight size={18} />
                  </button>
                </motion.form>
              )}

              {page === 1 && (
                <motion.form 
                  key="step2"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                  onSubmit={(e) => { e.preventDefault(); paginate(1); }}
                  className="auth-form"
                >
                  <p className="step-desc">A 6-digit code has been sent to your Authorized NHA Email to verify access.</p>
                  
                  <div className="otp-container boxed-otp">
                    {[0, 1, 2, 3, 4, 5].map(index => (
                      <input 
                        key={index} 
                        type="text" 
                        maxLength="1" 
                        className="otp-box-rounded" 
                        required
                        ref={el => otpRefs.current[index] = el}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val && index < 5) {
                            otpRefs.current[index + 1].focus();
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !e.target.value && index > 0) {
                            otpRefs.current[index - 1].focus();
                          }
                        }}
                      />
                    ))}
                  </div>

                  <div className="form-row-actions">
                    <button type="button" className="btn-text" onClick={() => paginate(-1)}>Back</button>
                    <button type="submit" className="auth-submit-btn pill-btn glossy-btn inline-btn">
                      Confirm OTP
                    </button>
                  </div>
                </motion.form>
              )}

              {page === 2 && (
                <motion.form 
                  key="step3"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                  onSubmit={handleComplete}
                  className="auth-form"
                >
                  <p className="step-desc">Establish your master login identity. You will use these exact credentials to access the portal.</p>
                  
                  <div className="input-group">
                    <label>Create Admin Username</label>
                    <div className="input-wrapper boxed">
                      <input
                      type="text"
                      placeholder="admin_sarah"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                      <User size={18} className="input-icon-right" />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Secure Password</label>
                    <div className="input-wrapper boxed">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required/>
                      <button 
                        type="button" 
                        className="password-toggle-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Confirm Password</label>
                    <div className="input-wrapper boxed">
                      <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      />
                      <button 
                        type="button" 
                        className="password-toggle-btn"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label="Toggle password visibility"
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="form-row-actions" style={{ marginTop: '24px' }}>
                    <button type="button" className="btn-text" onClick={() => paginate(-1)}>Back</button>
                    <button type="submit" className="auth-submit-btn pill-btn glossy-btn inline-btn">
                      Complete Setup
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <p className="auth-footer-text" style={{ marginTop: '24px' }}>
            Already verified? <Link to="/login">Sign In</Link>
          </p>
          </>
          )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
