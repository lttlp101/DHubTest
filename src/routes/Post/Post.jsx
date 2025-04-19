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
import CommentSection from "../../components/CommentSection/CommentSection";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import UpvoteButton from "../../components/UpvoteButton/UpvoteButton";
import Button from "../../components/Button/Button";
import { useParams, useNavigate } from "react-router-dom";
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
	if (!post) return <div>Post not found.</div>;

	const isAuthor = isContentOwner(post.author_id);

	return (
		<div>
			<h2>{post.title}</h2>
			<div>
				<small>Posted by: {post.author_name || "Anonymous"}</small>
			</div>

			{post.image_url && (
				<img
					src={post.image_url}
					alt="Post"
					style={{ maxWidth: "400px" }}
				/>
			)}
			<p>{post.content}</p>
			{post.video_url && (
				<video
					src={post.video_url}
					controls
					style={{ maxWidth: "400px" }}
				/>
			)}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "10px",
					marginTop: "20px",
				}}
			>
				<UpvoteButton
					count={post.upvotes}
					onUpvote={handleUpvote}
					disabled={upvoting}
				/>

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
				<div style={{ marginTop: "15px" }}>
					<input
						type="password"
						placeholder="Enter secret key to delete"
						value={secretKey}
						onChange={(e) => setSecretKey(e.target.value)}
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

			{error && (
				<div style={{ color: "red", marginTop: "10px" }}>{error}</div>
			)}

			<CommentSection
				comments={comments}
				onAdd={handleAddComment}
				onDelete={handleDeleteComment}
				commentText={commentText}
				setCommentText={setCommentText}
				currentUserId={currentUser?.id}
			/>
		</div>
	);
};

export default Post;
