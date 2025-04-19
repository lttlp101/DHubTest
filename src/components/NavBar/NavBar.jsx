// src/components/NavBar/NavBar.jsx
// Diablo Hub navigation bar with title, search, navigation links, and theme switcher.

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { logoutUser } from "../../services/authService";
import { getCurrentUser } from "../../services/anonymousUser";
import { applyTheme } from "../../utils/themeUtils";
import styles from "./NavBar.module.css";

const NavBar = () => {
	const [theme, setTheme] = useState(
		() => localStorage.getItem("diablohub_theme") || "diablo"
	);
	const [search, setSearch] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isAnonymousUser, setIsAnonymousUser] = useState(false);
	const navigate = useNavigate();

	const checkLoginStatus = () => {
		const user = getCurrentUser();
		setIsLoggedIn(!!user);
		if (user && user.username) {
			setIsAnonymousUser(user.username.startsWith("Anonymous-"));
		}
	};

	// Effect to check login status and synchronize theme
	useEffect(() => {
		const savedTheme = localStorage.getItem("diablohub_theme");
		if (savedTheme && savedTheme !== theme) {
			setTheme(savedTheme);
		}

		// Initial check
		checkLoginStatus();

		// Add listener for auth changes
		const handleAuthChange = () => checkLoginStatus();
		window.addEventListener("auth_state_changed", handleAuthChange);

		// Cleanup
		return () => {
			window.removeEventListener("auth_state_changed", handleAuthChange);
		};
	}, [theme]);

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
					placeholder="Search... type and hit enter"
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

				{isLoggedIn ? (
					<Link to="/" className={styles.link} onClick={handleLogout}>
						Logout
					</Link>
				) : (
					<Link to="/login" className={styles.link}>
						Login
						{isAnonymousUser && (
							<span className={styles.registerBadge}>
								/ Register
							</span>
						)}
					</Link>
				)}

				<ThemeSwitcher
					currentTheme={theme}
					onChange={handleThemeChange}
				/>
			</div>
		</nav>
	);
};

export default NavBar;
