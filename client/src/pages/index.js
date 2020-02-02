import React from "react"
import { Link } from "gatsby"
import "./index.css"
import { Button } from 'antd'
import Logo from "../components/image"

export default () => <div className="container">
	<div className="main">
		<div className="centered">
			<Logo className="img" size="Large" />
			<div className="btns">
				<Link to="/signup">
					<Button type="primary" size="large">Sign Up</Button>
				</Link>
				<Link to="/signin">
    				<Button size="large">Sign In</Button>
				</Link>
			</div>
		</div>
	</div>
</div>
