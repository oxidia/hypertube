import React from "react"
import "./forms.css"
import { Form, Input, Button } from 'antd';
import { Link } from 'gatsby';

const styleOutline = {
	border: '0',
	outline: 'none'
};

const SignUpForm = (props) => {

    const { getFieldDecorator } = props.form;

	const handleSubmit = e => {
		e.preventDefault();
	};

	return(
        <Form onSubmit={handleSubmit} className="login-form">
            <h2 id="my-h2">SIGN UP</h2>
            <div className="empty" />
            <Form.Item>
                {getFieldDecorator("username", {
                    rules: [{ required: true, message: "Please enter your username!" }]
                })(
                    <Input
                        placeholder="Username"
                        style={ styleOutline }
                    />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator("firstName", {
                    rules: [{ required: true, message: "Please enter your First Name!" }]
                })(
                    <Input
                        placeholder="First Name"
                        style={ styleOutline }
                    />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator("lastName", {
                    rules: [{ required: true, message: "Please enter your Last Name!" }]
                })(
                    <Input
                        placeholder="Last Name"
                        style={ styleOutline }
                    />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator("email", {
                    rules: [{ required: true, message: "Please enter your Email Address!" }]
                })(
                    <Input
                        placeholder="Email Address"
                        style={ styleOutline }
                    />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator("pwd", {
                    rules: [{ required: true, message: "Please enter your Password!" }]
                })(
                    <Input
                        type="password"
                        placeholder="Password"
                        style={ styleOutline }
                    />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator("confirm_pwd", {
                    rules: [{ required: true, message: "Please confirm the password you entered!" }]
                })(
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        style={ styleOutline }
                    />
                )}
            </Form.Item>
            <Form.Item>
                <Link className="login-form-forgot" to="/signin">
                    Sign In ?
                </Link>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    SIGN UP
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Form.create({ name: "register" })(
    SignUpForm
);
