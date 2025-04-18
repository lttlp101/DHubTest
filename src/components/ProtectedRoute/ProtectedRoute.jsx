// src/components/ProtectedRoute.jsx

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	const isAuthenticated = localStorage.getItem("diablohub_user_id") !== null;

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

export default ProtectedRoute;
