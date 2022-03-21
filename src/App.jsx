import React, { useEffect } from "react";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import { loadUser } from "./actions/auth";
import store from "./store.js";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/Routing/PrivateRoute";

const App = () => {
	const location = useLocation();
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<>
			<Navbar />
			{location.pathname !== "/" ? (
				<section className="container">
					<Alert />
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<>
							<Route
								path="/dashboard"
								element={
									<PrivateRoute>
										<Dashboard />
									</PrivateRoute>
								}
							/>
						</>
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
