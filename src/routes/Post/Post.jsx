// src/routes/Post/Post.jsx
// Displays a single post in detail, including content, image, comments, upvotes, and edit/delete options.

import React, { useEffect, useState } from "react";
import {
	fetchPostById,
	upvotePost,
	deletePost,
} from "../../services/postsService";
import {
	fetchComments,
	addComment,
	deleteComment,
} from "../../services/commentsService";
import { getCurrentUser, isContentOwner } from "../../services/anonymousUser";
import { useParams, useNavigate } from "react-router-dom";
import CommentSection from "../../components/CommentSection/CommentSection";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import UpvoteButton from "../../components/UpvoteButton/UpvoteButton";
import Button from "../../components/Button/Button";
import { formatDate } from "../../utils/formatDate";
import RepostedPost from "../../components/RepostedPost/RepostedPost";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import styles from "./Post.module.css";

const Post = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [commentText, setCommentText] = useState("");
	const [upvoting, setUpvoting] = useState(false);
	const [secretKey, setSecretKey] = useState("");
	const [error, setError] = useState("");
	const [showSecretKeyInput, setShowSecretKeyInput] = useState(false);

	const currentUser = getCurrentUser();

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			try {
				const postData = await fetchPostById(id);
				setPost(postData);
				const commentData = await fetchComments(id);
				setComments(commentData);
			} catch (err) {
				console.error("Failed to fetch post or comments:", err);
				setError("Failed to load post: " + err.message);
			}
			setLoading(false);
		};
		load();
	}, [id]);

	const handleRepost = () => {
		navigate(`/create?repost=${id}`);
	};

	const handleUpvote = async () => {
		setUpvoting(true);
		try {
			await upvotePost(id);
			const updated = await fetchPostById(id);
			setPost(updated);
		} catch (err) {
			console.error("Failed to upvote:", err);
			setError("Failed to upvote: " + err.message);
		}
		setUpvoting(false);
	};

	const handleAddComment = async () => {
		if (!commentText.trim()) return;

		if (!currentUser) {
			setError("You must be logged in to add comments");
			return;
		}

		try {
			await addComment({
				post_id: id,
				content: commentText,
			});
			const commentData = await fetchComments(id);
			setComments(commentData);
			setCommentText("");
			setError("");
		} catch (err) {
			console.error("Failed to add comment:", err);
			setError("Failed to add comment: " + err.message);
		}
	};

	const handleDeleteComment = async (commentId) => {
		try {
			await deleteComment(commentId);
			const commentData = await fetchComments(id);
			setComments(commentData);
			setError("");
		} catch (err) {
			console.error("Failed to delete comment:", err);
			setError("Failed to delete comment: " + err.message);
		}
	};

	const handleDeletePost = async () => {
		if (!showSecretKeyInput) {
			setShowSecretKeyInput(true);
			return;
		}

		if (!secretKey.trim()) {
			setError("Secret key is required to delete this post");
			return;
		}

		try {
			await deletePost(id, secretKey);
			navigate("/");
		} catch (err) {
			console.error("Failed to delete post:", err);
			setError("Failed to delete post: " + err.message);
		}
	};

	if (loading) return <LoadingSpinner />;
	if (!post)
		return <div className={styles.postContainer}>Post not found.</div>;

	const isAuthor = isContentOwner(post.author_id);

	return (
		<div className={styles.postContainer}>
			<div className={styles.postHeader}>
				<h2 className={styles.postTitle}>{post.title}</h2>
				<div className={styles.postMeta}>
					<span className={styles.authorInfo}>
						Posted by: {post.author_name || "Anonymous"}
					</span>
					{post.created_at && (
						<span className={styles.postTime}>
							{formatDate(post.created_at)}
						</span>
					)}
				</div>
			</div>

			{/* Display reposted content if this is a repost */}
			{post.repost_id && <RepostedPost repostId={post.repost_id} />}

			{post.image_url && (
				<img
					src={post.image_url}
					alt="Post"
					className={styles.postImage}
				/>
			)}

			<div className={styles.postContent}>{post.content}</div>

			{post.video_url && (
				<div className={styles.videoContainer}>
					<VideoPlayer url={post.video_url} />
				</div>
			)}

			<div className={styles.actionButtons}>
				<UpvoteButton
					count={post.upvotes}
					onUpvote={handleUpvote}
					disabled={upvoting}
				/>

				<Button onClick={handleRepost} variant="secondary">
					Repost
				</Button>

				{isAuthor && (
					<>
						<Button
							onClick={() => navigate(`/edit/${id}`)}
							variant="secondary"
						>
							Edit Post
						</Button>

						<Button onClick={handleDeletePost} variant="danger">
							Delete Post
						</Button>
					</>
				)}
			</div>

			{showSecretKeyInput && (
				<div className={styles.secretKeyContainer}>
					<input
						type="password"
						placeholder="Enter secret key to delete"
						value={secretKey}
						onChange={(e) => setSecretKey(e.target.value)}
						className={styles.secretKeyInput}
					/>
					<Button
						onClick={handleDeletePost}
						variant="danger"
						size="small"
					>
						Confirm Delete
					</Button>
				</div>
			)}

			{error && <div className={styles.errorMessage}>{error}</div>}

			<div className={styles.commentsSection}>
				<CommentSection
					comments={comments}
					onAdd={handleAddComment}
					onDelete={handleDeleteComment}
					commentText={commentText}
					setCommentText={setCommentText}
					currentUserId={currentUser?.id}
				/>
			</div>
		</div>
	);
};

export default Post;
