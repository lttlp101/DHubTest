// App.jsx
// Main app routing using React Router v6.4+ with Layout and lazy loading.
import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// Lazy load route components
const Home = lazy(() => import("./routes/Home/Home"));
const Post = lazy(() => import("./routes/Post/Post"));
const CreatePost = lazy(() => import("./routes/CreatePost/CreatePost"));
const EditPost = lazy(() => import("./routes/EditPost/EditPost"));
const Login = lazy(() => import("./routes/Login/Login"));
const Register = lazy(() => import("./routes/Register/Register"));
const NotFound = lazy(() => import("./routes/NotFound/NotFound"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "post/:id", element: <Post /> },
			{
				path: "create",
				element: (
					<ProtectedRoute>
						<CreatePost />
					</ProtectedRoute>
				),
			},
			{
				path: "edit/:id",
				element: (
					<ProtectedRoute>
						<EditPost />
					</ProtectedRoute>
				),
			},
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
