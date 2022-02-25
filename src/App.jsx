import React from "react";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

const App = () => {
	const location = useLocation();
	return (
		<>
			<Navbar />
			{location.pathname !== "/" ? (
				<section className="container">
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Routes>
				</section>
			) : (
				<Routes>
					<Route path="/" element={<Landing />} />
				</Routes>
			)}
		</>
	);
};

export default App;
