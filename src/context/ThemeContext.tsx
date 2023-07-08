import React from 'react';

export interface ThemeContextType {
  isDark: boolean;
  toggleIsDark: (value: boolean) => void;
}
const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export default ThemeContext;
