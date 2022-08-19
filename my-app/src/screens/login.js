import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button, Checkbox, Card, Space, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from "react-router-dom";
import { Row, Col } from 'antd';
import { checkAccount, login } from '../actions/userActions';
import Loader from '../components/Loader';
import styled from 'styled-components';
import { useState } from 'react';
const LoginScreen = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [message, SetMessage] = useState();
    const userLogin = useSelector((state) => state.userLogin)
    const userCheckAccountSelector = useSelector((state) => state.userCheckAcc)
    const userCheckAccountLoading = userCheckAccountSelector.loading;
    const userCheckAccountError = userCheckAccountSelector.error;
    const userCheckAccountData = userCheckAccountSelector.userCheckAccount;
    const { loading, error, userInfo } = userLogin

    const dispatch = useDispatch();

    const onFinish = (values) => {
        setUsername(values.username)
        setPassword(values.password)

        // dispatch(login(values.username, values.password));
        dispatch(checkAccount(values.username));
    };
    const navigate = useNavigate();

    useEffect(() => {
        if (userCheckAccountLoading === false) {
            if (userCheckAccountData.success === true) {
                if (userCheckAccountData.data.role[0].name == "USER") {
                    SetMessage("You are not permission");
                } else if (userCheckAccountData.data.status !== "1") {
                    console.log(userCheckAccountData.data.status);
                    SetMessage("This account is blocking")
                } else if (userCheckAccountData.data.is_active !== true) {
                    SetMessage("This Account is not verify email")
                }
                else {
                    console.log('login nek', username, password);
                    dispatch(login(username, password));
                }
            } else {
                SetMessage("Account not existed");
            }
        }
    }, [userCheckAccountData])

    useEffect(() => {
        console.log({ userInfo });
        if (userInfo !== undefined) {
            if (userInfo === null) {
                SetMessage("Password Fail");
            } else {
                if (userInfo.role[0].authority == "ROLE_ADMIN") {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/admin/listorder');
                }

            }
        }
    }, [userInfo])

    return (
        <Row>
            <Col span={8}></Col>
            <Col span={8}>
                <h1 style={{
                    fontSize: 30,
                    marginTop: 150
                }}></h1>

                <div className="site-card-border-less-wrapper">
                    <Card
                        size="large"
                        bordered={false}
                        style={{ backgroundColor: 'rgba(236, 205, 170)', borderRadius: 25 }}
                    >
                        <Divider plain><h1>Login</h1></Divider>
                        <Form
                            name="normal_login"
                            onFinish={onFinish}
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
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
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} size="large" placeholder="Username" />
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
                                <Input size="large"
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <Link className="login-form-forgot" to={'/forgotpassword'}>
                                    Forgot password
                                </Link>
                            </Form.Item>
                            {userCheckAccountError && <h6 style={{ color: 'red' }}>{userCheckAccountError}</h6>}
                            <h6 style={{ color: 'red' }}>{message}</h6>
                            <Form.Item>
                                <Space size={"middle"}>
                                    <Button type="primary" htmlType="submit" className="login-form-button" >
                                        Log in
                                    </Button>
                                    {loading && <Loader />}
                                    {userCheckAccountLoading && <Loader />}
                                </Space>

                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </Col>
            <Col span={8}></Col>
        </Row >
    );
};

export default LoginScreen;