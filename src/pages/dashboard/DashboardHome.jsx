import React, { useState } from 'react';
import { Fingerprint, PlusCircle } from 'lucide-react';
import BiometricModal from '../../components/dashboard/BiometricModal';
import PatientScanResult from './PatientScanResult';
import PatientEnrollmentForm from './PatientEnrollmentForm';
import './DashboardHome.css';

const DashboardHome = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'scan-result', 'enroll-form'
  const [matchedPatient, setMatchedPatient] = useState(null);

  if (viewMode === 'scan-result') {
    return (
  <PatientScanResult
    onBack={() => setViewMode('grid')}
    scannedPatient={matchedPatient}
  />
);
  }

  if (viewMode === 'enroll-form') {
    return <PatientEnrollmentForm onBack={() => setViewMode('grid')} />;
  }

  return (
    <>
    <div className="dashboard-grid">
      
      {/* TOP METRICS ROW */}
      <section className="metrics-row">
        <div className="stat-card glass-panel">
          <div className="stat-title">Patients scanned today</div>
          <div className="stat-value">24</div>
          <div className="stat-subtitle">across all systems</div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-title">Active inpatients</div>
          <div className="stat-value">8</div>
          <div className="stat-subtitle">2 discharging soon</div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-title">Enrolled fingerprint</div>
          <div className="stat-value">47</div>
          <div className="stat-subtitle">in last 30 days </div>
        </div>
      </section>

      {/* MIDDLE ACTION ROW */}
      <section className="actions-row">
        
        {/* SCAN PATIENT CARD */}
        <div 
          className="action-card-large theme-blue glass-panel clickable-card"
          onClick={() => setIsScanning(true)}
        >
          <div className="action-card-content">
            <div className="action-icon-small"><Fingerprint size={20} /></div>
            <h2>Scan patient</h2>
            <p>Scan fingerprint to instantly load full medical profile, history and allergies</p>
            <button className="btn-action-primary glow-blue" onClick={(e) => { e.stopPropagation(); setIsScanning(true); }}>Scan now</button>
          </div>
          <div className="action-3d-asset">
            <img src="/images/card_scan.png" alt="Biometric Scanner" />
          </div>
        </div>

        {/* ENROLL PATIENT CARD */}
        <div 
          className="action-card-large theme-neutral glass-panel clickable-card"
          onClick={() => setIsEnrolling(true)}
        >
          <div className="action-card-content">
            <div className="action-icon-small theme-green-icon"><PlusCircle size={20} /></div>
            <h2>Enroll new patient</h2>
            <p>Register a new patient and create their biometric medical ID on MediVault</p>
            <button className="btn-action-secondary glow-emerald" onClick={(e) => { e.stopPropagation(); setIsEnrolling(true); }}>Enroll</button>
          </div>
          <div className="action-3d-asset">
            <img src="/images/card_enroll.png" alt="Hospital Enrollment" />
          </div>
        </div>

      </section>

      {/* BOTTOM LIST ROW */}
      <section className="lists-row">
        
        {/* RECENT ACTIVITY */}
        <div className="list-card glass-panel">
          <h3 className="list-title">Recent activity</h3>
          <div className="list-items">
            <div className="list-row">
              <span className="list-text">Dr. Anjali Sharma updated patient #AP-3301</span>
              <span className="list-time">2m<br/>ago</span>
            </div>
            <div className="list-row">
              <span className="list-text">Patient scanned #AP-2841</span>
              <span className="list-time">14m<br/>ago</span>
            </div>
            <div className="list-row">
              <span className="list-text">Dr. Priya Rao enrolled New patient  #AP-3410</span>
              <span className="list-time">1h<br/>ago</span>
            </div>
          </div>
        </div>

        {/* ALERTS */}
        <div className="list-card glass-panel">
          <h3 className="list-title">Alerts</h3>
          <div className="list-items">
            <div className="list-row">
              <span className="list-text">Inpatient IP-2026-00 — Discharging today</span>
              <span className="pill badge-urgent">Urgent</span>
            </div>
            <div className="list-row">
              <span className="list-text">Login from a recognized devic</span>
              <span className="pill badge-access">Access</span>
            </div>
            <div className="list-row">
              <span className="list-text">New device logged into your account</span>
              <span className="pill badge-action">Action</span>
            </div>
          </div>
        </div>

      </section>

    </div>

    <BiometricModal 
      isOpen={isScanning} 
      onClose={() => setIsScanning(false)} 
      onScanSuccess={async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/patients"
    );

    const patients = await response.json();

    if (patients.length > 0) {
      setMatchedPatient(patients[0]); // temporary
      setViewMode('scan-result');
    } else {
      alert("No patients found");
    }

  } catch (error) {
    console.log(error);
    alert("Server Error");
  }
}}
      subtitle="Please place patient finger on physical scanner"
    />

    <BiometricModal 
      isOpen={isEnrolling} 
      onClose={() => setIsEnrolling(false)} 
      isEnroll={true}
      onEnrollSuccess={() => setViewMode('enroll-form')}
      subtitle="Please place patient finger on physical scanner"
    />
    </>
  );
};

export default DashboardHome;
