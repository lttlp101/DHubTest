// LoadingSpinner.jsx
// Displays a loading animation while data is being fetched.
import React from "react";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
	return (
		<div className={styles.spinnerContainer}>
			<div className={styles.spinner}></div>
		</div>
	);
};

export default LoadingSpinner;
