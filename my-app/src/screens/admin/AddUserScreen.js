import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Button,
} from 'antd';
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
// iter2: if add success => redirect success screen
const AddUserScreen = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    //get data from store
    const userAdd = useSelector((state) => state.userRegister)
    const { userInfo } = userAdd;
    //Submit register form to action
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        const phoneNumber = `${values.prefix}${values.phone}`;
        const address = {
            street: values.street,
            district: values.district,
            city: values.city,
            country: values.country,
        }
        dispatch(register(values.username, values.email, values.password, values.dob, values.first_name, values.last_name, phoneNumber, address));
    };

    useEffect(() => {
        if (userInfo) {
            console.log(userInfo.message);
        }
    }, [userInfo])

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="84">+84</Option>
                <Option value="85">+85</Option>
            </Select>
        </Form.Item>
    );
    return (
        <Row>
            <Col flex="1 1 200px">
                <h1 style={{ margin: 20, fontSize: 30 }}>Add User</h1>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="email"
                        label="E-mail"

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
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="first_name"
                        label="First Name"
                        tooltip="What do you want others to call you?"

                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item


                        name="last_name"
                        label="Last Name"
                        rules={[
                            {
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"

                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
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


                    <Form.Item
                        name="username"
                        label="User Name"
                        tooltip="user name used to login to your account"

                        rules={[
                            {
                                required: true,
                                message: 'Please input your user name!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="dob" label="Date of Birth" rules={[
                        {
                            required: true,
                            message: 'Input your birthday!',
                            whitespace: true,
                        },
                    ]} >
                        <input type='date' />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                                message: 'Please select gender!',
                            },
                        ]}
                    >
                        <Select placeholder="select your gender" style={{ width: 200 }}>
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="country"
                        label="Country"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your country!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item layout="inline"
                        name="city"
                        label="City"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your city!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="district"
                        label="District"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your district!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="street"
                        label="Street"
                        Size="small "
                        rules={[
                            {
                                required: true,
                                message: 'Please input your street!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input Size="small" />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input
                            addonBefore={prefixSelector}
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Add Account
                        </Button>
                    </Form.Item>
                </Form></Col>
            <Col flex="0 1 500px"></Col>
        </Row>

    );
};

export default AddUserScreen;