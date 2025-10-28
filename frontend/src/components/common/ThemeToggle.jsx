import React from 'react';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      className={`theme-toggle ${theme === 'dark' ? 'active' : ''}`}
      onClick={toggle}
      aria-label="Alternar tema"
      title="Alternar tema claro/oscuro"
    >
      <span className="toggle-track" aria-hidden>
        <span className="toggle-thumb" />
      </span>
      <span className="toggle-icons" aria-hidden>
        <span className="icon-sun">☀️</span>
        <span className="icon-moon">🌙</span>
      </span>
    </button>
  );
}
