// authService.js
// Handles user authentication (register, login, logout) using username and password (no email).
import supabase from "./supabaseClient";

// Register a new user (pseudo-auth: insert into a custom Users table or just use localStorage)
export async function registerUser({ username, password }) {
	// Example: Insert into a custom Users table (if you create one)
	const { data, error } = await supabase
		.from("Users")
		.insert([{ username, password }])
		.single();
	if (error) throw error;
	return data;
}

// Login a user (pseudo-auth: check username/password in Users table)
export async function loginUser({ username, password }) {
	const { data, error } = await supabase
		.from("Users")
		.select("*")
		.eq("username", username)
		.eq("password", password)
		.single();
	if (error) throw error;
	return data;
}

// Logout (for pseudo-auth, just clear localStorage or session)
export function logoutUser() {
	// Example: Remove user info from localStorage
	localStorage.removeItem("diablohub_user");
}
