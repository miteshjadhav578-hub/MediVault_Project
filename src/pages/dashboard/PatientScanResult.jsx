import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Clock, FileText, Send, BotMessageSquare, AlertCircle, Edit3, BedDouble, X, PlusCircle, Activity, Check, ExternalLink, Save, Trash2, Plus } from 'lucide-react';
import InpatientAdmissionModal from '../../components/dashboard/InpatientAdmissionModal';
import BiometricModal from '../../components/dashboard/BiometricModal';
import { FinalConfirmModal } from '../../components/dashboard/InpatientManagementModals';
import './PatientScanResult.css';

const PatientScanResult = ({ onBack }) => {
  const [zoomedSection, setZoomedSection] = useState(null);
  const [fullViewItem, setFullViewItem] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages] = useState([
    { role: 'ai', content: 'Hello Doctor. Patient context loaded. What would you like to verify?' }
  ]);
  // EDIT MODE STATES
  const [isEditing, setIsEditing] = useState(false);
  const [isVerifyingForEdit, setIsVerifyingForEdit] = useState(false);
  const [isSaveConfirmOpen, setIsSaveConfirmOpen] = useState(false);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingEmergency, setIsEditingEmergency] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [newEntryText, setNewEntryText] = useState('');
  const [newEntryNote, setNewEntryNote] = useState('');
  const [newEntryFile, setNewEntryFile] = useState(null);
  const newEntryFileRef = useRef(null);

  const [patient, setPatient] = useState({
    fullName: "Arjun Verma",
    id: "MV-2026-9941",
    age: "58 yrs",
    gender: "Male",
    bloodGroup: "A+",
    phone: "98444 XXXXX",
    initials: "AV",
    colorClass: "avatar-light-blue",
    status: "Active Patient",
    reasonShort: "General Clinical Profile",
    emergencyContact: { relation: "Son", name: "Rahul Verma", phone: "98111 XXXXX" },
    emergencyContact2: { relation: "Brother", name: "Ashok Verma", phone: "98222 XXXXX" },
    treatments: ["Aspirin 75mg", "Atorvastatin 40mg"],
    history: ["Type 2 Diabetes", "Hypertension since 2018"],
    reports: ["Echo.pdf", "Stress_Test.pdf"],
    allergies: ["Peanuts", "Penicillin", "Lactose"]
  });

  const [localPatientData, setLocalPatientData] = useState(null);

  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);

  const handleConfirmAdmission = (admissionData) => {
    console.log('Admission confirmed:', admissionData);
    // Future: API call to admit patient
  };

  // Clinical Registry Helpers
  const truncateText = (text, limit) => {
    if (!text) return "";
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  const isFileEntry = (val) => {
    if (typeof val !== 'string') return false;
    const lower = val.toLowerCase();
    return lower.endsWith('.pdf') || lower.endsWith('.jpg') || lower.endsWith('.png') || lower.includes('report') || lower.includes('file:');
  };

  const openFullView = (section, index, value) => {
    setFullViewItem({ section, index, value });
  };

  const handleUpdateClick = () => {
    setIsVerifyingForEdit(true);
  };

  const handleVerificationSuccess = () => {
    setIsVerifyingForEdit(false);
    // Deep clone for safe editing
    setLocalPatientData({ 
      ...patient,
      reports: [...patient.reports],
      treatments: [...patient.treatments],
      history: [...patient.history],
      allergies: [...patient.allergies],
      emergencyContact: { ...patient.emergencyContact },
      emergencyContact2: { ...patient.emergencyContact2 }
    });
    setIsEditing(true);
  };

  const openEditSection = (section, e) => {
    if (e) e.stopPropagation();
    setNewEntryText('');
    setNewEntryFile(null);
    setNewEntryNote('');
    setEditingSection(section);
  };

  const handleMoveToHistory = (idx) => {
    const item = localPatientData.treatments[idx];
    setLocalPatientData(prev => {
      const treatments = [...prev.treatments];
      treatments.splice(idx, 1);
      return {
        ...prev,
        treatments,
        history: [item, ...prev.history]
      };
    });
  };

  const addEntryFromPanel = () => {
    if (!newEntryText && !newEntryFile) return;
    const entry = newEntryFile ? `File: ${newEntryFile.name}` : newEntryText;
    setLocalPatientData(prev => ({
      ...prev,
      [editingSection]: [...prev[editingSection], entry]
    }));
    setNewEntryText('');
    setNewEntryFile(null);
    setNewEntryNote('');
  };

  const handleFullViewUpdate = (value) => {
    if (!fullViewItem) return;
    setFullViewItem({ ...fullViewItem, value });
    handleFieldChange(fullViewItem.section, fullViewItem.index, value);
  };

  const handleFieldChange = (section, index, value) => {
    setLocalPatientData(prev => {
      const updated = { ...prev };
      const updatedSection = [...updated[section]];
      updatedSection[index] = value;
      return { ...updated, [section]: updatedSection };
    });
  };

  const handleDeleteItem = (section, index) => {
    setLocalPatientData(prev => {
      const updated = { ...prev };
      const updatedSection = [...updated[section]];
      updatedSection.splice(index, 1);
      return { ...updated, [section]: updatedSection };
    });
  };

  const handleFinalSave = () => {
    setPatient({ ...localPatientData });
    setIsSaveConfirmOpen(false);
    setIsEditing(false);
    setIsEditingPersonal(false);
    setIsEditingEmergency(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setIsEditingPersonal(false);
    setIsEditingEmergency(false);
    setLocalPatientData(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="patient-result-layout"
    >
      <div className="patient-expanded-card glass-panel">
        
        <div className="expanded-top-actions">
          <button className="btn-back-glass" onClick={onBack}>
            <ArrowLeft size={16} /> Back
          </button>
          <div className="verification-stack">
            <span className="status-pill pill-green">
              MediVault identity verified
            </span>
            <div className="last-scanned-sub">
              <Clock size={10} /> Last scanned: Today, 09:42 AM
            </div>
          </div>
        </div>

        <div className="expanded-header-row">
          <div className="patient-primary-badge">
            <div className={`doc-avatar-large ${patient.colorClass}`}>
              {patient.initials}
            </div>
            
            <div className="patient-meta-stack">
              <h3>{patient.fullName}</h3>
              <div className="patient-id-reason">
                <span className="mono-id">{patient.id}</span>
                <span className="divider">|</span>
                <span>{patient.status}</span>
              </div>
            </div>
          </div>

          <div className="header-actions-container-right">
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
                  <button className="btn-update-glass btn-mini" onClick={handleUpdateClick}>Update details</button>
                  <button 
                    className="btn-discharge-glass btn-mini"
                    onClick={() => setIsAdmissionModalOpen(true)}
                  >
                    Inpatient
                  </button>
                </>
              )}
            </div>
            <div className="security-subtext">
               <span className={isEditing ? "notice-dot-green" : "notice-dot-orange"}></span> {isEditing ? "You are now in edit mode" : "Dr. or Staff fingerprint required to update details"}
            </div>
          </div>
        </div>

        <div className="patient-data-grid">
          
          {/* COLUMN 1: Registry */}
          <div className="patient-grid-col col-main">
            <div className="section-header-row">
              <h4 className="section-subtitle">PERSONAL DETAILS</h4>
              {isEditing && (
                <button 
                  className={`btn-tiny-edit ${isEditingPersonal ? 'active' : ''}`}
                  onClick={() => setIsEditingPersonal(!isEditingPersonal)}
                >
                  <Edit3 size={12} />
                </button>
              )}
            </div>
            <div className="kv-stack">
              <div className="kv-row">
                <label>Age</label>
                <span>{isEditing ? localPatientData.age : patient.age}</span>
              </div>
              <div className="kv-row">
                <label>Gender</label>
                <span>{isEditing ? localPatientData.gender : patient.gender}</span>
              </div>
              <div className="kv-row">
                <label>Blood group</label>
                <span>{isEditing ? localPatientData.bloodGroup : patient.bloodGroup}</span>
              </div>
              <div className="kv-row">
                <label>Phone</label>
                {isEditingPersonal ? (
                  <input 
                    className="inline-edit-input-small" 
                    value={localPatientData.phone} 
                    onChange={(e) => setLocalPatientData({...localPatientData, phone: e.target.value})} 
                  />
                ) : (
                  <span>{isEditing ? localPatientData.phone : patient.phone}</span>
                )}
              </div>
            </div>

            <div className="section-header-row mt-4">
              <h4 className="section-subtitle">EMERGENCY CONTACTS</h4>
              {isEditing && (
                <button 
                  className={`btn-tiny-edit ${isEditingEmergency ? 'active' : ''}`}
                  onClick={() => setIsEditingEmergency(!isEditingEmergency)}
                >
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
                    onChange={(e) => setLocalPatientData({
                      ...localPatientData, 
                      emergencyContact: { ...localPatientData.emergencyContact, relation: e.target.value }
                    })} 
                  />
                ) : (
                  <label>{isEditing ? localPatientData.emergencyContact.relation : patient.emergencyContact.relation}</label>
                )}
                
                {isEditingEmergency ? (
                  <input 
                    className="inline-edit-input-small" 
                    value={localPatientData.emergencyContact.name} 
                    onChange={(e) => setLocalPatientData({
                      ...localPatientData, 
                      emergencyContact: { ...localPatientData.emergencyContact, name: e.target.value }
                    })} 
                  />
                ) : (
                  <span>{isEditing ? localPatientData.emergencyContact.name : patient.emergencyContact.name}</span>
                )}
              </div>
              <div className="kv-row">
                <label>Phone</label>
                {isEditingEmergency ? (
                  <input 
                    className="inline-edit-input-small" 
                    value={localPatientData.emergencyContact.phone} 
                    onChange={(e) => setLocalPatientData({
                      ...localPatientData, 
                      emergencyContact: { ...localPatientData.emergencyContact, phone: e.target.value }
                    })} 
                  />
                ) : (
                  <span>{isEditing ? localPatientData.emergencyContact.phone : patient.emergencyContact.phone}</span>
                )}
              </div>
            </div>
            
            <div className="contact-stack mt-contact mb-4">
              <div className="kv-row">
                {isEditingEmergency ? (
                  <input 
                    className="inline-edit-input-label" 
                    value={localPatientData.emergencyContact2.relation} 
                    onChange={(e) => setLocalPatientData({
                      ...localPatientData, 
                      emergencyContact2: { ...localPatientData.emergencyContact2, relation: e.target.value }
                    })} 
                  />
                ) : (
                  <label>{isEditing ? localPatientData.emergencyContact2.relation : patient.emergencyContact2.relation}</label>
                )}
                
                {isEditingEmergency ? (
                  <input 
                    className="inline-edit-input-small" 
                    value={localPatientData.emergencyContact2.name} 
                    onChange={(e) => setLocalPatientData({
                      ...localPatientData, 
                      emergencyContact2: { ...localPatientData.emergencyContact2, name: e.target.value }
                    })} 
                  />
                ) : (
                  <span>{isEditing ? localPatientData.emergencyContact2.name : patient.emergencyContact2.name}</span>
                )}
              </div>
              <div className="kv-row">
                <label>Phone</label>
                {isEditingEmergency ? (
                  <input 
                    className="inline-edit-input-small" 
                    value={localPatientData.emergencyContact2.phone} 
                    onChange={(e) => setLocalPatientData({
                      ...localPatientData, 
                      emergencyContact2: { ...localPatientData.emergencyContact2, phone: e.target.value }
                    })} 
                  />
                ) : (
                  <span>{isEditing ? localPatientData.emergencyContact2.phone : patient.emergencyContact2.phone}</span>
                )}
              </div>
            </div>

            <div className="info-block glass-panel-inner mt-4 interactive-panel reports-sidebar-block" onClick={() => isEditing ? openEditSection('reports') : setZoomedSection('reports')}>
              <div className="section-header-row">
                <h4 className="section-subtitle">MEDICAL REPORTS</h4>
                {isEditing && <button className="btn-add-inline" onClick={(e) => openEditSection('reports', e)}><Plus size={14} /></button>}
              </div>
              <div className="clinical-stack">
                {(isEditing ? localPatientData.reports : patient.reports).map((rep, idx) => (
                  <div className="item-with-actions" key={idx}>
                    <div className="item-content">
                      <div className="item-icon-stack">
                        <FileText size={12} className="icon-grey" />
                        {!isEditing && isFileEntry(rep) && <div className="mini-file-dot" />}
                      </div>
                      {isEditing ? (
                        <div className="item-edit-pair">
                          <input className="inline-edit-input" value={rep} onChange={(e) => handleFieldChange('reports', idx, e.target.value)} />
                          <button className="btn-inline-del" onClick={() => handleDeleteItem('reports', idx)}><Trash2 size={12} /></button>
                        </div>
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
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Columns (Flexible Grids) */}
          <div className="patient-grid-flexible">
            <div className="clinical-column">
              {/* Treatments */}
              <div className="info-block glass-panel-inner interactive-panel" onClick={() => isEditing ? openEditSection('treatments') : setZoomedSection('treatments')}>
                <div className="section-header-row">
                  <h4 className="section-subtitle">CURRENT TREATMENTS</h4>
                  {isEditing && <button className="btn-add-inline" onClick={(e) => openEditSection('treatments', e)}><Plus size={14} /></button>}
                </div>
                <div className="clinical-stack">
                  {(isEditing ? localPatientData.treatments : patient.treatments).map((trm, idx) => (
                    <div className="item-with-actions" key={idx}>
                      <div className="item-content">
                        <div className="item-icon-stack">
                          <BedDouble size={12} className="icon-blue" />
                          {!isEditing && isFileEntry(trm) && <div className="mini-file-dot" />}
                        </div>
                        {isEditing ? (
                          <div className="item-edit-pair">
                            <input className="inline-edit-input" value={trm} onChange={(e) => handleFieldChange('treatments', idx, e.target.value)} />
                            <button className="btn-move-history" onClick={(e) => { e.stopPropagation(); handleMoveToHistory(idx); }} title="Move to History">
                              <ArrowLeft size={11} /><span>History</span>
                            </button>
                            <button className="btn-inline-del" onClick={() => handleDeleteItem('treatments', idx)}><Trash2 size={12} /></button>
                          </div>
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
                    </div>
                  ))}
                </div>
              </div>

              {/* History */}
              <div className="info-block glass-panel-inner mt-6 interactive-panel history-block" onClick={() => isEditing ? openEditSection('history') : setZoomedSection('history')}>
                <div className="section-header-row">
                  <h4 className="section-subtitle">TREATMENT HISTORY</h4>
                  {isEditing && <button className="btn-add-inline" onClick={(e) => openEditSection('history', e)}><Plus size={14} /></button>}
                </div>
                <div className="clinical-stack">
                  {(isEditing ? localPatientData.history : patient.history).map((his, idx) => (
                    <div className="item-with-actions" key={idx}>
                      <div className="item-content">
                        <div className="item-icon-stack">
                          <Clock size={12} className="icon-green" />
                          {!isEditing && isFileEntry(his) && <div className="mini-file-dot" />}
                        </div>
                        {isEditing ? (
                          <div className="item-edit-pair">
                            <input className="inline-edit-input" value={his} onChange={(e) => handleFieldChange('history', idx, e.target.value)} />
                            <button className="btn-inline-del" onClick={() => handleDeleteItem('history', idx)}><Trash2 size={12} /></button>
                          </div>
                        ) : (
                          <span className="history-text">{truncateText(his, 21)}</span>
                        )}
                      </div>
                      {!isEditing && (
                        <div className="item-quick-actions">
                          {isFileEntry(his) && <button className="btn-mini-action" title="Open File" onClick={(e) => e.stopPropagation()}><ExternalLink size={10} /></button>}
                          <button className="btn-mini-action" title="Read Full Text" onClick={(e) => { e.stopPropagation(); openFullView('history', idx, his); }}><PlusCircle size={10} /></button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="clinical-column">
              {/* Allergies */}
              <div className="info-block glass-panel-inner interactive-panel" onClick={() => isEditing ? openEditSection('allergies') : setZoomedSection('allergies')}>
                <div className="section-header-row">
                  <h4 className="section-subtitle">ALLERGIES</h4>
                  {isEditing && (
                    <button className="btn-add-inline" onClick={(e) => openEditSection('allergies', e)}>
                      <Plus size={14} />
                    </button>
                  )}
                </div>
                <div className="allergy-tags">
                  {(isEditing ? localPatientData.allergies : patient.allergies).map((alg, idx) => (
                    <div className="allergy-tag-wrap" key={idx}>
                      <span className="tag-red">{alg}</span>
                      {isEditing && (
                        <button className="btn-tag-del" onClick={(e) => { e.stopPropagation(); handleDeleteItem('allergies', idx); }}>
                          <X size={10} />
                        </button>
                      )}
                    </div>
                  ))}
                  {!(isEditing ? localPatientData.allergies : patient.allergies).length && (
                    <span className="tag-neutral">None logged</span>
                  )}
                </div>
              </div>

              {/* AI Chatbot */}
              <div className="ai-chat-window glass-panel-inner mt-6 interactive-panel" onClick={() => setZoomedSection('ai')}>
                <div className="chat-header">
                   <div className="chat-title">
                     <BotMessageSquare size={18} className="ai-icon-small" />
                     <h5>MediVault AI</h5>
                   </div>
                </div>

                <div className="chat-messages-area">
                   {chatMessages.map((msg, i) => (
                      <div key={i} className={`chat-bubble ${msg.role}`}>
                        {msg.content}
                      </div>
                   ))}
                </div>

                <div className="chat-input-area">
                   <input 
                     type="text"
                     value={chatInput} 
                     onChange={e => setChatInput(e.target.value)} 
                     placeholder="Ask a clinical question..." 
                   />
                   <button className="btn-chat-send">
                     <Send size={16} />
                   </button>
                </div>
                
                <div className="chat-disclaimer">
                   <AlertCircle size={13} className="disclaimer-icon" />
                   <span>AI can make mistakes. Please verify clinical information.</span>
                </div>
              </div>
            </div>
          </div>

          {zoomedSection && (
            <div className="zoom-overlay" onClick={() => setZoomedSection(null)}>
              <div className={`zoom-content glass-panel-inner shadowed-premium animate-zoom ${zoomedSection === 'ai' ? 'ai-zoom-active' : ''}`} onClick={e => e.stopPropagation()}>
                
                <div className="zoom-scroll-area">
                  {zoomedSection === 'reports' && (
                    <div className="zoom-section-content">
                      <h4 className="zoom-subtitle">MEDICAL REPORTS</h4>
                      <div className="clinical-stack mt-4">
                        {(patient.reports || []).map((rep, idx) => (
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
                                  <FileText size={12} />
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
                        {(patient.treatments || []).map((trm, idx) => (
                          <div className={`zoom-item elevation-1 ${isFileEntry(trm) ? 'item-is-file' : ''}`} key={idx}>
                            <div className="item-main">
                              <div className="item-icon-wrap">
                                <BedDouble size={20} className="icon-blue" />
                                {isFileEntry(trm) && <div className="file-attachment-badge mini"><FileText size={8} /></div>}
                              </div>
                              <span className="text-clear">{truncateText(trm, 21)}</span>
                            </div>
                            <div className="zoom-item-actions">
                              {isFileEntry(trm) && (
                                <button className="btn-open-attachment small" title="Open File Attachment">
                                  <FileText size={12} />
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

                  {zoomedSection === 'allergies' && (
                    <div className="zoom-section-content">
                      <h4 className="zoom-subtitle">ALLERGIES</h4>
                      <div className="clinical-stack mt-4">
                        {(patient.allergies || []).map((alg, idx) => (
                          <div className={`zoom-item elevation-1`} key={idx}>
                            <div className="item-main">
                              <div className="item-icon-wrap">
                                <AlertCircle size={20} className="icon-red" />
                              </div>
                              <span className="text-clear">{truncateText(alg, 21)}</span>
                            </div>
                            <div className="zoom-item-actions">
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

                  {zoomedSection === 'history' && (
                    <div className="zoom-section-content">
                      <h4 className="zoom-subtitle">TREATMENT HISTORY</h4>
                      <div className="clinical-stack mt-4">
                        {(patient.history || []).map((his, idx) => (
                          <div className={`zoom-item elevation-1 ${isFileEntry(his) ? 'item-is-file' : ''}`} key={idx}>
                            <div className="item-main">
                              <div className="item-icon-wrap">
                                <Clock size={20} className="icon-green" />
                                {isFileEntry(his) && <div className="file-attachment-badge mini"><FileText size={8} /></div>}
                              </div>
                              <span className="text-clear">{truncateText(his, 21)}</span>
                            </div>
                            <div className="zoom-item-actions">
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

                  {zoomedSection === 'ai' && (
                    <div className="ai-chat-window-zoomed" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <div className="chat-header">
                         <div className="chat-title">
                           <BotMessageSquare size={24} className="ai-icon-small" />
                           <h5>MediVault AI</h5>
                         </div>
                      </div>

                      <div className="chat-messages-area zoom-chat-area">
                         {chatMessages.map((msg, i) => (
                            <div key={i} className={`chat-bubble ${msg.role}`}>
                               {msg.content}
                            </div>
                         ))}
                      </div>

                      <div className="chat-input-area zoom-no-top-border">
                         <input 
                           type="text"
                           placeholder="Ask a clinical question..." 
                         />
                         <button className="btn-chat-send">
                           <Send size={20} />
                         </button>
                      </div>
                      
                      <div className="chat-disclaimer">
                         <AlertCircle size={14} className="disclaimer-icon" />
                         <span>AI can make mistakes. Please verify clinical information.</span>
                      </div>
                    </div>
                  )}
                </div>

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

          {/* FULL TEXT VIEW OVERLAY */}
          {fullViewItem && (
            <div className="zoom-overlay full-view-overlay" onClick={() => setFullViewItem(null)}>
              <div className="full-text-container glass-panel-inner shadowed-premium animate-zoom" onClick={e => e.stopPropagation()}>
                <div className="full-text-header">
                  <h4>LONG TEXT VIEWER</h4>
                  <span className="section-context">{fullViewItem.section.toUpperCase()} — ITEM #{fullViewItem.index + 1}</span>
                </div>
                <textarea 
                  className={`full-text-editor ${!isEditing ? 'read-only' : ''}`} 
                  value={fullViewItem.value} 
                  onChange={(e) => isEditing && handleFullViewUpdate(e.target.value)}
                  readOnly={!isEditing}
                />
                <div className="zoom-footer">
                   <button className="btn-done-zoom shadowed-premium" onClick={() => setFullViewItem(null)}>
                     <Check size={18} strokeWidth={2.5} />
                     <span>{isEditing ? 'Finish Editing' : 'Finish Reading'}</span>
                   </button>
                </div>
              </div>
            </div>
          )}

          <InpatientAdmissionModal 
            isOpen={isAdmissionModalOpen}
            onClose={() => setIsAdmissionModalOpen(false)}
            patientName={patient.fullName}
            onConfirm={handleConfirmAdmission}
          />

          <BiometricModal 
            isOpen={isVerifyingForEdit}
            onClose={() => setIsVerifyingForEdit(false)}
            onScanSuccess={handleVerificationSuccess}
            purpose="Clinical Data Access"
          />

          <FinalConfirmModal 
            isOpen={isSaveConfirmOpen}
            onClose={() => setIsSaveConfirmOpen(false)}
            onConfirm={handleFinalSave}
            title="Sustain Medical Updates"
            message={`Are you sure you want to commit these clinical changes to ${patient.fullName}'s verified record?`}
          />

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
                            <button 
                              className="btn-expand-item" 
                              title="Expand to full text"
                              onClick={() => setFullViewItem({ section: editingSection, index: idx, value: item })}
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

                <div className="zoom-footer">
                  <button className="btn-done-zoom shadowed-premium" onClick={() => setEditingSection(null)}>
                    <Check size={18} strokeWidth={2.5} />
                    <span>Done</span>
                  </button>
                </div>
              </div>
            </div>
          )}
    </motion.div>
  );
};

export default PatientScanResult;
;
