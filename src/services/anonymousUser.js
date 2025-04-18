// anonymousUser.js
// Utility for assigning and managing an anonymous user ID on app launch.

import { createClient } from "@supabase/supabase-js";
import supabase from "./supabaseClient";

// Generate a random username like "Anonymous-xxxx"
function generateAnonymousUsername(uuid) {
	return "Anonymous-" + uuid.slice(0, 8);
}

// Get or create the anonymous user in localStorage and Supabase
export async function getOrCreateAnonymousUser() {
	let userId = localStorage.getItem("diablohub_user_id");
	let username = localStorage.getItem("diablohub_username");

	if (userId && username) {
		return { id: userId, username };
	}

	// Generate a new UUID
	const uuid = crypto.randomUUID();
	const anonUsername = generateAnonymousUsername(uuid);

	// Insert into Supabase Users table
	const { data, error } = await supabase
		.from("Users")
		.insert([{ id: uuid, username: anonUsername }])
		.single();

	if (error) {
		console.error("Failed to create anonymous user:", error);
		throw error;
	}

	localStorage.setItem("diablohub_user_id", uuid);
	localStorage.setItem("diablohub_username", anonUsername);

	return { id: uuid, username: anonUsername };
}
