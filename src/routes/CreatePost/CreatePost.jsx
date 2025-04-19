// src/routes/CreatePost.jsx
// Route for creating a new post.

import React, { useState, useEffect } from "react";
import { createPost } from "../../services/postsService";
import { uploadImage } from "../../services/storageService";
import { getOrCreateAnonymousUser } from "../../services/anonymousUser";
import PostForm from "../../components/PostForm/PostForm";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import RepostedPost from "../../components/RepostedPost/RepostedPost";
import styles from "./CreatePost.module.css";

const CreatePost = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [uploadProgress, setUploadProgress] = useState(0);
	const [repostId, setRepostId] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();

	// Parse URL parameters for repost ID
	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const repostParam = searchParams.get("repost");

		if (repostParam) {
			setRepostId(repostParam);
		}
	}, [location]);

	// HandleSubmit to include repost_id
	const handleSubmit = async (values) => {
		setLoading(true);
		setError("");
		setUploadProgress(0);

		try {
			// Check if secret key is provided
			if (!values.secret_key) {
				setError(
					"Secret key is required. You'll need it to edit or delete your post later."
				);
				setLoading(false);
				return;
			}

			// Get or create anonymous user
			setUploadProgress(10);
			const anonUser = await getOrCreateAnonymousUser();

			// Handle image upload if provided
			let imageUrl = values.image_url;
			if (values.imageFile) {
				setUploadProgress(30);
				try {
					imageUrl = await uploadImage(values.imageFile);
					setUploadProgress(70);
				} catch (uploadErr) {
					setError(`Image upload failed: ${uploadErr.message}`);
					setLoading(false);
					return;
				}
			} else {
				setUploadProgress(70);
			}

			// Create the post
			const post = {
				title: values.title,
				content: values.content || "",
				image_url: imageUrl,
				video_url: values.video_url,
				flags: values.flags || [],
				secret_key: values.secret_key,
				author_id: anonUser.id,
				author_name: anonUser.username,
				repost_id: values.repost_id || repostId,
			};

			setUploadProgress(90);
			await createPost(post);
			setUploadProgress(100);

			// Navigate to home page after successful creation
			navigate("/");
		} catch (err) {
			setError(`Failed to create post: ${err.message}`);
		}

		setLoading(false);
	};

	return (
		<div className={styles.createPostContainer}>
			<h2>{repostId ? "Create Repost" : "Create New Post"}</h2>

			{error && (
				<div className={styles.errorMessage}>
					<p>{error}</p>
				</div>
			)}

			{loading ? (
				<div className={styles.loadingContainer}>
					<LoadingSpinner />
					<div className={styles.progressBar}>
						<div
							className={styles.progressFill}
							style={{ width: `${uploadProgress}%` }}
						></div>
					</div>
					<p>Creating your post... {uploadProgress}%</p>
				</div>
			) : (
				<PostForm
					onSubmit={handleSubmit}
					initialValues={{ repost_id: repostId }}
					isEdit={false}
				/>
			)}

			{repostId && (
				<div className={styles.repostPreview}>
					<h3>Reposting Content</h3>
					<RepostedPost repostId={repostId} />
				</div>
			)}

			<div className={styles.helpText}>
				<p>
					<strong>Important:</strong> Remember to set a secret key.
					You'll need it to edit or delete your post later.
				</p>
			</div>
		</div>
	);
};

export default CreatePost;
