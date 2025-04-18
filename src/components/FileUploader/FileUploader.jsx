// FileUploader.jsx
// Handles uploading images to Supabase Storage and returns the uploaded file URL.
import React from "react";
import styles from "./FileUploader.module.css";

const FileUploader = ({ onUpload }) => {
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			// Call onUpload with the selected file
			onUpload(file);
		}
	};

	return (
		<div className={styles.fileUploader}>
			<input type="file" accept="image/*" onChange={handleFileChange} />
		</div>
	);
};

export default FileUploader;
