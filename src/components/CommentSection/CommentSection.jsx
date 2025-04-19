// src/components/CommentSection/CommentSection.jsx
// Displays comments for a post and allows adding/deleting comments.

import React from "react";
import Button from "../Button/Button";
import { isContentOwner } from "../../services/anonymousUser";
import styles from "./CommentSection.module.css";

const CommentSection = ({
	comments,
	onAdd,
	onDelete,
	commentText,
	setCommentText,
	currentUserId,
}) => {
	return (
		<div className={styles.commentSection}>
			<h3>Comments</h3>
			<div className={styles.commentsList}>
				{comments && comments.length > 0 ? (
					comments.map((comment) => (
						<div key={comment.id} className={styles.comment}>
							<div className={styles.commentHeader}>
								<strong className={styles.commentAuthor}>
									{comment.author_name || "Anonymous"}
								</strong>
								{comment.created_at && (
									<span className={styles.commentTime}>
										{new Date(
											comment.created_at
										).toLocaleString()}
									</span>
								)}
							</div>
							<div className={styles.commentContent}>
								{comment.content}
							</div>
							{isContentOwner(comment.author_id) && (
								<Button
									className={styles.deleteBtn}
									onClick={() => onDelete(comment.id)}
									title="Delete comment"
									variant="danger"
									size="small"
								>
									Delete
								</Button>
							)}
						</div>
					))
				) : (
					<div className={styles.noComments}>No comments yet.</div>
				)}
			</div>
			<div className={styles.addComment}>
				<textarea
					className={styles.commentInput}
					placeholder="Leave a comment..."
					value={commentText || ""}
					onChange={(e) =>
						setCommentText && setCommentText(e.target.value)
					}
					rows={3}
				></textarea>
				<Button
					onClick={onAdd}
					disabled={!commentText || !commentText.trim()}
					variant="primary"
					className={styles.submitCommentButton}
				>
					Add Comment
				</Button>
			</div>
		</div>
	);
};

export default CommentSection;
