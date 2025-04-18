// EditPost.jsx
// Route for editing an existing post.
import React, { useEffect, useState } from "react";
import { fetchPostById, updatePost } from "../services/postsService";
import { uploadImage } from "../services/storageService";
import PostForm from "../components/PostForm/PostForm";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const EditPost = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [initialValues, setInitialValues] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			try {
				const post = await fetchPostById(id);
				setInitialValues(post);
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
		try {
			let imageUrl = values.image_url;
			if (values.imageFile) {
				imageUrl = await uploadImage(values.imageFile);
			}
			const updates = {
				...values,
				image_url: imageUrl,
			};
			await updatePost(id, updates);
			navigate(`/post/${id}`);
		} catch (err) {
			setError("Failed to update post: " + err.message);
		}
		setLoading(false);
	};

	if (loading) return <LoadingSpinner />;
	if (!initialValues) return <div>Post not found.</div>;

	return (
		<div>
			<h2>Edit Post</h2>
			{error && <div style={{ color: "red" }}>{error}</div>}
			<PostForm
				onSubmit={handleSubmit}
				initialValues={initialValues}
				isEdit={true}
			/>
		</div>
	);
};

export default EditPost;
