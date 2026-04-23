import React, { useState } from 'react';
import { Search, Plus, ArrowLeft } from 'lucide-react';
import AddStaffModal from '../../components/dashboard/AddStaffModal';
import './DoctorsStaff.css';

// MOCK DATA: Accurately replicates the user's uploaded screenshots.
const mockDoctors = [
  {
    id: 'doc_1',
    initials: 'AS',
    colorClass: 'avatar-blue',
    fullName: 'Dr. Anjali Sharma',
    degree: 'MBBS, MD',
    specialty: 'Cardiology',
    experience: '12 years',
    age: '38 yrs',
    gender: 'Female',
    licenseNo: 'MH-2014-09821',
    fingerprintRegistered: true,
    activities: [
      { action: 'Updated allergy data — Patient #2841', time: '2m ago' },
      { action: 'Enrolled new patient #3190', time: '8m ago' },
      { action: 'Scanned patient #1023 at OPD', time: '14m ago' },
      { action: 'Updated medications — Patient #2201', time: '1h ago' },
      { action: 'Scanned patient #0891', time: '2h ago' },
      { action: 'Updated treatment — Patient #3301', time: '3h ago' },
      { action: 'Enrolled new patient #3188', time: '5h ago' },
      { action: 'Scanned patient #2100', time: 'Yesterday' },
      { action: 'Updated history — Patient #1500', time: 'Yesterday' },
      { action: 'Scanned patient #0442', time: '2d ago' },
      { action: 'Prescribed medication — Patient #0300', time: '2d ago' },
      { action: 'Reviewed lab results — Patient #9112', time: '3d ago' },
      { action: 'Consultation logged — Patient #2299', time: '4d ago' },
      { action: 'Enrolled new patient #3210', time: '5d ago' },
      { action: 'Scanned patient #0112', time: '1w ago' },
      { action: 'Updated diagnosis — Patient #9910', time: '1w ago' },
      { action: 'Follow-up appointment — Patient #4411', time: '1w ago' },
      { action: 'Enrolled new patient #3235', time: '2w ago' },
      { action: 'Scanned patient #5512', time: '2w ago' },
      { action: 'Discharged patient #1200', time: '3w ago' },
    ]
  },
  {
    id: 'doc_2',
    initials: 'RM',
    colorClass: 'avatar-gold',
    fullName: 'Dr. Rohan Mehta',
    degree: 'MBBS, MS',
    specialty: 'Orthopedics',
    experience: '8 years',
    age: '34 yrs',
    gender: 'Male',
    licenseNo: 'MH-2018-11234',
    fingerprintRegistered: true,
    activities: [
      { action: 'Scanned patient #9234 at ER', time: '10m ago' },
      { action: 'Reviewed X-Rays — Patient #9102', time: '3h ago' },
      { action: 'Consultation logged', time: '1d ago' },
    ]
  },
  {
    id: 'doc_3',
    initials: 'PR',
    colorClass: 'avatar-green',
    fullName: 'Dr. Priya Rajput',
    degree: 'MBBS, DNB',
    specialty: 'Pediatrics',
    experience: '15 years',
    age: '42 yrs',
    gender: 'Female',
    licenseNo: 'MH-2009-44512',
    fingerprintRegistered: true,
    activities: [
      { action: 'Updated vaccination chart', time: '20m ago' },
    ]
  },
  {
    id: 'doc_4',
    initials: 'SK',
    colorClass: 'avatar-purple',
    fullName: 'Dr. Sameer Kapoor',
    degree: 'MBBS, DM',
    specialty: 'Neurology',
    experience: '20 years',
    age: '50 yrs',
    gender: 'Male',
    licenseNo: 'MH-2004-10029',
    fingerprintRegistered: true,
    activities: []
  },
  {
    id: 'doc_5',
    initials: 'NJ',
    colorClass: 'avatar-orange',
    fullName: 'Dr. Neha Joshi',
    degree: 'MBBS, MD',
    specialty: 'Dermatology',
    experience: '6 years',
    age: '31 yrs',
    gender: 'Female',
    licenseNo: 'MH-2020-88712',
    fingerprintRegistered: true,
    activities: []
  },
  {
    id: 'doc_6',
    initials: 'VD',
    colorClass: 'avatar-teal',
    fullName: 'Dr. Vikram Deshmukh',
    degree: 'MBBS, MCh',
    specialty: 'Surgery',
    experience: '25 years',
    age: '55 yrs',
    gender: 'Male',
    licenseNo: 'MH-1998-33310',
    fingerprintRegistered: true,
    activities: []
  }
];

