// App.jsx
// Main app routing using React Router v6.4+ with Layout and lazy loading.
import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

// Lazy load route components
const Home = lazy(() => import("./routes/Home"));
const Post = lazy(() => import("./routes/Post"));
const CreatePost = lazy(() => import("./routes/CreatePost"));
const EditPost = lazy(() => import("./routes/EditPost"));
const Login = lazy(() => import("./routes/Login"));
const Register = lazy(() => import("./routes/Register"));
const NotFound = lazy(() => import("./routes/NotFound"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "post/:id", element: <Post /> },
			{ path: "create", element: <CreatePost /> },
			{ path: "edit/:id", element: <EditPost /> },
			{ path: "login", element: <Login /> },
			{ path: "register", element: <Register /> },
			{ path: "*", element: <NotFound /> },
		],
	},
]);

const App = () => (
	<Suspense fallback={<LoadingSpinner />}>
		<RouterProvider router={router} />
	</Suspense>
);

export default App;
