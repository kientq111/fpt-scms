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
const ChangePasswordScreen = () => {
    const [loading, setLoading] = useState();
    const [message, setMessage] = useState();
    const [success, setSuccess] = useState();
    const userInfoSelector = useSelector((state) => state.userLogin)
    const { userInfo } = userInfoSelector;

    const onFinish = (values) => {
        setLoading(true)
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        }
        axios.post(`/changePassword?password=${values.password}&userId=${userInfo.id}`, {}, config)
            .then(res => {
                setLoading(false);

                console.log(res);
                if (res.data.success === false) {

                    setMessage(res.data.data)
                    setSuccess(false)
                } else {

                    setMessage(res.data.data)
                    setSuccess(true)
                }

            })
            .catch(error => {
                console.log(error)
            }
            );
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
                        style={{ borderRadius: 25 }}
                    >
                        <Divider plain><h2>CHANGE PASSWORD</h2></Divider>
                        <Form
                            name="normal_login"
                            onFinish={onFinish}
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                        >
                            <Form.Item
                                name="password"
                                label="New Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    {
                                        pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'),
                                        message: 'Password must contain at least one lowercase letter, uppercase letter, number, and special character'
                                    },
                                    {
                                        max: 12,
                                        message: 'Password not large than 12 word'
                                    }

                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="confirm"

                                label="Confirm Password"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            {loading === false && success === true && <h6 style={{ color: 'green' }}>{message}</h6>}
                            {loading === false && success === false && <h6 style={{ color: 'red' }}>{message}</h6>}

                            <Form.Item>
                                <Space size={"middle"}>
                                    <Button type="primary" htmlType="submit" className="login-form-button" >
                                        Change Password
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

export default ChangePasswordScreen;