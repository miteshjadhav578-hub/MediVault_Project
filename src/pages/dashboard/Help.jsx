import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone, 
  ExternalLink, 
  MessageSquare, 
  Send,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import './Help.css';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`help-faq-item ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="faq-question">
        <span>{question}</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>
      {isOpen && (
        <div className="faq-answer">
          <p>{answer || "This section provides detailed instructions and troubleshooting steps for the selected topic. Our system is designed for maximum efficiency and security."}</p>
        </div>
      )}
    </div>
  );
};

const Help = () => {
  const [message, setMessage] = useState('');

  const faqs = {
    general: [
      { question: "How do I scan a patient?", answer: "To scan a patient, navigate to the Dashboard and click 'Scan Now'. Ensure the patient's finger is clean and placed firmly on the biometric scanner. The system will automatically retrieve the medical ID." },
      { question: "How do I enroll a new patient?", answer: "Go to the Dashboard and select 'Enroll New Patient'. Follow the prompts to capture demographic data and link it to a biometric signature for secure identification." },
      { question: "How do I update a patient's medical data?", answer: "Search for the patient via fingerprint or ID, then select 'Edit Profile' to update history, allergies, or current prescriptions." },
      { question: "How do I admit a patient as inpatient?", answer: "On the patient's detail page, click the 'Admit' button and assign a ward/bed to initiate inpatient tracking." },
      { question: "Can another hospital access our patients?", answer: "Yes, if they are part of the MediVault network and have emergency clearance, though all access is logged and biometric-verified." }
    ],
    technical: [
      { question: "What if the fingerprint scanner is not working?", answer: "Ensure the device is connected via USB/Network. Clean the scanner surface with a dry cloth. If persist, restart the MediVault Bridge service." },
      { question: "Why was a login attempt blocked?", answer: "Logins are blocked if they occur from unrecognized devices or locations. Check your Notifications for security alerts to unblock access." },
      { question: "How do I change the admin password?", answer: "Go to Settings > Security and follow the 'Change Password' protocol, which requires biometric re-verification." }
    ]
  };

  return (
    <div className="help-page-container help-page-full-layout">
      {/* MAIN CONTENT AREA */}
      <div className="help-main-content">
        <header className="staff-header">
          <div className="staff-title-group">
            <h2>Help Center</h2>
            <span>Frequently asked questions · or ask the chatbot</span>
          </div>
        </header>

        <section className="help-faq-section help-faq-grid">
          <div className="category-group">
            <h4 className="category-title">GENERAL USAGE</h4>
            <div className="faq-list">
              {faqs.general.map((f, idx) => (
                <FAQItem key={idx} question={f.question} answer={f.answer} />
              ))}
            </div>
          </div>

          <div className="category-group">
            <h4 className="category-title">TECHNICAL</h4>
            <div className="faq-list">
              {faqs.technical.map((f, idx) => (
                <FAQItem key={idx} question={f.question} answer={f.answer} />
              ))}
            </div>
          </div>
        </section>

        <section className="support-section">
          <h4 className="section-label">STILL NEED HELP?</h4>
          <p className="section-subtext">If your issue wasn't resolved by the FAQ or chatbot, reach out to MediVault support directly.</p>
          
          <div className="support-cards help-support-grid">
            <div className="support-card glass-panel-inner">
              <div className="support-icon email-icon">
                <Mail size={18} />
              </div>
              <div className="support-info">
                <span className="info-label">EMAIL SUPPORT</span>
                <span className="info-value text-compact">medivault.co@gmail.com</span>
              </div>
              <ExternalLink size={14} className="support-arrow" />
            </div>

            <div className="support-card glass-panel-inner">
              <div className="support-icon phone-icon">
                <Phone size={18} />
              </div>
              <div className="support-info">
                <span className="info-label">PHONE SUPPORT · MON-SAT, 9-6</span>
                <span className="info-value text-compact">+91 800 012 3456</span>
              </div>
              <ExternalLink size={14} className="support-arrow" />
            </div>

            <div className="support-card glass-panel-inner">
              <div className="support-icon ticket-icon">
                <MessageSquare size={18} />
              </div>
              <div className="support-info">
                <span className="info-label">RAISE A SUPPORT TICKET</span>
                <span className="info-value text-compact">medivault.in/support</span>
              </div>
              <ExternalLink size={14} className="support-arrow" />
            </div>
          </div>
        </section>
      </div>

      {/* CHATBOT SIDEBAR PANEL */}
      <aside className="help-chatbot-panel glass-panel">
        <div className="chatbot-header">
          <h3 className="chatbot-title">MediVault Assistant</h3>
          <p className="chatbot-subtitle">Ask anything about the system</p>
        </div>

        <div className="chatbot-messages">
          <div className="message assistant">
            <div className="message-bubble">
              Hi! I'm the MediVault assistant. Ask me anything about using the system — scanning patients, enrolling, managing inpatients, or technical issues.
            </div>
            <span className="message-time">Just now</span>
          </div>
        </div>

        <div className="chatbot-input-area">
          <div className="input-wrapper glass-panel-inner">
            <input 
              type="text" 
              placeholder="Ask a question..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && setMessage('')}
            />
            <button className="send-btn" onClick={() => setMessage('')}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Help;
