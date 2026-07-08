import { useEffect, useState } from 'react';

export default function useTheme() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = window.localStorage.getItem('orchid-theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    window.localStorage.setItem('orchid-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return {
    darkMode,
    toggleTheme: () => setDarkMode((prev) => !prev),
  };
}

