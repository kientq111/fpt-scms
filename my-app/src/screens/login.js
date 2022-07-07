import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button, Checkbox, Card,Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Row, Col } from 'antd';
import { login } from '../actions/userActions';
import Loader from '../components/Loader';
import styled from 'styled-components';
const LoginScreen = () => {
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const dispatch = useDispatch();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        dispatch(login(values.username, values.password));
    };
    const navigate = useNavigate();
    useEffect(() => {
        if (userInfo) {
            if (userInfo.id) {
                console.log(userInfo.id);
                navigate('/admin/listuser')
            }
            else
                console.log(userInfo);
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
                {error && <h1 style={{ color: 'red' }}>{error}</h1>}


                <div className="site-card-border-less-wrapper">
                    <Card
                        title="LOGIN"
                        bordered={false}
                        style={{

                        }}
                    >
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
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
                                    type="password"
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
                                <Space size={"middle"}>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Log in
                                    </Button>
                                    {loading && <Loader />}
                                </Space>

                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </Col>
            <Col span={8}></Col>
        </Row>
    );
};

export default LoginScreen;