import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; 

export default function Header() {
  
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      <h2>Mini Task Manager</h2>
      
      <button onClick={toggleTheme} style={{ cursor: 'pointer', padding: '5px 10px' }}>
        {darkMode ? '☀ Light' : '🌙 Dark'}
      </button>
    </header>
  );
}
