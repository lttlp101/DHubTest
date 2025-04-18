// src/utils/themeUtils.js

const THEMES = {
	diablo: {
		"--color-primary": "#990000",
		"--color-primary-dark": "#660000",
		"--color-primary-light": "#cc0000",
		"--color-secondary": "#471010",
		"--color-accent": "#ffcc00",
		"--color-bg": "#f5f5f5",
		"--color-card-bg": "#ffffff",
		"--navbar-bg": "#990000",
	},
	dark: {
		"--color-primary": "#771111",
		"--color-primary-dark": "#550000",
		"--color-primary-light": "#991111",
		"--color-secondary": "#333333",
		"--color-accent": "#ffcc00",
		"--color-bg": "#222222",
		"--color-card-bg": "#333333",
		"--navbar-bg": "#111111",
		"--color-text": "#f6f6f6",
		"--color-text-light": "#cccccc",
	},
	light: {
		"--color-primary": "#cc0000",
		"--color-primary-dark": "#990000",
		"--color-primary-light": "#ff3333",
		"--color-secondary": "#f1f1f1",
		"--color-accent": "#ffcc00",
		"--color-bg": "#ffffff",
		"--color-card-bg": "#f9f9f9",
		"--navbar-bg": "#cc0000",
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

	// Add a data attribute to help with component-specific theming
	document.documentElement.setAttribute("data-theme", themeName);
};

export const getAvailableThemes = () => {
	return Object.keys(THEMES);
};