const DoctorsStaff = () => {
  const [expandedDocId, setExpandedDocId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddStaff = (newStaff) => {
    console.log('New staff added:', newStaff);
    // In a real app, this would push to state or API
  };

  // Deriving the selected doctor
  const activeDoctor = mockDoctors.find((d) => d.id === expandedDocId);

  return (
    <div className="staff-layout">
      
      {/* HEADER ACTIONS */}
      <div className="staff-header">
        <div className="staff-title-group">
          <h2>Doctors & Staff</h2>
          <span>6 members enrolled</span>
        </div>
        <button 
          className="btn-add-doctor glass-button"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={18} />
          Add doctor & Staff
        </button>
      </div>

      <div className="staff-search-bar glass-panel">
        <Search size={20} className="search-icon-glass" />
        <input 
          type="text" 
          placeholder="Search by name, degree or license number..." 
          className="search-input-glass"
        />
      </div>

      {/* DYNAMIC VIEW RENDERING */}
      {expandedDocId && activeDoctor ? (
        // EXPANDED VIEW
        <div className="doctor-expanded-card glass-panel">
          
          <button className="btn-back-glass" onClick={() => setExpandedDocId(null)}>
            <ArrowLeft size={16} /> Back
          </button>

          <div className="expanded-header">
            <div className={`doc-avatar-large ${activeDoctor.colorClass}`}>
              {activeDoctor.initials}
            </div>
            <div className="doc-primary-info">
              <h3>{activeDoctor.fullName}</h3>
              <p>{activeDoctor.degree} · {activeDoctor.specialty}</p>
              <div className="status-indicator">
                <span className="dot active"></span>
                Fingerprint registered
              </div>
            </div>
          </div>

          <div className="expanded-grid">
            {/* LEFT COLUMN: Data Sheet */}
            <div className="doc-data-sheet">
              <div className="data-row">
                <div className="data-col">
                  <label>Full name</label>
                  <span>{activeDoctor.fullName}</span>
                </div>
                <div className="data-col">
                  <label>Department</label>
                  <span>{activeDoctor.specialty}</span>
                </div>
              </div>
              <div className="data-row">
                <div className="data-col">
                  <label>Degree</label>
                  <span>{activeDoctor.degree}</span>
                </div>
                <div className="data-col">
                  <label>Experience</label>
                  <span>{activeDoctor.experience}</span>
                </div>
              </div>
              <div className="data-row">
                <div className="data-col">
                  <label>Age</label>
                  <span>{activeDoctor.age}</span>
                </div>
                <div className="data-col">
                  <label>Gender</label>
                  <span>{activeDoctor.gender}</span>
                </div>
              </div>
              <div className="data-row">
                <div className="data-col">
                  <label>License no.</label>
                  <span>{activeDoctor.licenseNo}</span>
                </div>
                <div className="data-col">
                  <label>Fingerprint</label>
                  <span className="text-green">Registered</span>
                </div>
              </div>
              
              <div className="doc-action-buttons">
                <button className="btn-edit-glass">Edit details</button>
                <button className="btn-deregister-glass">Deregister</button>
              </div>
            </div>

            {/* RIGHT COLUMN: Activity Feed */}
            <div className="doc-activity-feed">
              <h4>Last 30 days activities</h4>
              <div className="activity-list">
                {activeDoctor.activities.map((act, idx) => (
                  <div className="activity-item" key={idx}>
                    <span className="activity-text">{act.action}</span>
                    <span className="activity-time">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // DEFAULT GRID VIEW
        <div className="staff-grid">
          {mockDoctors.map((doc) => (
            <div 
              key={doc.id} 
              className="doc-mini-card glass-panel"
              onClick={() => setExpandedDocId(doc.id)}
            >
              <div className={`doc-avatar-small ${doc.colorClass}`}>
                {doc.initials}
              </div>
              <div className="doc-details">
                <h4>{doc.fullName}</h4>
                <p>{doc.degree} · {doc.specialty}</p>
                <div className="status-indicator">
                  <span className="dot active"></span>
                  Fingerprint registered
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddStaffModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddStaff}
      />
    </div>
  );
};

export default DoctorsStaff;
