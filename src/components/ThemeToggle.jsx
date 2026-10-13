import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    localStorage.getItem('portfolioTheme') || 'dark'
  );

  useEffect(() => {
    localStorage.setItem('portfolioTheme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'cupcake' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle btn-sm"
      title="Toggle Light/Dark Mode"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-warning" />
      ) : (
        <Moon className="w-4 h-4 text-primary" />
      )}
    </button>
  );
}