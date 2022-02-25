import React from "react";

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
							<a href="register.html" className="btn btn-primary">
								Register
							</a>
						</div>
						<div className="button">
							<a href="login.html" className="btn btn-light">
								Log In
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Landing;
