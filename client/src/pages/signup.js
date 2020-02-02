import React from "react"
import "./formslayout.css"
import SignUpForm from "../components/signupform"
import Logo from "../components/image"

export default () => {
	return(
		<div className="form-background">
			<div className="form-group" style={ { position: "relative", margin: "42px auto", height: "auto" } }>
				<Logo className="img" size="Medium" />
				<div className="form-controls" style={ { marginTop: "42px" } }>
					<SignUpForm />
				</div>
			</div>
		</div>
	);
}
