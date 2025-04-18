// validation.js
// Utility functions for validating form inputs (e.g., post title required, password strength, etc).

export function validatePost({ title, content }) {
	const errors = {};
	if (!title || title.trim().length < 3) {
		errors.title = "Title is required and must be at least 3 characters.";
	}
	if (content && content.length > 2000) {
		errors.content = "Content is too long (max 2000 characters).";
	}
	return errors;
}

export function validatePassword(password) {
	if (!password || password.length < 6) {
		return "Password must be at least 6 characters.";
	}
	if (!/[A-Z]/.test(password)) {
		return "Password must contain at least one uppercase letter.";
	}
	if (!/[a-z]/.test(password)) {
		return "Password must contain at least one lowercase letter.";
	}
	if (!/[0-9]/.test(password)) {
		return "Password must contain at least one number.";
	}
	return null;
}

export function validateUsername(username) {
	if (!username || username.length < 3) {
		return "Username must be at least 3 characters.";
	}
	if (!/^[a-zA-Z0-9_]+$/.test(username)) {
		return "Username can only contain letters, numbers, and underscores.";
	}
	return null;
}
