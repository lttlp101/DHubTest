// ThemeSwitcher.jsx
// Allows user to switch between color themes (e.g., Diablo red, dark, custom).
import React from "react";
import styles from "./ThemeSwitcher.module.css";

const ThemeSwitcher = ({ currentTheme, onChange }) => {
	return (
		<div className={styles.themeSwitcher}>
			<label htmlFor="theme-select">Theme:</label>
			<select
				id="theme-select"
				value={currentTheme}
				onChange={(e) => onChange(e.target.value)}
			>
				<option value="diablo">Diablo Red</option>
				<option value="dark">Dark</option>
				<option value="light">Light</option>
			</select>
		</div>
	);
};

export default ThemeSwitcher;
