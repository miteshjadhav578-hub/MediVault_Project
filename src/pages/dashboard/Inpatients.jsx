import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, ArrowLeft, BotMessageSquare, FileText, ChevronDown, Activity, AlertCircle, Send, X, Fingerprint, Save, PlusCircle, Trash2, Edit3, Calendar, LogOut, Check, ExternalLink, Clock } from 'lucide-react';
import { ExtendDaysModal, DischargeModal, FinalConfirmModal } from '../../components/dashboard/InpatientManagementModals';
import BiometricModal from '../../components/dashboard/BiometricModal';
import './Inpatients.css';
import '../../components/dashboard/InpatientManagementModals.css';

// Exact mock data translated from wireframe examples
const mockInpatients = [
  {
    id: 'IP-2026-001',
    initials: 'RK',
    colorClass: 'avatar-blue',
    fullName: 'Rajesh Kumar',
    reasonShort: 'Post-surgery recovery',
    status: 'Active',
    // Detailed Profile
    age: '42 yrs',
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '98201 XXXXX',
    emergencyContact: { relation: 'Wife', name: 'Priya Kumar', phone: '98765 XXXXX' },
    emergencyContact2: { relation: 'Brother', name: 'Dev Kumar', phone: '98000 XXXXX' },
    doctor: 'Dr. Vikram Desai',
    daysLeft: '5 days',
    allergies: ['Penicillin', 'Aspirin'],
    reports: ['Blood report.pdf', 'X-Ray scan.jpg', 'ECG report.pdf'],
    treatments: ['Paracetamol 500mg', 'Omeprazole 20mg'],
    history: ['Appendectomy 2018', 'Hypertension since 2020']
  },
  {
    id: 'IP-2026-002',
    initials: 'SP',
    colorClass: 'avatar-gold',
    fullName: 'Sunita Patel',
    reasonShort: 'Cardiac monitoring',
    status: 'Discharging today',
    age: '58 yrs',
    gender: 'Female',
    bloodGroup: 'A+',
    phone: '98444 XXXXX',
    emergencyContact: { relation: 'Son', name: 'Rahul Patel', phone: '98111 XXXXX' },
    emergencyContact2: { relation: 'Husband', name: 'Ashok Patel', phone: '98222 XXXXX' },
    doctor: 'Dr. Anjali Sharma',
    daysLeft: '0 days',
    allergies: [],
    reports: ['Echo.pdf', 'Stress_Test.pdf'],
    treatments: ['Aspirin 75mg', 'Atorvastatin 40mg'],
    history: ['Type 2 Diabetes']
  },
  {
    id: 'IP-2026-003',
    initials: 'AN',
    colorClass: 'avatar-red',
    fullName: 'Arjun Nair',
    reasonShort: 'ICU — Heart Failure',
    status: 'Critical / ICU',
    age: '65 yrs',
    gender: 'Male',
    bloodGroup: 'O+',
    phone: 'N/A',
    emergencyContact: { relation: 'Daughter', name: 'Sita Nair', phone: '99222 XXXXX' },
    emergencyContact2: { relation: 'Wife', name: 'Lakshmi Nair', phone: '99111 XXXXX' },
    doctor: 'Dr. Anjali Sharma',
    daysLeft: 'TBD',
    allergies: ['Sulfa drugs'],
    reports: ['ICU_Vitals_Log.pdf', 'Blood_Gas.pdf', 'Chest_XRay.jpg'],
    treatments: ['Dobutamine IV', 'Furosemide IV'],
    history: ['Prior MI 2021', 'CABG 2022']
  },
  {
    id: 'IP-2026-004',
    initials: 'MI',
    colorClass: 'avatar-green',
    fullName: 'Meera Iyer',
    reasonShort: 'Fracture treatment',
    status: 'Active',
    age: '28 yrs',
    gender: 'Female',
    bloodGroup: 'AB+',
    phone: '98777 XXXXX',
    emergencyContact: { relation: 'Husband', name: 'Karthik Sub', phone: '99888 XXXXX' },
    emergencyContact2: { relation: 'Mother', name: 'Uma Subramaniam', phone: '99777 XXXXX' },
    doctor: 'Dr. Rohan Mehta',
    daysLeft: '2 days',
    allergies: [],
    reports: ['Femur_XR.jpg', 'MRI_Right_Leg.pdf'],
    treatments: ['Ibuprofen 400mg', 'Cefazolin 1g'],
    history: ['No significant past history']
  },
  {
    id: 'IP-2026-005',
    initials: 'PS',
    colorClass: 'avatar-red',
    fullName: 'Pooja Singh',
    reasonShort: 'ICU — Respiratory Distress',
    status: 'Critical / ICU',
    age: '55 yrs',
    gender: 'Female',
    bloodGroup: 'O-',
    phone: 'N/A',
    emergencyContact: { relation: 'Son', name: 'Kabir Singh', phone: '91234 XXXXX' },
    emergencyContact2: { relation: 'Husband', name: 'Arun Singh', phone: '91555 XXXXX' },
    doctor: 'Dr. Vikram Deshmukh',
    daysLeft: 'TBD',
    allergies: ['Latex'],
    reports: ['CT_Thorax.pdf', 'Sputum_Culture.pdf'],
    treatments: ['Amoxicillin', 'Salbutamol Nebulization'],
    history: ['Asthma since childhood']
  },
  {
    id: 'IP-2026-007',
    initials: 'KM',
    colorClass: 'avatar-blue',
    fullName: 'Karan Malhotra',
    reasonShort: 'Pneumonia',
    status: 'Active',
    age: '45 yrs',
    gender: 'Male',
    bloodGroup: 'B-',
    phone: '98999 XXXXX',
    emergencyContact: { relation: 'Wife', name: 'Aisha Malhotra', phone: '98000 XXXXX' },
    emergencyContact2: { relation: 'Sister', name: 'Riya Malhotra', phone: '98555 XXXXX' },
    doctor: 'Dr. Neha Joshi',
    daysLeft: '3 days',
    allergies: [],
    reports: ['Chest_XRay.jpg', 'Blood_Culture.pdf'],
    treatments: ['Azithromycin', 'Paracetamol'],
    history: ['Hypertension']
  },
];

