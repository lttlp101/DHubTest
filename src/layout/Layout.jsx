// Layout.jsx
// Main layout component for the app, includes NavBar and outlet for routes.
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import styles from "./Layout.module.css";

const Layout = () => {
	return (
		<>
			<div className={styles.layoutContainer}>
				<NavBar />
				<main className={styles.main}>
					<Outlet />
				</main>
			</div>
		</>
	);
};

export default Layout;
