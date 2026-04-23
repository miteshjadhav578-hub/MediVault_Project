import React from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  return (
    <div className="ambient-background-container">
      {/* Returning the soft, massive ambient light reflections without any shapes */}
      <div className="ambient-orb orb-1"></div>
      <div className="ambient-orb orb-2"></div>
      <div className="ambient-orb orb-3"></div>
    </div>
  );
};

export default AnimatedBackground;
