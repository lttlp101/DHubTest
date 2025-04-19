// src/routes/Login/Login.jsx
// Route for user login with username and password (no email).

import React, { useState, useEffect } from "react";
import { loginUser } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { getCurrentUser } from "../../services/anonymousUser";
import styles from "./Login.module.css";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isAnonymousUser, setIsAnonymousUser] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		// Check if user is anonymous
		const currentUser = getCurrentUser();
		if (currentUser && currentUser.username) {
			setIsAnonymousUser(currentUser.username.startsWith("Anonymous-"));
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			const user = await loginUser({ username, password });
			// Success - navigate to home
			navigate("/");
		} catch (err) {
			console.error("Login error:", err);
			setError(
				"Login failed: " +
					(err.message || "Invalid username or password")
			);
		}
	};

	return (
		<div className={styles.loginContainer}>
			<div className={styles.loginCard}>
				<h2 className={styles.loginTitle}>LogIn</h2>
				<form className={styles.loginForm} onSubmit={handleSubmit}>
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>Username:</label>
						<input
							className={styles.formInput}
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>Password:</label>
						<input
							className={styles.formInput}
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					{error && (
						<div className={styles.errorMessage}>{error}</div>
					)}
					<Button type="submit" variant="primary" fullWidth>
						LogIn
					</Button>
				</form>

				<div className={styles.registerOption}>
					<p>
						Don't have an account?{" "}
						<Link to="/register" className={styles.registerLink}>
							Register here
						</Link>
					</p>
					{isAnonymousUser && (
						<p className={styles.anonymousMessage}>
							You're currently using an anonymous account. Create
							a permanent account to save your posts.
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
