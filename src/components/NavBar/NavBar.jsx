// NavBar.jsx
// Diablo Hub navigation bar with logo, search, navigation links, and theme switcher.
// src/components/NavBar/NavBar.jsx

// NavBar.jsx - Updated with Logout Feature
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import Button from "../Button/Button";
import { logoutUser } from "../../services/authService";
import { applyTheme } from "../../utils/themeUtils";

const NavBar = () => {
	const [theme, setTheme] = useState(
		() => localStorage.getItem("diablohub_theme") || "diablo"
	);
	const [search, setSearch] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	// Effect to check login status and synchronize theme
	useEffect(() => {
		const savedTheme = localStorage.getItem("diablohub_theme");
		if (savedTheme && savedTheme !== theme) {
			setTheme(savedTheme);
		}

		// Check if user is logged in
		const userId = localStorage.getItem("diablohub_user_id");
		setIsLoggedIn(!!userId);
	}, []);

	const handleThemeChange = (themeName) => {
		setTheme(themeName);
		applyTheme(themeName);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		if (search.trim()) {
			navigate(`/?search=${encodeURIComponent(search)}`);
		}
	};

	const handleLogout = () => {
		logoutUser();
		setIsLoggedIn(false);
		navigate("/");
	};

	return (
		<nav
			className={styles.navbar}
			style={{ backgroundColor: "var(--navbar-bg)" }}
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
				<Link to="/" className={styles.link} onClick={handleLogout}>
					Logout
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
