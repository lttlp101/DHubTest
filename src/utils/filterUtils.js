// filterUtils.js
// Utility functions for filtering, searching, and sorting posts (by flags, title, upvotes, creation time, etc).

// Filter posts by flag (e.g., "Question", "Opinion")
export function filterByFlag(posts, flag) {
	if (!flag) return posts;
	return posts.filter(
		(post) => Array.isArray(post.flags) && post.flags.includes(flag)
	);
}

// Search posts by title (case-insensitive)
export function searchByTitle(posts, search) {
	if (!search) return posts;
	const s = search.toLowerCase();
	return posts.filter(
		(post) => post.title && post.title.toLowerCase().includes(s)
	);
}

// Sort posts by a field (e.g., "created_at", "upvotes")
export function sortPosts(posts, sortBy = "created_at", order = "desc") {
	const sorted = [...posts].sort((a, b) => {
		if (sortBy === "upvotes") {
			return order === "asc"
				? a.upvotes - b.upvotes
				: b.upvotes - a.upvotes;
		}
		const aDate = new Date(a[sortBy]);
		const bDate = new Date(b[sortBy]);
		return order === "asc" ? aDate - bDate : bDate - aDate;
	});
	return sorted;
}

// Combined utility for filtering, searching, and sorting
export function filterSortSearchPosts(posts, { flag, search, sortBy, order }) {
	let result = posts;
	result = filterByFlag(result, flag);
	result = searchByTitle(result, search);
	result = sortPosts(result, sortBy, order);
	return result;
}
