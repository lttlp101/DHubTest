// NavBar.jsx
// Diablo Hub navigation bar with logo, search, navigation links, and theme switcher.
import React, { useState } from "react";
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

	const handleThemeChange = (themeName) => {
		setTheme(themeName);
		applyTheme(themeName);
		localStorage.setItem("diablohub_theme", themeName);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		if (search.trim()) {
			navigate(`/?search=${encodeURIComponent(search)}`);
		}
	};

	return (
		<nav className={styles.navbar}>
			<div className={styles.logo}>
				<Link
					to="/"
					style={{
						color: "#fff",
						textDecoration: "none",
						fontWeight: "bold",
						fontSize: "1.5rem",
					}}
				>
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
