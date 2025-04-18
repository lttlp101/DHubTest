// Layout.jsx
// Main layout component for the app, includes NavBar and outlet for routes.
import React from "react";
import NavBar from "../components/NavBar/NavBar";

const Layout = ({ children }) => {
	return (
		<>
			<NavBar />
			<main>{children}</main>
		</>
	);
};

export default Layout;
