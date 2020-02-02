import React, { useState } from "react";
import "./forms.css";
import { Form, Input, Button } from 'antd';
import { Link } from 'gatsby';

const styleOutline = {
	border: '0',
	outline: 'none'
};

const SignInForm = (props) => {
	let [pwd, setType] = useState(false);
	let [username, setUsername] = useState("");

	const handleUsernameSubmit = e => {
		e.preventDefault();
		username && setType(true);
	};

	const handlePasswordSubmit = e => {
		e.preventDefault();
		setType(false);
	};

	const handleUsernameChange = e => {
		e.preventDefault();
		console.log(username);
		setUsername(e.target.value);
	}

	const { getFieldDecorator } = props.form;

	return (
		<Form onSubmit={pwd ? handlePasswordSubmit : handleUsernameSubmit } className="login-form">
			<h2 id="my-h2">SIGN IN</h2>
			{pwd ? <div className="user-badge"><span>{ username }</span></div> : <div className="empty" />}
			{pwd ?
				<Form.Item>
					{getFieldDecorator("pwd", {
						rules: [
							{ required: true, message: "Please enter your Password!" }
						]
					})(
						<Input
							type="password"
							placeholder="Password"
							style={ styleOutline }
						/>
					)}
				</Form.Item>
				: <Form.Item>
					{getFieldDecorator("username", {
						rules: [{ required: true, message: "Please enter your Username!" }]
					})(
						<Input
							placeholder="Username"
							style={ styleOutline }
							value={ username }
							onChange={ handleUsernameChange }
						/>
					)}
				</Form.Item>
			}
			<Form.Item>
				{pwd ?
					<Link className="login-form-forgot" to="/">
						Forgot Password ?
					</Link>
					: <Link className="login-form-forgot" to="/signup">
						Sign Up ?
					</Link>
				}
				<Button type="primary" htmlType="submit" className="login-form-button">
					{pwd ?
					"SIGN IN"
					: "NEXT"}
				</Button>
			</Form.Item>
		</Form>
	);
}

export default Form.create({ name: "login" })(
    SignInForm
);
