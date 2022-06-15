import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Routes, Route, Link } from "react-router-dom";
import { Row, Col } from 'antd';
import { login } from '../actions/userActions';

const LoginScreen = () => {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    // const userLogin = useSelector((state) => state.userLogin)
    // const { loading, error, userInfo } = userLogin
    const dispatch = useDispatch();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(login(username, password));
    }
    
    return (
        <Row>
            <Col span={8}></Col>
            <Col span={8}>
                <h1 style={{
                    fontSize: 30
                }}>Login</h1>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onsubmit={onSubmitHandler}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input value={username} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password" value={password}
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="#">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="submit" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <Link to={'/register'}>register now!</Link>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={8}></Col>
        </Row>
    );
};

export default LoginScreen;