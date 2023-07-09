import React, { useState } from 'react';

import ThemeContext, { ThemeContextType } from '../context/ThemeContext';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const initialThemeValue = localStorage.getItem('isDark');
  const parsedInitialThemeValue = initialThemeValue !== null ? JSON.parse(initialThemeValue) : null;
  const [isDark, setIsDark] = useState<boolean | null>(parsedInitialThemeValue);

  // Значение контекста
  const themeContextValue: ThemeContextType = {
    isDark,
    toggleIsDark: setIsDark,
  };

  return <ThemeContext.Provider value={themeContextValue}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
