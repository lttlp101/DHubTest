// commentsService.js
// Handles all CRUD operations for comments (add, delete, fetch for a post).
import supabase from "./supabaseClient";

// Fetch comments for a post
export async function fetchComments(postId) {
	const { data, error } = await supabase
		.from("Comments")
		.select("*")
		.eq("post_id", postId)
		.order("created_at", { ascending: true });
	if (error) throw error;
	return data;
}

// Add a comment to a post
export async function addComment(comment) {
	const { data, error } = await supabase
		.from("Comments")
		.insert([comment])
		.single();
	if (error) throw error;
	return data;
}

// Delete a comment by ID
export async function deleteComment(id) {
	const { error } = await supabase.from("Comments").delete().eq("id", id);
	if (error) throw error;
}
