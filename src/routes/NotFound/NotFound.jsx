// src/routes/NotFound/NotFound.jsx
// Route for displaying a 404 Not Found page.

import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
	return (
		<div className={styles.notFoundContainer}>
			<div className={styles.notFoundIcon}>404</div>
			<h2 className={styles.notFoundTitle}>Page Not Found</h2>
			<p className={styles.notFoundText}>
				The page you are looking for does not exist or has been moved.
			</p>
			<div className={styles.homeLinkContainer}>
				<Link to="/" className={styles.homeLink}>
					← Back to Home
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
