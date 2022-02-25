import React, { useState } from "react";

const Register = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (formData.password !== formData.password2)
			console.log("Passwords do not match");
		else console.log(formData);
		setFormData({
			name: "",
			email: "",
			password: "",
			password2: "",
		});
	};
	return (
		<>
			<h1 className="large text-primary">Sign Up</h1>
			<p className="lead">
				<span className="material-icons">account_circle</span>
				Create Your account
			</p>
			<form onSubmit={handleSubmit} className="form">
				<div className="form-group">
					<input
						type="text"
						name="name"
						id="name"
						placeholder="Name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</div>
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
					<small className="form-text">
						This site uses gravatar, so if you want a image use a
						gravatar email
					</small>
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
				<div className="form-group">
					<input
						type="password"
						name="password2"
						id="password2"
						minLength="6"
						placeholder="Confirm Password"
						value={formData.password2}
						onChange={handleChange}
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Register
				</button>
			</form>
			<p className="my-1">
				Already have an account?
				<a href="login.html">Log In</a>
			</p>
		</>
	);
};

export default Register;
