// src/routes/Register/Register.jsx
// Route for user registration with username and password (no email).

import React, { useState } from "react";
import { registerUser } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./Register.module.css";

const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			const user = await registerUser({ username, password });
			navigate("/");
		} catch (err) {
			setError("Registration failed. Username may already exist.");
		}
	};

	return (
		<div className={styles.registerContainer}>
			<div className={styles.registerCard}>
				<h2 className={styles.registerTitle}>Create Account</h2>

				<form className={styles.registerForm} onSubmit={handleSubmit}>
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
						<p className={styles.passwordRequirements}>
							Password must be at least 3 characters long
						</p>
					</div>

					{error && (
						<div className={styles.errorMessage}>{error}</div>
					)}

					<Button type="submit" variant="primary" fullWidth>
						Register
					</Button>
				</form>

				<div className={styles.loginOption}>
					<p>
						Already have an account?{" "}
						<Link to="/login" className={styles.loginLink}>
							LogIn here
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
