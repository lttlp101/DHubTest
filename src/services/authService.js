// authService.js
// Handles user authentication (register, login, logout) using username and password (no email).
// authService.js - FIXED VERSION
import supabase from "./supabaseClient";

// Register a new user
export async function registerUser({ username, password }) {
	// Check if username already exists
	const { data: existingUser } = await supabase
		.from("users") // Use lowercase consistent with anonymousUser.js
		.select("username")
		.eq("username", username)
		.single();

	if (existingUser) {
		throw new Error("Username already exists");
	}

	// Insert new user with consistent field names
	const { data, error } = await supabase.from("users").insert([
		{
			username,
			password: password,
			id: crypto.randomUUID(),
		},
	]);

	if (error) throw error;

	// Return the new user and update localStorage with consistent keys
	const { data: newUser, error: fetchError } = await supabase
		.from("users")
		.select("*")
		.eq("username", username)
		.single();

	if (fetchError) throw fetchError;

	// Use same localStorage keys as anonymousUser.js
	localStorage.setItem("diablohub_user_id", newUser.id);
	localStorage.setItem("diablohub_username", newUser.username);

	return newUser;
}

// Login a user - fixed to use consistent table and field names
export async function loginUser({ username, password }) {
	const { data, error } = await supabase
		.from("users")
		.select("*")
		.eq("username", username)
		.eq("password", password)
		.single();

	if (error) throw error;
	if (!data) throw new Error("Invalid username or password");

	// Use same localStorage keys as anonymousUser.js
	localStorage.setItem("diablohub_user_id", data.id);
	localStorage.setItem("diablohub_username", data.username);

	return data;
}

// Logout - updated to clear all relevant keys
export function logoutUser() {
	localStorage.removeItem("diablohub_user_id");
	localStorage.removeItem("diablohub_username");
	localStorage.removeItem("diablohub_user"); // Clear legacy key if present
}
