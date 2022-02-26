import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
		const newUser = {
			name: formData.name,
			email: formData.email,
			password: formData.password,
		};
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const body = JSON.stringify(newUser);
			const res = await axios.post("/api/users", body, config);
			console.log(res.data);
		} catch (err) {
			console.error(err.response.data);
		}
		setFormData({
			name: "",
			email: "",
			password: "",
			password2: "",
		});
	};
	return (
		<>
			<h1 className="large text-primary">Sign In</h1>
			<p className="lead">
				<span className="material-icons">account_circle</span>
				Log In to Your account
			</p>
			<form onSubmit={handleSubmit} className="form">
				<div className="form-group">
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Email Address"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						name="password"
						id="password"
						minLength="6"
						placeholder="Password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Login
				</button>
			</form>
			<p class="my-1">
				Don't have an account?
				<Link to="/register">Sign Up</Link>
			</p>
		</>
	);
};

export default Login;
