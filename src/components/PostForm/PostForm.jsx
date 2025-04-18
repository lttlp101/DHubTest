// PostForm.jsx
// Form for creating or editing a post: title, content, image URL, flags, video URL, upload image, secret key/userId.
import React, { useState } from "react";
import Button from "../Button/Button";
import FileUploader from "../FileUploader/FileUploader";
import { validatePost } from "../../utils/validation";
import styles from "./PostForm.module.css";

const FLAG_OPTIONS = ["Question", "Opinion"];

const PostForm = ({ initialValues = {}, onSubmit, isEdit }) => {
	const [title, setTitle] = useState(initialValues.title || "");
	const [content, setContent] = useState(initialValues.content || "");
	const [image_url, setImageUrl] = useState(initialValues.image_url || "");
	const [imageFile, setImageFile] = useState(null);
	const [video_url, setVideoUrl] = useState(initialValues.video_url || "");
	const [flags, setFlags] = useState(initialValues.flags || []);
	const [secret_key, setSecretKey] = useState(initialValues.secret_key || "");
	const [error, setError] = useState("");

	const handleFlagChange = (flag) => {
		setFlags((prev) =>
			prev.includes(flag)
				? prev.filter((f) => f !== flag)
				: [...prev, flag]
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errors = validatePost({ title, content });
		if (Object.keys(errors).length > 0) {
			setError(errors.title || errors.content);
			return;
		}
		setError("");
		onSubmit({
			title,
			content,
			image_url,
			imageFile,
			video_url,
			flags,
			secret_key,
		});
	};

	return (
		<form className={styles.postForm} onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
			<textarea
				placeholder="Content (Optional)"
				value={content}
				onChange={(e) => setContent(e.target.value)}
				rows={6}
			/>
			<input
				type="text"
				placeholder="Image URL (Optional)"
				value={image_url}
				onChange={(e) => setImageUrl(e.target.value)}
			/>
			<FileUploader onUpload={setImageFile} />
			<input
				type="text"
				placeholder="Video URL (Optional)"
				value={video_url}
				onChange={(e) => setVideoUrl(e.target.value)}
			/>
			<div>
				{FLAG_OPTIONS.map((flag) => (
					<label key={flag} style={{ marginRight: "1rem" }}>
						<input
							type="checkbox"
							checked={flags.includes(flag)}
							onChange={() => handleFlagChange(flag)}
						/>
						{flag}
					</label>
				))}
			</div>
			<input
				type="text"
				placeholder="Secret Key (for edit/delete)"
				value={secret_key}
				onChange={(e) => setSecretKey(e.target.value)}
			/>
			{error && <div style={{ color: "red" }}>{error}</div>}
			<Button type="submit">
				{isEdit ? "Update Post" : "Create Post"}
			</Button>
		</form>
	);
};

export default PostForm;
