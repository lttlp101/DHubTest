// src/components/ThemeSwitcher/ThemeSwitcher.jsx
// Allows user to switch between color themes (e.g., Diablo red, dark, custom).
//
import React from "react";
import styles from "./ThemeSwitcher.module.css";

const ThemeSwitcher = ({ currentTheme, onChange }) => {
	const handleChange = (e) => {
		const newTheme = e.target.value;
		console.log("Theme selected:", newTheme); // Debug log
		onChange(newTheme);
	};

	return (
		<div className={styles.themeSwitcher}>
			<label htmlFor="theme-select" className={styles.label}>
				Theme:
			</label>
			<select
				id="theme-select"
				value={currentTheme}
				onChange={handleChange}
				className={styles.select}
			>
				<option value="diablo">Diablo Red</option>
				<option value="dark">Dark</option>
				<option value="light">Light</option>
			</select>
		</div>
	);
};

export default ThemeSwitcher;
