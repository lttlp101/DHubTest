// src/routes/EditPost.jsx
// Route for editing an existing post.

import React, { useEffect, useState } from "react";
import { fetchPostById, updatePost } from "../../services/postsService";
import { uploadImage } from "../../services/storageService";
import { isContentOwner } from "../../services/anonymousUser";
import PostForm from "../../components/PostForm/PostForm";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Button from "../../components/Button/Button";

const EditPost = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [initialValues, setInitialValues] = useState(null);
	const [unauthorized, setUnauthorized] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			try {
				const post = await fetchPostById(id);
				setInitialValues(post);

				// Check if the current user is the author
				if (!isContentOwner(post.author_id)) {
					setUnauthorized(true);
				}
			} catch (err) {
				setError("Failed to load post: " + err.message);
			}
			setLoading(false);
		};
		load();
	}, [id]);

	const handleSubmit = async (values) => {
		setLoading(true);
		setError("");

		if (!values.secret_key) {
			setError("Secret key is required to update this post");
			setLoading(false);
			return;
		}

		try {
			let imageUrl = values.image_url;
			if (values.imageFile) {
				imageUrl = await uploadImage(values.imageFile);
			}

			const updates = {
				...values,
				image_url: imageUrl,
			};

			await updatePost(id, updates, values.secret_key);
			navigate(`/post/${id}`);
		} catch (err) {
			setError(err.message);
		}
		setLoading(false);
	};

	if (loading) return <LoadingSpinner />;
	if (unauthorized) {
		return (
			<div>
				<h2>Unauthorized</h2>
				<p>
					You are not authorized to edit this post as you are not the
					author.
				</p>
				<Button
					onClick={() => navigate(`/post/${id}`)}
					variant="primary"
				>
					Back to Post
				</Button>
			</div>
		);
	}
	if (!initialValues) return <div>Post not found.</div>;

	return (
		<div>
			<h2>Edit Post</h2>
			{error && <div style={{ color: "red" }}>{error}</div>}
			<PostForm
				onSubmit={handleSubmit}
				initialValues={initialValues}
				isEdit={true}
				requireSecretKey={true}
			/>
		</div>
	);
};

export default EditPost;
