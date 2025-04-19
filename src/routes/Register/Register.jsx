// Register.jsx
// Route for user registration with username and password (no email).
import React, { useState } from "react";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
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
			localStorage.setItem("diablohub_username", JSON.stringify(user));
			navigate("/");
		} catch (err) {
			setError("Registration failed. Username may already exist.");
		}
	};

	return (
		<div>
			<h2>Register</h2>
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
				<Button type="submit" variant="primary" fullWidth>
					Register
				</Button>
			</form>
		</div>
	);
};

export default Register;
