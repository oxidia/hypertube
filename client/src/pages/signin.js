import React from "react"
import "./formslayout.css";
import SignInForm from "../components/signinform"
import Logo from "../components/image";

export default () => {
	return (
		<div className="form-background">
			<div className="form-group">
				<Logo className="img" size="Medium" />
				<div className="form-controls">
					<SignInForm />
				</div>
			</div>
		</div>
	);
}
