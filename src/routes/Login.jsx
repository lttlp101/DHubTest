// Login.jsx
// Route for user login with username and password (no email).
import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

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
			localStorage.setItem("diablohub_user", JSON.stringify(user));
			navigate("/");
		} catch (err) {
			setError("Invalid username or password.");
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
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
