// Login.jsx
// Route for user login with username and password (no email).
// Login.jsx - FIXED VERSION
import React, { useState } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./Login.module.css";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			const user = await loginUser({ username, password });
			// Success - navigate to home
			// No need to store in localStorage as authService already does it
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
		<div>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Username:</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				{error && <div style={{ color: "red" }}>{error}</div>}
				<Button type="submit" variant="primary">
					Login
				</Button>
			</form>
		</div>
	);
};

export default Login;
