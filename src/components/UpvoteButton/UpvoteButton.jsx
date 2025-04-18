// UpvoteButton.jsx
// Button to upvote a post, displays current upvote count.
import React from "react";
import styles from "./UpvoteButton.module.css";

const UpvoteButton = ({ count, onUpvote, disabled }) => {
	return (
		<button
			className={styles.upvoteButton}
			onClick={onUpvote}
			disabled={disabled}
			title="Upvote"
		>
			<span role="img" aria-label="upvote">
				👍
			</span>
			{count} upvotes
		</button>
	);
};

export default UpvoteButton;
