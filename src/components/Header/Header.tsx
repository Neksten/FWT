import React, { useContext } from 'react';

import { Logo } from '../../assets/Logo';
import { Sun } from '../../assets/Sun';

import ThemeContext from '../../context/ThemeContext';

import styles from './Header.module.scss';

const Header = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  const { isDark, toggleIsDark } = themeContext;

  const changeTheme = () => {
    toggleIsDark(!isDark);
    localStorage.setItem('isDark', JSON.stringify(!isDark));
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <Logo />
          <div className={styles.theme} onClick={changeTheme}>
            <Sun color={isDark ? '#fff' : '#000'} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
