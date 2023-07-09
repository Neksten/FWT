import React from 'react';

export interface ThemeContextType {
  isDark: boolean | null;
  toggleIsDark: (value: boolean | null) => void;
}
const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export default ThemeContext;
