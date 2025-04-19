// src/components/PostForm/PostForm.jsx
// Form for creating or editing a post: title, content, image URL, flags, video URL, upload image, secret key/userId.
// Implement reposting functionality and validation for required fields.

import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import FileUploader from "../FileUploader/FileUploader";
import { validatePost } from "../../utils/validation";
import RepostedPost from "../RepostedPost/RepostedPost";
import styles from "./PostForm.module.css";

const FLAG_OPTIONS = ["Question", "Opinion"];

const PostForm = ({
	initialValues = {},
	onSubmit,
	isEdit,
	requireSecretKey = false,
}) => {
	const [title, setTitle] = useState(initialValues.title || "");
	const [content, setContent] = useState(initialValues.content || "");
	const [image_url, setImageUrl] = useState(initialValues.image_url || "");
	const [imageFile, setImageFile] = useState(null);
	const [video_url, setVideoUrl] = useState(initialValues.video_url || "");
	const [flags, setFlags] = useState(initialValues.flags || []);
	const [secret_key, setSecretKey] = useState(initialValues.secret_key || "");
	const [repost_id, setRepostId] = useState(initialValues.repost_id || "");
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

		// If editing or secret key is required, validate that it's provided
		if ((isEdit || requireSecretKey) && !secret_key.trim()) {
			setError("Secret key is required for this operation");
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
			repost_id,
		});
	};

	return (
		<form className={styles.postForm} onSubmit={handleSubmit}>
			{/* Show repost information if this is a repost */}
			{repost_id && (
				<div className={styles.repostContainer}>
					<div className={styles.repostHeader}>
						<h4>You are reposting the following content:</h4>
					</div>
					<RepostedPost repostId={repost_id} />
					<input type="hidden" name="repost_id" value={repost_id} />
				</div>
			)}

			<div className={styles.formGroup}>
				<label htmlFor="title">Title</label>
				<input
					id="title"
					type="text"
					placeholder={
						repost_id ? "Add your thoughts on this repost" : "Title"
					}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
					className={styles.titleInput}
				/>
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="content">Content (Optional)</label>
				<textarea
					id="content"
					placeholder={
						repost_id ? "Why are you sharing this post?" : "Content"
					}
					value={content}
					onChange={(e) => setContent(e.target.value)}
					rows={6}
					className={styles.contentInput}
				/>
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="image_url">Image URL (Optional)</label>
				<input
					id="image_url"
					type="text"
					placeholder="Image URL"
					value={image_url}
					onChange={(e) => setImageUrl(e.target.value)}
					className={styles.imageUrlInput}
				/>
			</div>

			<div className={styles.formGroup}>
				<div className={styles.fileUploadSection}>
					<label>Upload an Image (Optional)</label>
					<FileUploader onUpload={setImageFile} />
				</div>
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="video_url">Video URL (Optional)</label>
				<input
					id="video_url"
					type="text"
					placeholder="Video URL"
					value={video_url}
					onChange={(e) => setVideoUrl(e.target.value)}
					className={styles.imageUrlInput}
				/>
			</div>

			<div className={styles.formGroup}>
				<label>Category Flags</label>
				<div className={styles.flagsContainer}>
					{FLAG_OPTIONS.map((flag) => (
						<label key={flag} className={styles.flagLabel}>
							<input
								type="checkbox"
								checked={flags.includes(flag)}
								onChange={() => handleFlagChange(flag)}
							/>
							{flag}
						</label>
					))}
				</div>
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="secret_key">
					Secret Key{" "}
					{isEdit
						? "(required for verification)"
						: "(for future editing/deletion)"}
				</label>
				<input
					id="secret_key"
					type="password"
					placeholder={
						isEdit ? "Enter your secret key" : "Create a secret key"
					}
					value={secret_key}
					onChange={(e) => setSecretKey(e.target.value)}
					required={isEdit || requireSecretKey}
					className={styles.imageUrlInput}
				/>
				{!isEdit && (
					<small className={styles.helperText}>
						Remember this key! You'll need it to edit or delete your
						post later.
					</small>
				)}
			</div>

			{error && <div className={styles.errorMessage}>{error}</div>}

			<Button type="submit" variant="primary" fullWidth>
				{isEdit
					? "Update Post"
					: repost_id
					? "Share Repost"
					: "Create Post"}
			</Button>
		</form>
	);
};

export default PostForm;
