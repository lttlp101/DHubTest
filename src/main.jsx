// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { getOrCreateAnonymousUser } from "./utils/anonymousUser";
import { applyTheme } from "./utils/themeUtils";

// On app launch, ensure anonymous user exists
getOrCreateAnonymousUser().catch((err) => {
	console.error("Anonymous user setup failed:", err);
});

// On app launch, apply saved or default theme
const savedTheme = localStorage.getItem("diablohub_theme") || "diablo";
applyTheme(savedTheme);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
