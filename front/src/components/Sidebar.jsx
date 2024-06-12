import React, { useState, useEffect } from 'react';
import '../css/Sidebar.css';

const Sidebar = ({ onOptionChange }) => {

  return (
    <div className="sidebar" style={{ height: '100% !important' }}>
      <ul>
        
          <li >
            Menú Cursos
              <ul>
                <li onClick={() => onOptionChange('Dashboard')}>
                  Dashboard
                </li>
                <li onClick={() => onOptionChange('Cursos')}>
                  Cursos
                </li>
                
              </ul>
          </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;
