import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";

const Register = ({ setAlert }) => {
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
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.password !== formData.password2) {
			setAlert("Passwords do not match", "danger");
		} else {
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
				<Link to="/login">Log In</Link>
			</p>
		</>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Register);
