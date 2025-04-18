// formatDate.js
// Utility function to format timestamps for display (e.g., "2 hours ago", "Apr 18, 2025").
export function formatDate(date) {
	const d = typeof date === "string" ? new Date(date) : date;
	const now = new Date();
	const diff = (now - d) / 1000; // seconds

	if (diff < 60) return "just now";
	if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
	if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
	if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;

	return d.toLocaleDateString(undefined, {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}
