import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ScanFace, Activity, HeartPulse, Building2, Smartphone, BellRing, Lock, ChevronDown } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedBackground from '../components/layout/AnimatedBackground';
import heroVideo from '../../Video/9574138-uhd_4096_2160_25fps.mp4';
import './LandingPage.css';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const LandingPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How does the passwordless system work?",
      a: "Doctors and staff use physical biometric devices at verified hospitals to authenticate instantly. Patients never need to remember passwords or carry ID cards."
    },
    {
      q: "What is the 'Golden Hour' protocol?",
      a: "In emergencies where patients are unresponsive, verified hospitals use the patient's fingerprint to instantly access critical records like allergies and medications, saving life-critical time."
    },
    {
      q: "Can anyone access patient records?",
      a: "No. Only National Health Authority (NHA) verified hospitals can access the database, and only when a patient is physically present. Every access triggers an instant SMS alert to the patient and their emergency contacts."
    },
    {
      q: "How does the AI Drug Copilot work?",
      a: "Our integrated Copilot analyzes the patient’s exact allergy history and active prescriptions against any new drug you intend to administer, flagging lethal interactions immediately."
    }
  ];

  return (
    <>
      <Navbar />
      <div className="landing-page">
        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="hero-video-bg">
            <video src={heroVideo} autoPlay loop muted playsInline />
            <div className="hero-video-overlay"></div>
          </div>

          <div className="container hero-container text-center">
            <motion.div 
              className="hero-content centered"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeUpVariant} className="hero-badge">
                <span className="badge-dot"></span>
                National Health Authority Verified
              </motion.div>
              
              <motion.h1 variants={fadeUpVariant} className="heading-xl hero-title">
                Every Second Counts.<br/>
                <span className="hero-title-accent">Every Second Saved.</span>
              </motion.h1>
              
              <motion.p variants={fadeUpVariant} className="hero-subtitle text-lg mx-auto">
                Empower your hospital with instant emergency access to patient records, 
                AI-powered drug safety checks, and seamless inpatient management.
              </motion.p>
              
              <motion.div variants={fadeUpVariant} className="hero-actions justify-center">
                <Link to="/register" className="btn-primary hero-btn">Register Hospital</Link>
                <Link to="/login" className="btn-secondary hero-btn">Login</Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="how-it-works section-padding">
          <div className="container">
            <motion.div 
              className="section-header text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
            >
              <h2 className="heading-lg">How MediVault works.</h2>
              <p className="text-md">A seamless, passwordless experience designed for the golden hour of medical emergencies.</p>
            </motion.div>

            <motion.div 
              className="steps-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {[
                { image: "/images/hospital_onboarding.png", title: "1. Hospital Onboarding", desc: "Register your organization with automated NHA license verification to ensure trust and compliance." },
                { image: "/images/biometric_identity.png", title: "2. Biometric Identity", desc: "Doctors and patients identify instantly via integrated biometric scanning. No usernames, no delays." },
                { image: "/images/instant_access.png", title: "3. Instant Access", desc: "During emergencies, scan a patient's fingerprint to immediately access life-saving allergy and treatment data." }
              ].map((step, i) => (
                <motion.div key={i} variants={fadeUpVariant} className="step-card glass-panel">
                  <div className="step-image-wrapper">
                    <img src={step.image} alt={step.title} className="step-image" />
                  </div>
                  <div className="step-content">
                    <h3 className="heading-md">{step.title}</h3>
                    <p className="text-md">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* WHY MEDIVAULT SECTION */}
        <section id="security" className="why-section section-padding">
          <div className="container why-container">
            <motion.div 
              className="why-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeUpVariant} className="heading-lg">Trust at the Core.</motion.h2>
              <motion.p variants={fadeUpVariant} className="text-lg">
                Patient privacy is our highest priority. Every data access is logged, verified, and beautifully visualized.
              </motion.p>
              <motion.ul variants={staggerContainer} className="trust-list">
                {[
                  { icon: ShieldCheck, title: "Biometric Checkpoints", desc: "Cannot view or update records without physical presence." },
                  { icon: BellRing, title: "Instant Notifications", desc: "Patients and emergency contacts are notified instantly on data access." },
                  { icon: Lock, title: "End-to-End Audit Logs", desc: "Every doctor interaction is logged against their biometric ID." }
                ].map((item, i) => (
                  <motion.li key={i} variants={fadeUpVariant}>
                    <item.icon className="trust-icon" size={24} />
                    <div>
                      <strong>{item.title}</strong>
                      <p className="text-sm">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Minimalist Dashboard Graphic */}
            <motion.div 
              className="why-visual"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src="/images/dashboard_mockup.png" alt="MediVault Dashboard UI" className="dashboard-image" />
            </motion.div>
          </div>
        </section>

        {/* FEATURES HIGHLIGHT */}
        <section id="features" className="features-section section-padding">
          <div className="container">
            <motion.div 
              className="section-header text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
            >
              <h2 className="heading-lg">Beyond standard records.</h2>
              <p className="text-md">Tools built explicitly to eliminate human error.</p>
            </motion.div>

            <motion.div 
               className="features-grid"
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={staggerContainer}
            >
              <motion.div variants={fadeUpVariant} className="feature-item">
                <div className="feature-icon">
                  <img src="/images/ai_copilot.png" alt="AI Drug Safety Copilot" className="feature-img" />
                </div>
                <h4>AI Drug Safety Copilot</h4>
                <p className="text-sm">Ask our LLM-powered assistant if a specific drug is safe based on the patient's exact allergy profile and current meds.</p>
              </motion.div>
              
              <motion.div variants={fadeUpVariant} className="feature-item">
                <div className="feature-icon">
                  <img src="/images/inpatient_mode.png" alt="Inpatient Mode" className="feature-img" />
                </div>
                <h4>Inpatient Mode</h4>
                <p className="text-sm">Admit patients to temporarily bypass their biometric requirement for routine care, while still demanding doctor biometrics for updates.</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="faq-section section-padding">
          <div className="container">
            <motion.div 
              className="section-header text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
            >
              <h2 className="heading-lg">Frequently Asked Questions</h2>
              <p className="text-md">Clarity on security, access, and protocols.</p>
            </motion.div>

            <div className="faq-container mx-auto">
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index} 
                  className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUpVariant}
                  onClick={() => toggleFaq(index)}
                >
                  <div className="faq-question">
                    <h3 className="text-lg">{faq.q}</h3>
                    <ChevronDown 
                      className={`faq-icon ${activeFaq === index ? 'rotate' : ''}`} 
                      size={24} 
                    />
                  </div>
                  <motion.div 
                    className="faq-answer"
                    initial={false}
                    animate={{ height: activeFaq === index ? 'auto' : 0, opacity: activeFaq === index ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p className="text-sm">{faq.a}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="cta-section section-padding">
          <div className="container text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeUpVariant} className="heading-lg">Ready to upgrade your hospital?</motion.h2>
              <motion.p variants={fadeUpVariant} className="text-lg cta-subtitle">Join the network of secure, modern medical facilities.</motion.p>
              <motion.div variants={fadeUpVariant}>
                <Link to="/register" className="btn-primary cta-btn">Start Organization Registration</Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
