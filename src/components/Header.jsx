import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // Import kho chứa Theme

export default function Header() {
  // Rút biến darkMode và hàm toggleTheme từ ThemeContext ra dùng
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      <h2>Mini Task Manager</h2>
      {/* Khi click nút thì gọi hàm toggleTheme để đổi Dark/Light */}
      <button onClick={toggleTheme} style={{ cursor: 'pointer', padding: '5px 10px' }}>
        {darkMode ? '☀ Light' : '🌙 Dark'}
      </button>
    </header>
  );
}