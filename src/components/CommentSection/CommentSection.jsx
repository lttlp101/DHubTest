// CommentSection.jsx
// Displays comments for a post and allows adding/deleting comments.
import React from "react";
import styles from "./CommentSection.module.css";

const CommentSection = ({
	comments,
	onAdd,
	onDelete,
	commentText,
	setCommentText,
	userId,
}) => {
	return (
		<div className={styles.commentSection}>
			<div>
				{comments && comments.length > 0 ? (
					comments.map((comment) => (
						<div key={comment.id} className={styles.comment}>
							<div>
								<strong>
									{comment.author_name || "Anonymous"}
								</strong>
								: {comment.content}
							</div>
							{onDelete && (
								<button
									className={styles.deleteBtn}
									onClick={() => onDelete(comment.id)}
									title="Delete comment"
								>
									🗑️
								</button>
							)}
						</div>
					))
				) : (
					<div>No comments yet.</div>
				)}
			</div>
			<div className={styles.addComment}>
				<input
					type="text"
					placeholder="Leave a comment..."
					value={commentText || ""}
					onChange={(e) =>
						setCommentText && setCommentText(e.target.value)
					}
					onKeyDown={(e) => {
						if (e.key === "Enter" && onAdd) onAdd();
					}}
				/>
				<button
					onClick={onAdd}
					disabled={!commentText || !commentText.trim()}
				>
					Add
				</button>
			</div>
		</div>
	);
};

export default CommentSection;
