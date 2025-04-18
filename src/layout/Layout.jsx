// Layout.jsx
// Main layout component for the app, includes NavBar and outlet for routes.
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

const Layout = () => {
	return (
		<>
			<NavBar />
			<main className="container">
				<Outlet />
			</main>
		</>
	);
};

export default Layout;
