// src/components/VideoPlayer/VideoPlayer.jsx

import React, { useState } from "react";
import styles from "./VideoPlayer.module.css";

const VideoPlayer = ({ url }) => {
	const [error, setError] = useState(false);

	// Function to check if the URL is from YouTube
	const isYouTubeUrl = (url) => {
		return url.includes("youtube.com") || url.includes("youtu.be");
	};

	// Function to get YouTube embed URL
	const getYouTubeEmbedUrl = (url) => {
		let videoId = "";

		if (url.includes("youtube.com/watch")) {
			// Handle youtube.com/watch URLs
			const urlParams = new URLSearchParams(new URL(url).search);
			videoId = urlParams.get("v");
		} else if (url.includes("youtu.be/")) {
			// Handle youtu.be URLs
			videoId = url.split("youtu.be/")[1].split("?")[0];
		}

		return `https://www.youtube.com/embed/${videoId}`;
	};

	// Function to handle video error
	const handleError = () => {
		setError(true);
	};

	// If URL is empty, return null
	if (!url) return null;

	// Handle YouTube videos
	if (isYouTubeUrl(url)) {
		try {
			const embedUrl = getYouTubeEmbedUrl(url);
			return (
				<div className={styles.videoContainer}>
					<iframe
						className={styles.videoFrame}
						src={embedUrl}
						frameBorder="0"
						allowFullScreen
						title="Embedded YouTube video"
					></iframe>
				</div>
			);
		} catch (err) {
			return (
				<div className={styles.videoError}>
					Unable to load YouTube video. Please check the URL.
				</div>
			);
		}
	}

	// Handle direct video URLs
	return (
		<div className={styles.videoContainer}>
			{error ? (
				<div className={styles.videoError}>
					Video could not be loaded. The URL may be invalid or the
					video format is not supported.
				</div>
			) : (
				<video className={styles.video} controls onError={handleError}>
					<source src={url} type="video/mp4" />
					<source src={url} type="video/webm" />
					<source src={url} type="video/ogg" />
					Your browser does not support the video tag.
				</video>
			)}
		</div>
	);
};

export default VideoPlayer;
