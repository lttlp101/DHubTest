// UpvoteButton.jsx
// Button to upvote a post, displays current upvote count.

import React from "react";
import Button from "../Button/Button";
import styles from "./UpvoteButton.module.css";

const UpvoteButton = ({ count, onUpvote, disabled }) => {
	return (
		<Button
			className={styles.upvoteButton}
			onClick={onUpvote}
			disabled={disabled}
			title="Upvote"
			variant="primary"
		>
			<span role="img" aria-label="upvote">
				👍
			</span>
			{count} upvotes
		</Button>
	);
};

export default UpvoteButton;
