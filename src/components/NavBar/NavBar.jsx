// NavBar.jsx
// Diablo Hub navigation bar with logo, search, navigation links, and theme switcher.
// src/components/NavBar/NavBar.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { applyTheme } from "../../utils/themeUtils";

const NavBar = () => {
	const [theme, setTheme] = useState(
		() => localStorage.getItem("diablohub_theme") || "diablo"
	);
	const [search, setSearch] = useState("");
	const navigate = useNavigate();

	// Effect to synchronize theme if changed elsewhere
	useEffect(() => {
		const savedTheme = localStorage.getItem("diablohub_theme");
		if (savedTheme && savedTheme !== theme) {
			setTheme(savedTheme);
		}
	}, []);

	const handleThemeChange = (themeName) => {
		console.log("Theme changed to:", themeName); // Debug log
		setTheme(themeName);
		applyTheme(themeName);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		if (search.trim()) {
			navigate(`/?search=${encodeURIComponent(search)}`);
		}
	};

	return (
		<nav
			className={styles.navbar}
			style={{ backgroundColor: "var(--navbar-bg)" }} // Use dynamic variable
		>
			<div className={styles.logo}>
				<Link to="/" className={styles.title}>
					DiabloHub
				</Link>
			</div>
			<form className={styles.searchForm} onSubmit={handleSearch}>
				<input
					type="text"
					placeholder="Search"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className={styles.searchInput}
				/>
			</form>
			<div className={styles.navLinks}>
				<Link to="/" className={styles.link}>
					Home
				</Link>
				<Link to="/create" className={styles.link}>
					Create New Post
				</Link>
				<ThemeSwitcher
					currentTheme={theme}
					onChange={handleThemeChange}
				/>
			</div>
		</nav>
	);
};

export default NavBar;
