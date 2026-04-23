import React, { useState, useEffect, useRef } from 'react';
import './DatePicker.css';

const DatePicker = ({ value, onChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 21));
  const ref = useRef();

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCalendar = () => setIsOpen(!isOpen);

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const selectDate = (day) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateStr = selectedDate.toISOString().split('T')[0];
    onChange(dateStr);
    setIsOpen(false);
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const calendar = [];

    // Empty slots for previous month
    for (let i = 0; i < startDay; i++) {
      calendar.push(<div key={`empty-prev-${i}`} className="date-empty" />);
    }

    // Days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isSelected = value === dateStr;
      calendar.push(
        <button
          key={`day-${day}`}
          className={`date-day ${isSelected ? 'selected' : ''}`}
          onClick={() => selectDate(day)}
        >
          {day}
        </button>
      );
    }

    // Fill remaining slots with next month days if needed (optional for compact)
    const remainingSlots = 42 - calendar.length; // 6 rows * 7
    for (let i = 1; i <= remainingSlots; i++) {
      calendar.push(<div key={`empty-next-${i}`} className="date-empty" />);
    }

    return calendar;
  };

  const selectedLabel = value ? new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Select date';

  return (
    <div className={`date-picker ${className}`} ref={ref}>
      <button className={`date-trigger ${isOpen ? 'active' : ''}`} onClick={toggleCalendar}>
        {selectedLabel}
        <span className="arrow">▼</span>
      </button>
      {isOpen && (
        <div className="date-picker-popup glass-panel">
          <div className="calendar-header">
            <button onClick={prevMonth} className="nav-btn">‹</button>
            <h4>
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h4>
            <button onClick={nextMonth} className="nav-btn">›</button>
          </div>
          <div className="calendar-days-header">
            {days.map((day) => (
              <div key={day} className="day-header">{day}</div>
            ))}
          </div>
          <div className="calendar-grid">{renderDays()}</div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;

