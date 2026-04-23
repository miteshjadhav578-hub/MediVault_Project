import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import './ActivityLog.css';

const FILTERS = ['All', 'Update', 'Enroll', 'Scan', 'Admit', 'Discharge'];

const activityData = [
  {
    day: 'Today',
    items: [
      { id: 'a1', type: 'Update', title: 'Updated allergy data', meta: 'Dr. Anjali Sharma · Ananya Desai #AP-3301', time: '11:42 AM', dot: 'blue', date: '2026-04-21' },
      { id: 'a2', type: 'Scan', title: 'Patient scanned', meta: 'Rajesh Kumar #AP-2841', time: '10:15 AM', dot: 'neutral', date: '2026-04-21' },
      { id: 'a3', type: 'Enroll', title: 'Enrolled new patient', meta: 'Dr. Priya Rao · Baby Rao #AP-3410', time: '09:50 AM', dot: 'green', date: '2026-04-21' },
      { id: 'a4', type: 'Update', title: 'Updated treatment history', meta: 'Dr. Sameer Khan · Arjun Nair #AP-3003', time: '09:10 AM', dot: 'blue', date: '2026-04-21' },
      { id: 'a5', type: 'Admit', title: 'Admitted as inpatient', meta: 'Dr. Rohan Mehta · Meera Iyer #AP-2904', time: '08:30 AM', dot: 'gold', date: '2026-04-21' },
    ],
  },
  {
    day: 'Yesterday',
    items: [
      { id: 'a6', type: 'Discharge', title: 'Discharged inpatient', meta: 'Dr. Vikram Desai · Devika Rao #AP-2806', time: '06:45 PM', dot: 'red', date: '2026-04-20' },
      { id: 'a7', type: 'Update', title: 'Updated medications', meta: 'Dr. Anjali Sharma · Sunita Patil #AP-1923', time: '04:20 PM', dot: 'blue', date: '2026-04-20' },
      { id: 'a8', type: 'Scan', title: 'Patient scanned', meta: 'Pooja Singh #AP-2905', time: '02:10 PM', dot: 'neutral', date: '2026-04-20' },
      { id: 'a9', type: 'Update', title: 'Updated medical reports', meta: 'Dr. Priya Rao · Karan Mehta #AP-2907', time: '11:00 AM', dot: 'blue', date: '2026-04-20' },
      { id: 'a10', type: 'Enroll', title: 'Enrolled new patient', meta: 'Dr. Rohan Mehta · Suresh Patil #AP-3409', time: '09:30 AM', dot: 'green', date: '2026-04-20' },
    ],
  },
  {
    day: '19 April 2026',
    items: [
      { id: 'a11', type: 'Admit', title: 'Admitted as inpatient', meta: 'Dr. Anjali Sharma · Pooja Singh #AP-2905', time: '05:15 PM', dot: 'gold', date: '2026-04-19' },
      { id: 'a12', type: 'Scan', title: 'Patient scanned', meta: 'Rajesh Kumar #AP-2841', time: '03:00 PM', dot: 'neutral', date: '2026-04-19' },
      { id: 'a13', type: 'Update', title: 'Updated current treatments', meta: 'Dr. Sameer Khan · Ananya Desai #AP-3301', time: '01:20 PM', dot: 'blue', date: '2026-04-19' },
    ],
  },
];

const ActivityLog = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [query, setQuery] = useState('');

  const normalizedQuery = query.trim().toLowerCase();

  const filteredGroups = useMemo(() => {
    return activityData
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          const matchesFilter = activeFilter === 'All' || item.type === activeFilter;
          const haystack = `${item.title} ${item.meta}`.toLowerCase();
          const matchesSearch = !normalizedQuery || haystack.includes(normalizedQuery);
          return matchesFilter && matchesSearch;
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [activeFilter, normalizedQuery]);

  const totalEntries = filteredGroups.reduce((count, group) => count + group.items.length, 0);

  return (
    <div className="activity-layout">
      <div className="staff-header">
        <div className="staff-title-group">
          <h2>Activity Log</h2>
          <span>Showing {totalEntries} of 13 entries</span>
        </div>
      </div>

      <div className="activity-search glass-panel">
        <Search size={20} className="activity-search-icon" />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by patient name, ID or doctor..."
          className="activity-search-input"
        />
      </div>

      <div className="activity-filter-row">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            className={`activity-filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="activity-timeline">
        {filteredGroups.map((group) => (
          <section key={group.day} className="timeline-day-block">
            <h4 className="timeline-day-title">{group.day.toUpperCase()}</h4>
            <div className="timeline-day-list">
              {group.items.map((entry) => (
                <article key={entry.id} className="timeline-entry-row">
                  <div className={`timeline-dot ${entry.dot}`} />
                  <div className="timeline-entry-card">
                    <div className="entry-main">
                      <h3>{entry.title}</h3>
                      <p>{entry.meta}</p>
                    </div>
                    <span className="entry-time">{entry.time}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        {totalEntries === 0 && (
          <div className="activity-empty-state glass-panel">
            No activity found for the selected filter/search.
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLog;

