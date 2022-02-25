import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
	return (
		<section className="landing">
			<div className="dark-overlay">
				<div className="landing-inner">
					<h1 className="x-large">Developer Connector</h1>
					<p className="lead">
						Create Developer Profile/Portfolio. Share posts and view
						other Developers
					</p>
					<div className="buttons">
						<div className="button">
							<Link to="/register" className="btn btn-primary">
								Register
							</Link>
						</div>
						<div className="button">
							<Link to="/login" className="btn btn-light">
								Log In
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Landing;
