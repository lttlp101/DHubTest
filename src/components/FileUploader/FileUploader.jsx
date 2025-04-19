// FileUploader.jsx
// Handles uploading images to Supabase Storage and returns the uploaded file URL.
// src/components/FileUploader/FileUploader.jsx
import React, { useState } from "react";
import styles from "./FileUploader.module.css";
import Button from "../Button/Button";

const FileUploader = ({ onUpload }) => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [preview, setPreview] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		// Create a preview
		const reader = new FileReader();
		reader.onload = () => {
			setPreview(reader.result);
		};
		reader.readAsDataURL(file);

		setSelectedFile(file);
		onUpload(file);
	};

	const clearSelection = () => {
		setSelectedFile(null);
		setPreview(null);
		onUpload(null);
	};

	return (
		<div className={styles.fileUploader}>
			<label className={styles.fileInputLabel}>
				<input
					type="file"
					accept="image/*"
					onChange={handleFileChange}
					className={styles.fileInput}
				/>
				<span className={styles.buttonText}>
					{selectedFile ? "Change Image" : "Select Image"}
				</span>
			</label>

			{selectedFile && (
				<div className={styles.previewContainer}>
					<div className={styles.previewInfo}>
						<span className={styles.fileName}>
							{selectedFile.name}
						</span>
						<Button
							onClick={clearSelection}
							variant="secondary"
							size="small"
						>
							Remove
						</Button>
					</div>
					{preview && (
						<img
							src={preview}
							alt="Preview"
							className={styles.imagePreview}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default FileUploader;
