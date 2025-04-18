// src/utils/themeUtils.js
// Utility functions for managing and switching color themes (e.g., Diablo red, dark, light).

const THEMES = {
	diablo: {
		"--color-primary": "#b11226",
		"--color-bg": "#f6f6f6",
		"--color-text": "#222",
		"--color-accent": "#d32f2f",
	},
	dark: {
		"--color-primary": "#b11226",
		"--color-bg": "#181818",
		"--color-text": "#f6f6f6",
		"--color-accent": "#d32f2f",
	},
	light: {
		"--color-primary": "#b11226",
		"--color-bg": "#fff",
		"--color-text": "#222",
		"--color-accent": "#d32f2f",
	},
};

export const applyTheme = (themeName) => {
	const theme = THEMES[themeName] || THEMES.diablo;

	// Apply CSS variables to root element
	Object.entries(theme).forEach(([key, value]) => {
		document.documentElement.style.setProperty(key, value);
	});

	// Store theme preference
	localStorage.setItem("diablohub_theme", themeName);
};

export const getAvailableThemes = () => {
	return Object.keys(THEMES);
};
