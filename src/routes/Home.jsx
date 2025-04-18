// Home.jsx
// Displays the main feed of posts, with sorting, searching, and filtering.
import React, { useEffect, useState } from "react";
import { fetchPosts } from "../services/postsService";
import PostCard from "../components/PostCard/PostCard";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const Home = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [sortBy, setSortBy] = useState("created_at");
	const [order, setOrder] = useState("desc");
	const [search, setSearch] = useState("");
	const [flag, setFlag] = useState("");

	useEffect(() => {
		const loadPosts = async () => {
			setLoading(true);
			try {
				const data = await fetchPosts({ sortBy, order, search, flag });
				setPosts(data);
			} catch (err) {
				console.error("Failed to fetch posts:", err);
			}
			setLoading(false);
		};
		loadPosts();
	}, [sortBy, order, search, flag]);

	return (
		<div>
			{/* Controls for sort, search, filter */}
			<div
				style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}
			>
				<input
					type="text"
					placeholder="Search by title"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<select
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}
				>
					<option value="created_at">Newest</option>
					<option value="upvotes">Most Popular</option>
				</select>
				<select value={flag} onChange={(e) => setFlag(e.target.value)}>
					<option value="">All Flags</option>
					<option value="Question">Question</option>
					<option value="Opinion">Opinion</option>
				</select>
			</div>
			{loading ? (
				<LoadingSpinner />
			) : (
				posts.map((post) => (
					<PostCard
						key={post.id}
						post={post}
						onClick={() =>
							(window.location.href = `/post/${post.id}`)
						}
					/>
				))
			)}
		</div>
	);
};

export default Home;
