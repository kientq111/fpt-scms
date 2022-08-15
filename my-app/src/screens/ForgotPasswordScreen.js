import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button, Checkbox, Card, Space, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate, Link } from "react-router-dom";
import { Row, Col } from 'antd';
import Loader from '../components/Loader';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
const ForgotPasswordScreen = () => {
    const [loading, setLoading] = useState(false);
    const onFinish = (values) => {
        setLoading(true)
        axios.post(`/forgotPasword?email=${values.email}&fullName=${values.name}`, {})
            .then(res => {
                setLoading(false);
                console.log(res);
                if (res.data.success === false) {
                    message.error(`"User not exist with email"`, 10)
                } else {
                    message.info(`Email send successful!, Please Check your mail to get new password`, 10)
                }

            })
            .catch(error => console.log(error));
    };


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
                        <Divider plain><h2>FORGOT PASSWORD</h2></Divider>
                        <Form
                            name="normal_login"
                            onFinish={onFinish}
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}
                            >
                                <Input prefix={<MailOutlined className="site-form-item-icon" />} size="large" placeholder="Type your email here to get new password" />
                            </Form.Item>
                            <Form.Item
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} size="large" placeholder="Type your full name here" />
                            </Form.Item>
                            <Form.Item>
                                <Link className="login-form-forgot" to={'/'}>
                                    <b>
                                        Back to Login Page
                                    </b>

                                </Link>
                            </Form.Item>

                            <Form.Item>
                                <Space size={"middle"}>
                                    <Button type="primary" htmlType="submit" className="login-form-button" >
                                        Get new password
                                    </Button>
                                    {loading && <Loader />}
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

export default ForgotPasswordScreen;