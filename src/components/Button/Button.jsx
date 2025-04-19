// src/components/Button/Button.jsx
// Reusable button component that adapts to theme colors

import React from "react";
import styles from "./Button.module.css";

const Button = ({
	children,
	onClick,
	type = "button",
	variant = "primary",
	size = "medium",
	disabled = false,
	fullWidth = false,
	className,
	...props
}) => {
	const buttonClasses = [
		styles.button,
		styles[variant],
		styles[size],
		fullWidth ? styles.fullWidth : "",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<button
			type={type}
			className={buttonClasses}
			onClick={onClick}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
