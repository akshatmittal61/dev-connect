import React from "react";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";

const App = () => {
	const location = useLocation();
	return (
		<>
			<Navbar />
			{location.pathname !== "/" ? (
				<section className="container">
					<Alert />
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Routes>
				</section>
			) : (
				<>
					<Alert />
					<Routes>
						<Route path="/" element={<Landing />} />
					</Routes>
				</>
			)}
		</>
	);
};

export default App;
