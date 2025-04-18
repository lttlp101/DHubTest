// CreatePost.jsx
// Route for creating a new post.
import React, { useState } from "react";
import { createPost } from "../services/postsService";
import { uploadImage } from "../services/storageService";
import PostForm from "../components/PostForm/PostForm";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { getOrCreateAnonymousUser } from "../services/anonymousUser";

const CreatePost = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (values) => {
		setLoading(true);
		setError("");
		try {
			let imageUrl = values.image_url;
			if (values.imageFile) {
				imageUrl = await uploadImage(values.imageFile);
			}
			const anonUser = await getOrCreateAnonymousUser();
			const post = {
				...values,
				image_url: imageUrl,
				author_id: anonUser.id,
			};
			await createPost(post);
			navigate("/");
		} catch (err) {
			setError("Failed to create post: " + err.message);
		}
		setLoading(false);
	};

	return (
		<div>
			<h2>Create New Post</h2>
			{error && <div style={{ color: "red" }}>{error}</div>}
			{loading ? (
				<LoadingSpinner />
			) : (
				<PostForm
					onSubmit={handleSubmit}
					initialValues={{}}
					isEdit={false}
				/>
			)}
		</div>
	);
};

export default CreatePost;
