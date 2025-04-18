// PostCard.jsx
// Displays a single post in the feed: title, upvotes, creation time, and click to view details.
import React from "react";
import { formatDate } from "../../utils/formatDate";
import styles from "./PostCard.module.css";

const PostCard = ({ post, onClick }) => {
	return (
		<div
			className={styles.postCard}
			onClick={onClick}
			tabIndex={0}
			role="button"
		>
			<div className={styles.header}>
				<span className={styles.time}>
					Posted {formatDate(post.created_at)}
				</span>
				<span className={styles.upvotes}>{post.upvotes} upvotes</span>
			</div>
			<h3 className={styles.title}>{post.title}</h3>
			{post.flags && post.flags.length > 0 && (
				<div className={styles.flags}>
					{post.flags.map((flag) => (
						<span key={flag} className={styles.flag}>
							{flag}
						</span>
					))}
				</div>
			)}
		</div>
	);
};

export default PostCard;
