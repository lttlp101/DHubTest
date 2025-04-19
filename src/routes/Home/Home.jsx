// Home.jsx
// Displays the main feed of posts, with sorting, searching, and filtering.
// src/routes/Home/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Add useLocation
import { fetchPosts } from "../../services/postsService";
import PostCard from "../../components/PostCard/PostCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Button from "../../components/Button/Button";
import styles from "./Home.module.css";

const Home = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [sortBy, setSortBy] = useState("created_at");
	const [order, setOrder] = useState("desc");
	const [flag, setFlag] = useState("");

	const navigate = useNavigate();
	const location = useLocation(); // Get access to the URL location

	// Parse search parameter from URL
	const getSearchParam = () => {
		const searchParams = new URLSearchParams(location.search);
		return searchParams.get("search") || "";
	};

	useEffect(() => {
		const loadPosts = async () => {
			setLoading(true);
			try {
				const searchTerm = getSearchParam();
				const data = await fetchPosts({
					sortBy,
					order,
					flag,
					search: searchTerm, // Pass the search parameter
				});
				setPosts(data);
			} catch (err) {
				console.error("Failed to fetch posts:", err);
			}
			setLoading(false);
		};
		loadPosts();
	}, [sortBy, order, flag, location.search]); // Add location.search as dependency

	const handleSortChange = (newSortBy) => {
		setSortBy(newSortBy);
	};

	// Add this to show the current search term if present
	const searchTerm = getSearchParam();

	return (
		<div className={styles.homeContainer}>
			{/* Show search results heading if search is active */}
			{searchTerm && (
				<h2 className={styles.searchResultsHeading}>
					Search results for: "{searchTerm}"
				</h2>
			)}

			{/* Controls for sort and filter */}
			<div className={styles.controlsContainer}>
				<div className={styles.sortControls}>
					<span className={styles.orderByLabel}>Order by: </span>
					<div className={styles.sortButtons}>
						<Button
							onClick={() => handleSortChange("created_at")}
							variant={
								sortBy === "created_at"
									? "primary"
									: "secondary"
							}
							size="small"
						>
							Newest
						</Button>
						<Button
							onClick={() => handleSortChange("upvotes")}
							variant={
								sortBy === "upvotes" ? "primary" : "secondary"
							}
							size="small"
						>
							Most Popular
						</Button>
					</div>
				</div>

				<select
					value={flag}
					onChange={(e) => setFlag(e.target.value)}
					className={styles.flagFilter}
				>
					<option value="">All Categories</option>
					<option value="Question">Question</option>
					<option value="Opinion">Opinion</option>
				</select>
			</div>

			{loading ? (
				<LoadingSpinner />
			) : (
				<div className={styles.postsContainer}>
					{posts.length > 0 ? (
						posts.map((post) => (
							<PostCard
								key={post.id}
								post={post}
								onClick={() => navigate(`/post/${post.id}`)}
							/>
						))
					) : (
						<div className={styles.noPosts}>
							<p>
								{searchTerm
									? `No posts found matching "${searchTerm}"`
									: "No posts found. Be the first to create a post!"}
							</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Home;
