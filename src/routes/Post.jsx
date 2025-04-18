// Post.jsx
// Displays a single post in detail, including content, image, comments, upvotes, and edit/delete options.
import React, { useEffect, useState } from "react";
import {
	fetchPostById,
	upvotePost,
	deletePost,
} from "../services/postsService";
import {
	fetchComments,
	addComment,
	deleteComment,
} from "../services/commentsService";
import CommentSection from "../components/CommentSection/CommentSection";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import UpvoteButton from "../components/UpvoteButton/UpvoteButton";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";

const Post = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [commentText, setCommentText] = useState("");
	const [upvoting, setUpvoting] = useState(false);

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
		}
		setUpvoting(false);
	};

	const handleAddComment = async () => {
		if (!commentText.trim()) return;
		try {
			await addComment({ post_id: id, content: commentText });
			const commentData = await fetchComments(id);
			setComments(commentData);
			setCommentText("");
		} catch (err) {
			console.error("Failed to add comment:", err);
		}
	};

	const handleDeleteComment = async (commentId) => {
		try {
			await deleteComment(commentId);
			const commentData = await fetchComments(id);
			setComments(commentData);
		} catch (err) {
			console.error("Failed to delete comment:", err);
		}
	};

	const handleDeletePost = async () => {
		if (window.confirm("Are you sure you want to delete this post?")) {
			try {
				await deletePost(id);
				navigate("/");
			} catch (err) {
				console.error("Failed to delete post:", err);
			}
		}
	};

	if (loading) return <LoadingSpinner />;
	if (!post) return <div>Post not found.</div>;

	return (
		<div>
			<h2>{post.title}</h2>
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
			<div>
				<UpvoteButton
					count={post.upvotes}
					onUpvote={handleUpvote}
					disabled={upvoting}
				/>
				<Button
					onClick={handleDeletePost}
					variant="danger"
					style={{ marginLeft: "1rem" }}
				>
					Delete Post
				</Button>
			</div>
			<CommentSection
				comments={comments}
				onAdd={handleAddComment}
				onDelete={handleDeleteComment}
				commentText={commentText}
				setCommentText={setCommentText}
			/>
		</div>
	);
};

export default Post;
