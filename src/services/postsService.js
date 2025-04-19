// postsService.js
// Handles all CRUD operations for posts (create, read, update, delete, upvote, repost, etc).
import supabase from "./supabaseClient";

// Fetch all posts with optional sorting and filtering
export async function fetchPosts({
	sortBy = "created_at",
	order = "desc",
	search = "",
	flag = "",
} = {}) {
	let query = supabase.from("posts").select("*");

	if (search) {
		query = query.ilike("title", `%${search}%`);
	}
	if (flag) {
		query = query.contains("flags", [flag]);
	}
	query = query.order(sortBy, { ascending: order === "asc" });

	const { data, error } = await query;
	if (error) throw error;
	return data;
}

// Fetch a single post by ID
export async function fetchPostById(id) {
	const { data, error } = await supabase
		.from("posts")
		.select("*")
		.eq("id", id)
		.single();
	if (error) throw error;
	return data;
}

// Create a new post
export async function createPost(post) {
	const { data, error } = await supabase
		.from("posts")
		.insert([post])
		.single();
	if (error) throw error;
	return data;
}

// Update a post by ID with secret key
export async function updatePost(id, updates, secretKey) {
	// First check if post exists and secret key matches
	const { data: post, error: fetchError } = await supabase
		.from("posts")
		.select("secret_key, author_id")
		.eq("id", id)
		.single();

	if (fetchError) throw fetchError;

	// Verify secret key
	if (!post || post.secret_key !== secretKey) {
		throw new Error("Unauthorized: Secret key doesn't match");
	}

	// Verify the current user is the author
	const currentUserId = localStorage.getItem("diablohub_user_id");
	if (!currentUserId || post.author_id !== currentUserId) {
		throw new Error("Unauthorized: You are not the author of this post");
	}

	// If authorized, update the post
	const { data, error } = await supabase
		.from("posts")
		.update(updates)
		.eq("id", id)
		.single();

	if (error) throw error;
	return data;
}

// Delete a post by ID
export async function deletePost(id, secretKey) {
	// First check if post exists and secret key matches
	const { data: post, error: fetchError } = await supabase
		.from("posts")
		.select("secret_key, author_id")
		.eq("id", id)
		.single();

	if (fetchError) throw fetchError;

	// Verify secret key
	if (!post || post.secret_key !== secretKey) {
		throw new Error("Unauthorized: Secret key doesn't match");
	}

	// Verify the current user is the author
	const currentUserId = localStorage.getItem("diablohub_user_id");
	if (!currentUserId || post.author_id !== currentUserId) {
		throw new Error("Unauthorized: You are not the author of this post");
	}

	const { error } = await supabase.from("posts").delete().eq("id", id);
	if (error) throw error;
}

// Upvote a post by ID (increments upvotes)
export async function upvotePost(id) {
	const { data, error } = await supabase.rpc("increment_upvotes", {
		post_id: id,
	});
	if (error) throw error;
	return data;
}
