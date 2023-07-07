import React, {useContext} from 'react';
import {Logo} from "../../assets/Logo";
import {Sun} from "../../assets/Sun";
import styles from './Header.module.scss'
import ThemeContext from "../../context/ThemeContext";

const Header = () => {
	const themeContext = useContext(ThemeContext)
	
	if (!themeContext) {
		return null;
	}
	
	const { isDark, toggleIsDark} = themeContext;
	
	const changeTheme = () => {
		toggleIsDark(!isDark)
	}
	
	return (
		<header className={styles.header}>
			<div className="container">
				<div className={styles.headerContent}>
					<Logo/>
					<div className={styles.theme} onClick={changeTheme}>
						<Sun color={isDark ? '#fff' : '#000'}/>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;