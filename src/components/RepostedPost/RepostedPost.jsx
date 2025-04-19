// src/components/RepostedPost/RepostedPost.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPostById } from "../../services/postsService";
import { formatDate } from "../../utils/formatDate";
import styles from "./RepostedPost.module.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const RepostedPost = ({ repostId }) => {
	const [originalPost, setOriginalPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadOriginalPost = async () => {
			try {
				const post = await fetchPostById(repostId);
				setOriginalPost(post);
			} catch (err) {
				setError("Failed to load original post");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		if (repostId) {
			loadOriginalPost();
		}
	}, [repostId]);

	if (!repostId) return null;
	if (loading)
		return (
			<div className={styles.loading}>
				<LoadingSpinner />
			</div>
		);
	if (error) return <div className={styles.error}>{error}</div>;
	if (!originalPost)
		return <div className={styles.notFound}>Original post not found</div>;

	return (
		<div className={styles.repostedPost}>
			<div className={styles.repostHeader}>
				<span className={styles.repostLabel}>Reposted content</span>
				<Link to={`/post/${repostId}`} className={styles.originalLink}>
					View original post
				</Link>
			</div>
			<div className={styles.repostContent}>
				<h3 className={styles.repostTitle}>{originalPost.title}</h3>
				<div className={styles.repostMeta}>
					<span className={styles.repostAuthor}>
						Posted by {originalPost.author_name || "Anonymous"}
					</span>
					<span className={styles.repostTime}>
						{formatDate(originalPost.created_at)}
					</span>
				</div>
				{originalPost.image_url && (
					<img
						src={originalPost.image_url}
						alt="Original post"
						className={styles.repostImage}
					/>
				)}
				<p className={styles.repostText}>{originalPost.content}</p>
			</div>
		</div>
	);
};

export default RepostedPost;
