// commentsService.js
// Handles all CRUD operations for comments (add, delete, fetch for a post).
import supabase from "./supabaseClient";

// Fetch comments for a post
export async function fetchComments(postId) {
	const { data, error } = await supabase
		.from("comments")
		.select("*")
		.eq("post_id", postId)
		.order("created_at", { ascending: true });
	if (error) throw error;
	return data;
}

// Add a comment to a post
export async function addComment(comment) {
	// Ensure the current user ID is associated with the comment
	const currentUserId = localStorage.getItem("diablohub_user_id");
	const currentUsername = localStorage.getItem("diablohub_username");

	if (!currentUserId) {
		throw new Error("User not authenticated");
	}

	const commentWithUser = {
		...comment,
		author_id: currentUserId,
		author_name: currentUsername || "Anonymous",
	};

	const { data, error } = await supabase
		.from("comments")
		.insert([commentWithUser])
		.single();

	if (error) throw error;
	return data;
}

// Delete a comment by ID
export async function deleteComment(id) {
	// First check if the comment exists and user is the author
	const { data: comment, error: fetchError } = await supabase
		.from("comments")
		.select("author_id")
		.eq("id", id)
		.single();

	if (fetchError) throw fetchError;

	// Verify the current user is the author
	const currentUserId = localStorage.getItem("diablohub_user_id");
	if (!currentUserId || comment.author_id !== currentUserId) {
		throw new Error("Unauthorized: You are not the author of this comment");
	}

	const { error } = await supabase.from("Comments").delete().eq("id", id);
	if (error) throw error;
}
