'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800" aria-label="Toggle theme">
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-950/40 border border-transparent hover:border-pink-200 dark:hover:border-pink-900 transition-all cursor-pointer group"
      aria-label="Toggle theme"
      title={theme === 'dark' ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối'}
    >
      {theme === 'dark' ? (
        <SunIcon className="w-5 h-5 text-amber-500 group-hover:rotate-90 transition-transform duration-500" />
      ) : (
        <MoonIcon className="w-5 h-5 text-pink-600 dark:text-pink-400 group-hover:-rotate-12 transition-transform duration-500" />
      )}
    </button>
  );
}
