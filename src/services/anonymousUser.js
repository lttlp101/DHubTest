// src/services/anonymousUser.js
// Utility for assigning and managing an anonymous user ID on app launch.

import supabase from "./supabaseClient";

// Generate a random username like "Anonymous-xxxx"
function generateAnonymousUsername() {
	return "Anonymous-" + Math.random().toString(36).substring(2, 10);
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
	const anonUsername = generateAnonymousUsername();

	try {
		// Insert into Supabase Users table
		const { data, error } = await supabase.from("users").insert([
			{
				id: uuid,
				username: anonUsername,
				anonymous_username: anonUsername,
				password: "anonymous",
			},
		]);

		if (error) throw error;

		localStorage.setItem("diablohub_user_id", uuid);
		localStorage.setItem("diablohub_username", anonUsername);

		return {
			id: uuid,
			username: anonUsername,
			anonymous_username: anonUsername,
		};
	} catch (error) {
		console.error("Failed to create anonymous user:", error);
		throw error;
	}
}

// Get the current anonymous user
export function getCurrentUser() {
	const userId = localStorage.getItem("diablohub_user_id");
	const username = localStorage.getItem("diablohub_username");

	if (!userId || !username) {
		return null;
	}

	return { id: userId, username };
}

// Check if current user is the author of a content
export function isContentOwner(contentAuthorId) {
	const currentUser = getCurrentUser();
	return currentUser && currentUser.id === contentAuthorId;
}
