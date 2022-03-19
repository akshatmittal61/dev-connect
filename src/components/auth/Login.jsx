import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
	const navigate = useNavigate();
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
	const { email, password } = formData;
	const handleSubmit = async (e) => {
		e.preventDefault();
		login(email, password);
	};
	useEffect(() => {
		if (isAuthenticated) {
			navigate("/dashboard");
		}
	}, []);
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
			<p className="my-1">
				Don't have an account?
				<Link to="/register">Sign Up</Link>
			</p>
		</>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.authentication.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