const FILTER_TABS = ['All active', 'Discharging today', 'Critical / ICU', 'Discharged'];

const Inpatients = () => {
  const [activeFilter, setActiveFilter] = useState('All active');
  const [expandedId, setExpandedId] = useState(null);

  // Chatbot states
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const [zoomedSection, setZoomedSection] = useState(null);
  const zoomedChatEndRef = useRef(null);

  // Management States
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);
  const [isDischargeModalOpen, setIsDischargeModalOpen] = useState(false);
  const [isSaveConfirmOpen, setIsSaveConfirmOpen] = useState(false);
  const [isVerifyingForEdit, setIsVerifyingForEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [localPatientData, setLocalPatientData] = useState(null);

  // Section Zoom & Edit Actions
  const [addingToSection, setAddingToSection] = useState(null);
  const [newEntryText, setNewEntryText] = useState('');
  const [editingSection, setEditingSection] = useState(null); // split-panel edit mode
  const [newEntryFile, setNewEntryFile] = useState(null);
  const [newEntryNote, setNewEntryNote] = useState('');
  const newEntryFileRef = useRef(null);

  // Granular Edit States
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingEmergency, setIsEditingEmergency] = useState(false);

  // Full Text View State
  const [fullViewItem, setFullViewItem] = useState(null); // { section, index, value }

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping]);

  useEffect(() => {
    if (zoomedChatEndRef.current) {
      zoomedChatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, zoomedSection]);

  // AI Welcome Message on Patient Load
  useEffect(() => {
    if (expandedId) {
      const p = mockInpatients.find(pt => pt.id === expandedId);
      if (p) {
        setChatMessages([
          { role: 'ai', content: `Patient records for ${p.fullName} have been securely loaded. What would you like to verify, Doctor?` }
        ]);
      }
    } else {
      setChatMessages([]);
    }
  }, [expandedId]);

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const activePatient = mockInpatients.find(p => p.id === expandedId);
    
    setChatMessages([...chatMessages, { role: 'user', content: chatInput }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const allergies = activePatient?.allergies?.length > 0 ? activePatient.allergies.join(', ') : 'none logged';
      setChatMessages(prev => [...prev, { 
        role: 'ai', 
        content: `Based on my analysis, please note the patient's allergies: ${allergies}. The requested treatment appears structurally compatible, but continuous vitals monitoring is advised.`
      }]);
    }, 1500);
  };

  const handleInpatientClick = (id) => {
    const p = mockInpatients.find(item => item.id === id);
    setExpandedId(id);
    setLocalPatientData({ ...p });
    setIsEditing(false);
    setIsEditingPersonal(false);
    setIsEditingEmergency(false);
  };

  const handleUpdateClick = () => {
    setIsVerifyingForEdit(true);
  };

  const handleVerificationSuccess = () => {
    setIsVerifyingForEdit(false);
    setLocalPatientData({ ...activePatient });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setIsEditingPersonal(false);
    setIsEditingEmergency(false);
    setEditingSection(null);
  };

  const handleFieldChange = (section, index, value) => {
    setLocalPatientData(prev => {
      const updated = { ...prev };
      updated[section][index] = value;
      return updated;
    });
  };

  const handlePersonalFieldChange = (field, value) => {
    setLocalPatientData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmergencyFieldChange = (contactKey, field, value) => {
    // Basic validation: No empty values for Emergency Contacts as requested
    if (value.trim() === '') return; 
    
    setLocalPatientData(prev => {
      const updated = { ...prev };
      updated[contactKey] = { ...updated[contactKey], [field]: value };
      return updated;
    });
  };

  const handleAddItem = (section) => {
    setAddingToSection(section);
    setNewEntryText('');
  };

  const commitNewItem = () => {
    if (!newEntryText.trim()) return;
    setLocalPatientData(prev => {
      const updated = { ...prev };
      updated[addingToSection] = [...updated[addingToSection], newEntryText];
      return updated;
    });
    setAddingToSection(null);
    setNewEntryText('');
  };

  const handleDeleteItem = (section, index) => {
    setLocalPatientData(prev => {
      const updated = { ...prev };
      updated[section] = updated[section].filter((_, i) => i !== index);
      return updated;
    });
  };

  const handleMoveToHistory = (index) => {
    setLocalPatientData(prev => {
      const updatedTreatments = prev.treatments.filter((_, i) => i !== index);
      const movedItem = prev.treatments[index];
      const updatedHistory = [...prev.history, movedItem];
      return { ...prev, treatments: updatedTreatments, history: updatedHistory };
    });
  };

  const handleFinalSave = () => {
    setIsSaveConfirmOpen(false);
    setIsEditing(false);
    setEditingSection(null);
  };

  const openEditSection = (section, e) => {
    if (e) e.stopPropagation();
    setNewEntryText('');
    setNewEntryFile(null);
    setNewEntryNote('');
    setEditingSection(section);
  };

  const addEntryFromPanel = () => {
    const base = newEntryFile ? newEntryFile.name : newEntryText.trim();
    if (!base) return;
    const value = newEntryNote.trim() ? `${base} — ${newEntryNote.trim()}` : base;
    setLocalPatientData(prev => ({
      ...prev,
      [editingSection]: [...prev[editingSection], value]
    }));
    setNewEntryText('');
    setNewEntryFile(null);
    setNewEntryNote('');
  };

  const openFullView = (section, index, value) => {
    setFullViewItem({ section, index, value });
  };

  const handleFullViewUpdate = (value) => {
    const { section, index } = fullViewItem;
    handleFieldChange(section, index, value);
    setFullViewItem(prev => ({ ...prev, value }));
  };

  const isFileEntry = (val) => {
    if (!val || typeof val !== 'string') return false;
    const cleanStr = val.split(' — ')[0];
    return /\.(pdf|jpg|jpeg|png|docx|csv)$/i.test(cleanStr.trim());
  };

  const truncateText = (str, len) => {
    if (!str || str.length <= len) return str;
    return str.slice(0, len) + "...";
  };

  const filteredPatients = mockInpatients.filter((p) => {
    if (activeFilter === 'All active') return p.status !== 'Discharged';
    return p.status === activeFilter;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active': return 'pill-green';
      case 'Discharging today': return 'pill-gold';
      case 'Critical / ICU': return 'pill-red';
      default: return 'pill-neutral';
    }
  };

  const activePatient = mockInpatients.find(p => p.id === expandedId);

  return (
    <div className="inpatients-layout">
      {/* HEADER SECTION */}
      <div className="staff-header">
        <div className="staff-title-group">
          <h2>Inpatients</h2>
          <span>8 active · 1 discharging today · 2 critical</span>
        </div>
      </div>

      {/* SEARCH AND FILTER ARRAY */}
      <div className="inpatient-controls">
        <div className="staff-search-bar glass-panel search-wide">
          <Search size={20} className="search-icon-glass" />
          <input 
            type="text" 
            placeholder="Search by name or temporary patient ID..." 
            className="search-input-glass"
          />
        </div>
        
        <div className="filter-pill-row">
          {FILTER_TABS.map(tab => (
            <button 
              key={tab} 
              className={`filter-pill ${activeFilter === tab ? 'active-pill' : ''}`}
              onClick={() => { setActiveFilter(tab); setExpandedId(null); }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* DYNAMIC VIEW ROUTER */}
      {expandedId && activePatient && (
        <div className="patient-detail-overlay animate-in" onClick={() => setExpandedId(null)}>
          <div className="patient-expanded-card glass-panel" onClick={e => e.stopPropagation()}>
            
            <button className="btn-back-glass" onClick={() => setExpandedId(null)}>
              <ArrowLeft size={18} />
              <span>Back to registry</span>
            </button>

            <div className="expanded-header-row">
              <div className="patient-primary-badge">
                <div className={`doc-avatar ${activePatient.colorClass}`}>{activePatient.initials}</div>
                <div className="patient-meta-stack">
                  <h3>{activePatient.fullName}</h3>
                  <p>{activePatient.reasonShort}</p>
                  <span className="mono-id">{activePatient.id}</span>
                </div>
              </div>

              <div className="header-actions-container-right">
                <div className="top-action-row">
                  <span className={`status-pill ${getStatusClass(activePatient.status)} expanded-status-pill`}>{activePatient.status}</span>
                </div>
                <div className="header-mini-actions">
                  {isEditing ? (
                    <>
                      <button className="btn-save-edit" onClick={() => setIsSaveConfirmOpen(true)}>
                        <Save size={16} />
                        <span>Save Details</span>
                      </button>
                      <button className="btn-discharge-glass btn-mini" onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="btn-update-glass btn-mini" onClick={handleUpdateClick}>Update Details</button>
                      <button className="btn-discharge-glass btn-mini" onClick={() => setIsDischargeModalOpen(true)}>Discharge</button>
                      <button className="btn-discharge-glass btn-mini" onClick={() => setIsExtendModalOpen(true)}>Extend days</button>
                    </>
                  )}
                </div>
                <div className="security-notice">
                  <span className={isEditing ? "notice-dot-green" : "notice-dot-orange"} />
                  <span className="notice-text">
                    {isEditing ? "You are now in edit mode" : "Dr. or Staff fingerprint required to update details"}
                  </span>
                </div>
              </div>
            </div>

            <div className="patient-data-grid">
              {/* Left Column */}
              <div className="col-main">
                <div className="kv-stack">
                  <div className="section-header-row">
                    <div className="section-subtitle">PERSONAL DETAILS</div>
                    {isEditing && (
                      <button className={`btn-tiny-edit ${isEditingPersonal ? 'active' : ''}`} onClick={() => setIsEditingPersonal(!isEditingPersonal)}>
                        <Edit3 size={12} />
                      </button>
                    )}
                  </div>
                  <div className="kv-row">
                    <label>Age</label>
                    <span>{activePatient.age}</span>
                  </div>
                  <div className="kv-row">
                    <label>Gender</label>
                    <span>{activePatient.gender}</span>
                  </div>
                  <div className="kv-row">
                    <label>Blood Group</label>
                    <span className="text-blue">{activePatient.bloodGroup}</span>
                  </div>
                  <div className="kv-row">
                    <label>Phone</label>
                    {isEditingPersonal ? (
                      <input 
                        className="inline-edit-input-small" 
                        value={localPatientData.phone} 
                        onChange={(e) => handlePersonalFieldChange('phone', e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <span>{isEditing ? localPatientData.phone : activePatient.phone}</span>
                    )}
                  </div>
                </div>

                <div className="kv-stack mt-4">
                  <div className="section-header-row">
                    <div className="section-subtitle">EMERGENCY CONTACTS</div>
                    {isEditing && (
                      <button className={`btn-tiny-edit ${isEditingEmergency ? 'active' : ''}`} onClick={() => setIsEditingEmergency(!isEditingEmergency)}>
                        <Edit3 size={12} />
                      </button>
                    )}
                  </div>
                  
                  <div className="contact-stack">
                    <div className="kv-row">
                      {isEditingEmergency ? (
                        <input 
                          className="inline-edit-input-label" 
                          value={localPatientData.emergencyContact.relation} 
                          onChange={(e) => handleEmergencyFieldChange('emergencyContact', 'relation', e.target.value)} 
                        />
                      ) : (
                        <label>{isEditing ? localPatientData.emergencyContact.relation : activePatient.emergencyContact.relation}</label>
                      )}
                      
                      {isEditingEmergency ? (
                        <input 
                          className="inline-edit-input-small" 
                          value={localPatientData.emergencyContact.name} 
                          onChange={(e) => handleEmergencyFieldChange('emergencyContact', 'name', e.target.value)} 
                        />
                      ) : (
                        <span>{isEditing ? localPatientData.emergencyContact.name : activePatient.emergencyContact.name}</span>
                      )}
                    </div>
                    <div className="kv-row">
                      <label>Contact</label>
                      {isEditingEmergency ? (
                        <input 
                          className="inline-edit-input-small" 
                          value={localPatientData.emergencyContact.phone} 
                          onChange={(e) => handleEmergencyFieldChange('emergencyContact', 'phone', e.target.value)} 
                        />
                      ) : (
                        <span>{isEditing ? localPatientData.emergencyContact.phone : activePatient.emergencyContact.phone}</span>
                      )}
                    </div>
                  </div>

                  <div className="contact-stack mt-contact">
                    <div className="kv-row">
                      {isEditingEmergency ? (
                        <input 
                          className="inline-edit-input-label" 
                          value={localPatientData.emergencyContact2.relation} 
                          onChange={(e) => handleEmergencyFieldChange('emergencyContact2', 'relation', e.target.value)} 
                        />
                      ) : (
                        <label>{isEditing ? localPatientData.emergencyContact2.relation : activePatient.emergencyContact2.relation}</label>
                      )}
                      
                      {isEditingEmergency ? (
                        <input 
                          className="inline-edit-input-small" 
                          value={localPatientData.emergencyContact2.name} 
                          onChange={(e) => handleEmergencyFieldChange('emergencyContact2', 'name', e.target.value)} 
                        />
                      ) : (
                        <span>{isEditing ? localPatientData.emergencyContact2.name : activePatient.emergencyContact2.name}</span>
                      )}
                    </div>
                    <div className="kv-row">
                      <label>Contact</label>
                      {isEditingEmergency ? (
                        <input 
                          className="inline-edit-input-small" 
                          value={localPatientData.emergencyContact2.phone} 
                          onChange={(e) => handleEmergencyFieldChange('emergencyContact2', 'phone', e.target.value)} 
                        />
                      ) : (
                        <span>{isEditing ? localPatientData.emergencyContact2.phone : activePatient.emergencyContact2.phone}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Medical Reports */}
                <div className={`info-block glass-panel-inner mt-4 interactive-panel reports-sidebar-block ${isEditing ? 'editing' : ''}`} onClick={() => isEditing ? openEditSection('reports') : setZoomedSection('reports')}>
                  <div className="section-header-row">
                    <h4 className="section-subtitle">MEDICAL REPORTS</h4>
                    {isEditing && <button className="btn-add-inline" onClick={(e) => openEditSection('reports', e)}><Plus size={16} /></button>}
                  </div>
                  <div className="clinical-stack">
                    {(isEditing ? localPatientData.reports : activePatient.reports).map((rep, idx) => (
                      <div className="item-with-actions" key={idx}>
                        <div className="item-content">
                          <div className="item-icon-stack">
                            <FileText size={12} className="icon-grey" />
                            {!isEditing && isFileEntry(rep) && <div className="mini-file-dot" />}
                          </div>
                          {isEditing ? (
                             <input className="inline-edit-input" value={rep} onChange={(e) => handleFieldChange('reports', idx, e.target.value)} />
                          ) : (
                             <span>{truncateText(rep, 10)}</span>
                          )}
                        </div>
                        {!isEditing && (
                          <div className="item-quick-actions">
                            {isFileEntry(rep) && <button className="btn-mini-action" title="Open File" onClick={(e) => e.stopPropagation()}><ExternalLink size={10} /></button>}
                            <button className="btn-mini-action" title="Read Full Text" onClick={(e) => { e.stopPropagation(); openFullView('reports', idx, rep); }}><PlusCircle size={10} /></button>
                          </div>
                        )}
                        {isEditing && <button className="btn-inline-del" onClick={(e) => { e.stopPropagation(); handleDeleteItem('reports', idx); }}><Trash2 size={14} /></button>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Columns (Flexible Grids) */}
              <div className="patient-grid-flexible">
                <div className="clinical-column">
                  <div className={`info-block glass-panel-inner interactive-panel ${isEditing ? 'editing' : ''}`} onClick={() => isEditing ? openEditSection('treatments') : setZoomedSection('treatments')}>
                    <div className="section-header-row">
                      <h4 className="section-subtitle">CURRENT TREATMENTS</h4>
                      {isEditing && <button className="btn-add-inline" onClick={(e) => openEditSection('treatments', e)}><Plus size={16} /></button>}
                    </div>
                    <div className="clinical-stack">
                      {(isEditing ? localPatientData.treatments : activePatient.treatments).map((trm, idx) => (
                        <div className="item-with-actions" key={idx}>
                          <div className="item-content">
                            <div className="item-icon-stack">
                              <Activity size={12} className="icon-blue" />
                              {!isEditing && isFileEntry(trm) && <div className="mini-file-dot blue" />}
                            </div>
                            {isEditing ? (
                               <input className="inline-edit-input" value={trm} onChange={(e) => handleFieldChange('treatments', idx, e.target.value)} />
                            ) : (
                               <span>{truncateText(trm, 21)}</span>
                            )}
                          </div>
                          {!isEditing && (
                            <div className="item-quick-actions">
                              {isFileEntry(trm) && <button className="btn-mini-action" title="Open File" onClick={(e) => e.stopPropagation()}><ExternalLink size={10} /></button>}
                              <button className="btn-mini-action" title="Read Full Text" onClick={(e) => { e.stopPropagation(); openFullView('treatments', idx, trm); }}><PlusCircle size={10} /></button>
                            </div>
                          )}
                          {isEditing && (
                            <div className="item-edit-actions">
                              <button
                                className="btn-move-history"
                                title="Move to Treatment History"
                                onClick={(e) => { e.stopPropagation(); handleMoveToHistory(idx); }}
                              >
                                <ArrowLeft size={11} />
                                <span>History</span>
                              </button>
                              <button className="btn-inline-del" onClick={(e) => { e.stopPropagation(); handleDeleteItem('treatments', idx); }}><Trash2 size={14} /></button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`info-block glass-panel-inner mt-6 interactive-panel history-block ${isEditing ? 'editing' : ''}`} onClick={() => isEditing ? openEditSection('history') : setZoomedSection('history')}>
                    <div className="section-header-row">
                      <h4 className="section-subtitle">TREATMENT HISTORY</h4>
                      {isEditing && <button className="btn-add-inline" onClick={(e) => openEditSection('history', e)}><Plus size={16} /></button>}
                    </div>
                    <div className="clinical-stack">
                      {(isEditing ? localPatientData.history : activePatient.history).map((his, idx) => (
                        <div className="item-with-actions" key={idx}>
                          <div className="item-content">
                            <div className="item-icon-stack">
                              <Clock size={12} className="icon-green" />
                              {!isEditing && isFileEntry(his) && <div className="mini-file-dot green" />}
                            </div>
                            {isEditing ? (
                               <input className="inline-edit-input" value={his} onChange={(e) => handleFieldChange('history', idx, e.target.value)} />
                            ) : (
                               <span>{truncateText(his, 21)}</span>
                            )}
                          </div>
                          {!isEditing && (
                            <div className="item-quick-actions">
                              {isFileEntry(his) && <button className="btn-mini-action" title="Open File" onClick={(e) => e.stopPropagation()}><ExternalLink size={10} /></button>}
                              <button className="btn-mini-action" title="Read Full Text" onClick={(e) => { e.stopPropagation(); openFullView('history', idx, his); }}><PlusCircle size={10} /></button>
                            </div>
                          )}
                          {isEditing && <button className="btn-inline-del" onClick={(e) => { e.stopPropagation(); handleDeleteItem('history', idx); }}><Trash2 size={14} /></button>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="clinical-column">
                  {/* Allergies */}
                  <div className={`info-block glass-panel-inner interactive-panel ${isEditing ? 'editing' : ''}`} onClick={() => isEditing ? openEditSection('allergies') : setZoomedSection('allergies')}>
                    <div className="section-header-row">
                      <h4 className="section-subtitle">ALLERGIES</h4>
                      {isEditing && <button className="btn-add-inline" onClick={(e) => openEditSection('allergies', e)}><Plus size={16} /></button>}
                    </div>
                    <div className="allergy-tags">
                      {(isEditing ? localPatientData.allergies : activePatient.allergies).map((alg, idx) => (
                        <div key={idx} className="tag-wrapper">
                          <span className="tag-red">{alg}</span>
                          {isEditing && <button className="btn-tag-del" onClick={() => handleDeleteItem('allergies', idx)}><X size={10} /></button>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* MediVault AI Assistant */}
                  <div className="ai-chat-anchor glass-panel-inner mt-6 interactive-panel" onClick={() => setZoomedSection('ai')}>
                    <div className="chat-header">
                       <div className="chat-title">
                         <BotMessageSquare size={18} className="ai-icon-small" />
                         <h5>MediVault AI</h5>
                       </div>
                    </div>
                    <div className="chat-messages-area">
                       {chatMessages.map((msg, i) => <div key={i} className={`chat-bubble ${msg.role}`}>{msg.content}</div>)}
                       {isTyping && <div className="chat-bubble ai typing"><span className="dot"></span><span className="dot"></span><span className="dot"></span></div>}
                       <div ref={chatEndRef} />
                    </div>
                    <div className="chat-input-area" onClick={e => e.stopPropagation()}>
                       <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendChat()} placeholder="Ask a clinical question..." />
                       <button className="btn-chat-send" onClick={(e) => { e.stopPropagation(); handleSendChat(); }}><Send size={16} /></button>
                    </div>
                    <div className="chat-disclaimer">
                       <AlertCircle size={13} className="disclaimer-icon" />
                       <span>AI can make mistakes. Please verify clinical information.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* EDIT MODE — SPLIT PANEL OVERLAY */}
            {editingSection && isEditing && (
              <div className="zoom-overlay" onClick={() => setEditingSection(null)}>
                <div className="edit-split-panel glass-panel-inner shadowed-premium animate-zoom" onClick={e => e.stopPropagation()}>

                  {/* Header */}
                  <div className="edit-panel-header">
                    <h3 className="edit-panel-title">
                      {editingSection === 'treatments' && 'CURRENT TREATMENTS'}
                      {editingSection === 'history' && 'TREATMENT HISTORY'}
                      {editingSection === 'reports' && 'MEDICAL REPORTS'}
                      {editingSection === 'allergies' && 'ALLERGIES'}
                    </h3>
                    <span className="edit-panel-badge">Edit Mode</span>
                  </div>

                  <div className="edit-panel-body">
                    {/* LEFT — Existing Data */}
                    <div className="edit-panel-left">
                      <p className="edit-panel-section-label">Existing Records</p>
                      <div className="edit-panel-list">
                        {(localPatientData[editingSection] || []).length === 0 && (
                          <p className="edit-panel-empty">No records yet.</p>
                        )}
                        {(localPatientData[editingSection] || []).map((item, idx) => (
                          <div className={`edit-panel-item ${isFileEntry(item) ? 'item-is-file' : ''}`} key={idx}>
                            <div className="edit-panel-item-main">
                              {isFileEntry(item) && <div className="file-attachment-badge"><FileText size={10} /><span>File Attached</span></div>}
                              <input
                                className="edit-panel-inline-input"
                                value={item}
                                onChange={(e) => handleFieldChange(editingSection, idx, e.target.value)}
                              />
                            </div>
                            <div className="edit-panel-item-actions">
                              {isFileEntry(item) && (
                                <button className="btn-open-attachment" title="Open File Attachment">
                                  <ExternalLink size={12} />
                                  <span>Open</span>
                                </button>
                              )}
                              <button 
                                className="btn-expand-item" 
                                title="Expand to full text"
                                onClick={() => openFullView(editingSection, idx, item)}
                              >
                                <PlusCircle size={14} />
                              </button>
                              {editingSection === 'treatments' && (
                                <button className="btn-move-history" onClick={() => handleMoveToHistory(idx)} title="Move to History">
                                  <ArrowLeft size={11} /><span>History</span>
                                </button>
                              )}
                              <button className="btn-inline-del" onClick={() => handleDeleteItem(editingSection, idx)}><Trash2 size={14} /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* DIVIDER */}
                    <div className="edit-panel-divider" />

                    {/* RIGHT — Add New Entry */}
                    <div className="edit-panel-right">
                      <p className="edit-panel-section-label">Add New Entry</p>
                      <textarea
                        className="edit-panel-textarea"
                        placeholder={editingSection === 'reports' ? 'Enter report name or notes...' : `Type new ${editingSection === 'allergies' ? 'allergen' : editingSection === 'treatments' ? 'treatment' : 'history entry'}...`}
                        value={newEntryText}
                        onChange={e => setNewEntryText(e.target.value)}
                        rows={5}
                      />

                      {/* Optional Note */}
                      <div className="edit-panel-note-wrap">
                        <label className="edit-panel-note-label">Note / Limitations / Precautions <span className="optional-tag">(optional)</span></label>
                        <textarea
                          className="edit-panel-note-textarea"
                          placeholder="e.g. Take after meals, avoid in pregnancy, max 3 days..."
                          value={newEntryNote}
                          onChange={e => setNewEntryNote(e.target.value)}
                          rows={3}
                        />
                      </div>

                      {/* File Upload (especially for reports) */}
                      <div className="edit-panel-file-row">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.png,.docx"
                          ref={newEntryFileRef}
                          style={{ display: 'none' }}
                          onChange={(e) => { setNewEntryFile(e.target.files[0]); setNewEntryText(''); }}
                        />
                        <button className="btn-upload-file" onClick={() => newEntryFileRef.current.click()}>
                          <FileText size={15} />
                          <span>{newEntryFile ? newEntryFile.name : 'Attach PDF / File'}</span>
                        </button>
                        {newEntryFile && (
                          <button className="btn-clear-file" onClick={() => { setNewEntryFile(null); newEntryFileRef.current.value = ''; }}>
                            <X size={13} />
                          </button>
                        )}
                      </div>

                      <button className="btn-add-entry" onClick={addEntryFromPanel}>
                        <Plus size={16} />
                        <span>Add Entry</span>
                      </button>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="zoom-footer">
                    <button className="btn-done-zoom shadowed-premium" onClick={() => setEditingSection(null)}>
                      <Check size={18} strokeWidth={2.5} />
                      <span>Done</span>
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* FULL TEXT VIEW OVERLAY */}
            {fullViewItem && (
              <div className="zoom-overlay full-view-overlay" onClick={() => setFullViewItem(null)}>
                <div className="full-text-container glass-panel-inner shadowed-premium animate-zoom" onClick={e => e.stopPropagation()}>
                  <div className="full-text-header">
                    <h4>LONG TEXT VIEWER</h4>
                    <span className="section-context">{fullViewItem.section.toUpperCase()} — ITEM #{fullViewItem.index + 1}</span>
                  </div>
                  <textarea 
                    className={`full-text-editor Liquid-glass-input ${!isEditing ? 'read-only' : ''}`} 
                    value={fullViewItem.value} 
                    onChange={(e) => isEditing && handleFullViewUpdate(e.target.value)}
                    readOnly={!isEditing}
                    autoFocus={isEditing}
                  />
                  <div className="zoom-footer">
                    <button className="btn-done-zoom" onClick={() => setFullViewItem(null)}>
                      <Check size={18} />
                      <span>Finish Reading</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* NEW CENTERED ZOOM OVERLAY */}
            {zoomedSection && (
              <div className="zoom-overlay" onClick={() => setZoomedSection(null)}>
                <div className={`zoom-content glass-panel-inner shadowed-premium animate-zoom ${zoomedSection === 'ai' ? 'ai-zoom-active' : ''}`} onClick={e => e.stopPropagation()}>
                  
                  <div className="zoom-scroll-area">
                    {zoomedSection === 'history' && (
                      <div className="zoom-section-content">
                        <h4 className="zoom-subtitle">TREATMENT HISTORY</h4>
                        <div className="clinical-stack mt-4">
                          {(isEditing ? localPatientData.history : activePatient.history).map((his, idx) => (
                            <div className={`zoom-item elevation-1 ${isFileEntry(his) ? 'item-is-file' : ''}`} key={idx}>
                              <div className="item-main">
                                <div className="item-icon-wrap">
                                  <Clock size={20} className="icon-green" />
                                  {isFileEntry(his) && <div className="file-attachment-badge mini"><FileText size={8} /></div>}
                                </div>
                                <span className="text-clear">{truncateText(his, 21)}</span>
                              </div>
                              <div className="zoom-item-actions">
                                {isFileEntry(his) && (
                                  <button className="btn-open-attachment small" title="Open File Attachment">
                                    <ExternalLink size={12} />
                                  </button>
                                )}
                                <button 
                                  className="btn-expand-item small" 
                                  title="Expand to full text"
                                  onClick={() => openFullView('history', idx, his)}
                                >
                                  <PlusCircle size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {zoomedSection === 'reports' && (
                      <div className="zoom-section-content">
                        <h4 className="zoom-subtitle">MEDICAL REPORTS</h4>
                        <div className="clinical-stack mt-4">
                          {(isEditing ? localPatientData.reports : activePatient.reports).map((rep, idx) => (
                            <div className={`zoom-item elevation-1 ${isFileEntry(rep) ? 'item-is-file' : ''}`} key={idx}>
                              <div className="item-main">
                                <div className="item-icon-wrap">
                                  <FileText size={20} className="icon-grey" />
                                  {isFileEntry(rep) && <div className="file-attachment-badge mini"><FileText size={8} /></div>}
                                </div>
                                <span className="text-clear">{truncateText(rep, 10)}</span>
                              </div>
                              <div className="zoom-item-actions">
                                {isFileEntry(rep) && (
                                  <button className="btn-open-attachment small" title="Open File Attachment">
                                    <ExternalLink size={12} />
                                  </button>
                                )}
                                <button 
                                  className="btn-expand-item small" 
                                  title="Expand to full text"
                                  onClick={() => openFullView('reports', idx, rep)}
                                >
                                  <PlusCircle size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {zoomedSection === 'treatments' && (
                      <div className="zoom-section-content">
                        <h4 className="zoom-subtitle">CURRENT TREATMENTS</h4>
                        <div className="clinical-stack mt-4">
                          {(isEditing ? localPatientData.treatments : activePatient.treatments).map((trm, idx) => (
                            <div className={`zoom-item elevation-1 ${isFileEntry(trm) ? 'item-is-file' : ''}`} key={idx}>
                              <div className="item-main">
                                <div className="item-icon-wrap">
                                  <Activity size={20} className="icon-blue" />
                                  {isFileEntry(trm) && <div className="file-attachment-badge mini"><FileText size={8} /></div>}
                                </div>
                                <span className="text-clear">{truncateText(trm, 21)}</span>
                              </div>
                              <div className="zoom-item-actions">
                                {isFileEntry(trm) && (
                                  <button className="btn-open-attachment small" title="Open File Attachment">
                                    <ExternalLink size={12} />
                                  </button>
                                )}
                                <button 
                                  className="btn-expand-item small" 
                                  title="Expand to full text"
                                  onClick={() => openFullView('treatments', idx, trm)}
                                >
                                  <PlusCircle size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {zoomedSection === 'ai' && (
                      <div className="zoom-section-content ai-zoomed-view">
                        <div className="ai-chat-anchor chat-zoomed-container">
                          <div className="chat-header">
                             <div className="chat-title">
                               <BotMessageSquare size={18} className="ai-icon-small" />
                               <h5>MediVault AI</h5>
                             </div>
                          </div>
                          <div className="chat-messages-area">
                             {chatMessages.map((msg, i) => <div key={i} className={`chat-bubble ${msg.role}`}>{msg.content}</div>)}
                             {isTyping && <div className="chat-bubble ai typing"><span className="dot"></span><span className="dot"></span><span className="dot"></span></div>}
                             <div ref={zoomedChatEndRef} />
                          </div>
                          <div className="chat-input-area" onClick={e => e.stopPropagation()}>
                             <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendChat()} placeholder="Ask a clinical question..." />
                             <button className="btn-chat-send" onClick={(e) => { e.stopPropagation(); handleSendChat(); }}><Send size={16} /></button>
                          </div>
                          <div className="chat-disclaimer">
                             <AlertCircle size={13} className="disclaimer-icon" />
                             <span>AI can make mistakes. Please verify clinical information.</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {zoomedSection === 'allergies' && (
                      <div className="zoom-section-content">
                        <h4 className="zoom-subtitle">ALLERGIES</h4>
                        <div className="clinical-stack mt-4">
                          {(isEditing ? localPatientData.allergies : activePatient.allergies).map((alg, idx) => (
                            <div className={`zoom-item elevation-1 ${isFileEntry(alg) ? 'item-is-file' : ''}`} key={idx}>
                              <div className="item-main">
                                <div className="item-icon-wrap">
                                  <AlertCircle size={20} className="icon-red" />
                                  {isFileEntry(alg) && <div className="file-attachment-badge mini"><FileText size={8} /></div>}
                                </div>
                                <span className="text-clear">{alg}</span>
                              </div>
                              <div className="zoom-item-actions">
                                {isFileEntry(alg) && (
                                  <button className="btn-open-attachment small" title="Open File Attachment">
                                    <ExternalLink size={12} />
                                  </button>
                                )}
                                <button 
                                  className="btn-expand-item small" 
                                  title="Expand to full text"
                                  onClick={() => openFullView('allergies', idx, alg)}
                                >
                                  <PlusCircle size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* LIQUID GLASS DONE BUTTON */}
                  <div className="zoom-footer">
                     <button className="btn-done-zoom shadowed-premium" onClick={() => setZoomedSection(null)}>
                        <Check size={18} strokeWidth={2.5} />
                        <span>Done</span>
                     </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* GRID VIEW */}
      <div className={`inpatients-grid ${expandedId ? 'blurred-bg' : ''}`}>
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="patient-mini-card glass-panel interactive" onClick={() => handleInpatientClick(patient.id)}>
            <span className={`status-pill ${getStatusClass(patient.status)}`}>{patient.status}</span>
            <div className={`doc-avatar ${patient.colorClass}`}>{patient.initials}</div>
            <div className="patient-brief">
              <div className="card-header-flex">
                <h4>{patient.fullName}</h4>
              </div>
              <div className="patient-id-mini">
                 <span className="mono-id">{patient.id}</span>
              </div>
              <div className="patient-reason-mini truncate">
                 <span>{patient.reasonShort}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {isVerifyingForEdit && <BiometricModal isOpen={true} onClose={() => setIsVerifyingForEdit(false)} onScanSuccess={handleVerificationSuccess} title="Staff Verification" subtitle="Please verify to enable clinical edit mode" />}
      {isSaveConfirmOpen && <FinalConfirmModal isOpen={true} onClose={() => setIsSaveConfirmOpen(false)} onConfirm={handleFinalSave} staffName="Dr. Vikram Desai" />}
      {isExtendModalOpen && <ExtendDaysModal isOpen={true} onClose={() => setIsExtendModalOpen(false)} onConfirm={() => setIsExtendModalOpen(false)} />}
      {isDischargeModalOpen && <DischargeModal isOpen={true} onClose={() => setIsDischargeModalOpen(false)} onConfirm={() => setIsDischargeModalOpen(false)} />}
    </div>
  );
};

export default Inpatients;
