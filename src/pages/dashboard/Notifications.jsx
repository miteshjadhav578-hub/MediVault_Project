import React, { useState } from 'react';
import { XCircle, AlertCircle, CheckCircle2, ShieldAlert, Home, Info, MapPin, Monitor, Globe, BellRing } from 'lucide-react';
import './Notifications.css';

const mockNotifications = [
  {
    id: 'n1',
    category: 'Account Security',
    title: 'Login blocked — different location',
    severity: 'red',
    icon: 'XCircle',
    location: 'Mumbai, Maharashtra',
    device: 'Chrome 124',
    ip: '49.36.71.14',
    alert: "Access denied by MediVault. Change your admin password if this wasn't you.",
    time: '2 minutes ago',
    unread: true
  },
  {
    id: 'n2',
    category: 'Account Security',
    title: 'New device logged into your account',
    severity: 'yellow',
    icon: 'AlertCircle',
    location: 'Pune, Maharashtra',
    device: 'Edge 122 — New Device',
    ip: '103.21.60.11',
    alert: "If this wasn't you, change your admin password immediately.",
    time: '1 hour ago',
    unread: true
  },
  {
    id: 'n3',
    category: 'Account Security',
    title: 'Login from a recognized device',
    severity: 'green',
    icon: 'CheckCircle2',
    location: 'Pune, Maharashtra',
    device: 'Chrome 124',
    ip: '103.21.58.92',
    alert: null,
    time: '3 hours ago',
    unread: true
  },
  {
    id: 'n4',
    category: 'Account Security',
    title: 'Multiple failed login attempts detected',
    severity: 'red',
    icon: 'ShieldAlert',
    location: 'Pune, Maharashtra',
    device: 'Firefox 115',
    ip: '103.21.58.77',
    attempts: '5 attempts',
    alert: 'Account temporarily locked for 10 minutes. Change your admin password.',
    time: '5 hours ago',
    unread: true
  },
  {
    id: 'n5',
    category: 'Inpatient Alerts',
    title: 'Patient discharging today',
    severity: 'yellow',
    icon: 'Home',
    patient: 'Sunita Patil',
    patientId: 'IP-2026-002',
    alert: 'Extend or discharge before midnight.',
    time: '6 hours ago',
    unread: true
  },
  {
    id: 'n6',
    category: 'Inpatient Alerts',
    title: 'Patient discharging in 2 days',
    severity: 'yellow',
    icon: 'Home',
    patient: 'Karan Mehta',
    patientId: 'IP-2026-007',
    alert: null,
    time: 'Yesterday, 9:00 AM',
    unread: false
  },
  {
    id: 'n7',
    category: 'System',
    title: 'MediVault maintenance completed',
    severity: 'blue',
    icon: 'Info',
    alert: null,
    time: '2 days ago',
    unread: false
  },
  {
    id: 'n8',
    category: 'System',
    title: 'New MediVault update — v2.4',
    severity: 'blue',
    icon: 'Info',
    alert: 'Improved fingerprint recognition and UI updates are now live.',
    time: '3 days ago',
    unread: false
  }
];

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Account Security', 'Inpatient Alerts', 'System'];
  
  const filteredNotifs = activeFilter === 'All' ? mockNotifications : mockNotifications.filter(n => n.category === activeFilter);
  
  // Group chronologically or by category
  const grouped = filteredNotifs.reduce((acc, notif) => {
    if (!acc[notif.category]) acc[notif.category] = [];
    acc[notif.category].push(notif);
    return acc;
  }, {});

  const renderIcon = (iconName) => {
    switch(iconName) {
      case 'XCircle': return <XCircle size={18} />;
      case 'AlertCircle': return <AlertCircle size={18} />;
      case 'CheckCircle2': return <CheckCircle2 size={18} />;
      case 'ShieldAlert': return <ShieldAlert size={18} />;
      case 'Home': return <Home size={18} />;
      case 'Info': return <Info size={18} />;
      default: return <BellRing size={18} />;
    }
  };

  return (
    <div className="notifications-layout">
      
      <div className="staff-header">
        <div className="staff-title-group">
          <h2>Notifications</h2>
          <span>4 unread · automatically cleared after 30 days</span>
        </div>
      </div>

      <div className="activity-filter-row">
        {filters.map(f => (
          <button 
            key={f} 
            className={`activity-filter-btn ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="notifications-feed">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="notif-category-block">
            
            <div className="category-header">
              <h4 className="notif-category-title">{category.toUpperCase()}</h4>
              {items.filter(i => i.unread).length > 0 && (
                <span className="cat-badge">{items.filter(i => i.unread).length} unread</span>
              )}
            </div>
            
            <div className="notif-list">
              {items.map(notif => (
                <div key={notif.id} className={`notif-card glass-panel-inner line-${notif.severity}`}>
                  
                  <div className={`notif-icon-badge bg-${notif.severity}`}>
                    {renderIcon(notif.icon)}
                  </div>

                  <div className="notif-content">
                    <div className="notif-card-header">
                      <h3>{notif.title}</h3>
                      {notif.unread && <span className={`unread-dot glow-${notif.severity}`}></span>}
                    </div>

                    {/* Metadata tags array */}
                    {(notif.location || notif.device || notif.ip || notif.attempts || notif.patient) && (
                      <div className="notif-meta">
                        {notif.location && (
                          <div className="meta-pill glass-pill">
                            <MapPin size={12} className={notif.severity === 'red' ? 'text-red' : notif.severity === 'green' ? 'text-green' : ''} />
                            {notif.location}
                          </div>
                        )}
                        {notif.device && (
                          <div className="meta-pill glass-pill border-dim">
                            <Monitor size={12} />
                            {notif.device}
                          </div>
                        )}
                        {notif.ip && (
                          <div className="meta-pill glass-pill border-dim">
                            <Globe size={12} />
                            IP: {notif.ip}
                          </div>
                        )}
                        {notif.attempts && (
                          <div className="meta-pill red-pill border-red">
                            {notif.attempts}
                          </div>
                        )}
                        {notif.patient && (
                          <div className="meta-pill glass-pill">
                            Patient: {notif.patient}
                          </div>
                        )}
                        {notif.patientId && (
                          <div className="meta-pill gold-pill border-gold">
                            {notif.patientId}
                          </div>
                        )}
                      </div>
                    )}

                    {notif.alert && (
                      <div className={`notif-alert-text text-${notif.severity}`}>
                        {notif.severity === 'red' && <XCircle size={14} />}
                        {notif.severity === 'yellow' && <AlertCircle size={14} />}
                        {notif.severity === 'blue' && <Info size={14} />}
                        <span>{notif.alert}</span>
                      </div>
                    )}
                    
                    <div className="notif-time">{notif.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Notifications;

