import React, { useState, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../actions/userActions';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Button, Divider
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

const EditUserScreen = () => {
    const [form] = Form.useForm();
    //useLocation to get state from previous screen
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //get data from store
    const userUpdateSelector = useSelector((state) => state.userUpdate)
    const { success, loading } = userUpdateSelector;
    //Submit edit form to action
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        const phoneNumber = `${values.prefix}${values.phone}`;
        const address = {
            street: values.street,
            district: values.district,
            city: values.city,
            country: values.country,
        }
        dispatch(updateUser(location.state.id, values.username, values.email, values.dob, values.first_name, values.last_name, phoneNumber, address, values.gender));
        if (location.state.history === '/admin/liststaff') {
            navigate('/admin/liststaff')
        } else {
            navigate('/admin/listuser')
        }
    };

    useEffect(() => {
        form.setFieldsValue({
            first_name: location.state.firstname,
            last_name: location.state.lastname,
            username: location.state.username,
            email: location.state.email,
            dob: '2022-03-03',
            country: location.state.country,
            city: location.state.city,
            district: location.state.district,
            street: location.state.street,
            phone: location.state.phone,
            gender: 'Male'
        })
        console.log('phone: ', location.state.phone);

    }, [])


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
            <div>{location.state.uid}</div>
            <Col flex="1 1 200px">
                <Divider plain>     <h1 style={{ margin: 20, fontSize: 30 }}>Edit User</h1></Divider>

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
                        <Input readOnly />
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
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
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
                            Update Account
                        </Button>
                        {loading && <Loader />}
                    </Form.Item>
                </Form></Col>
            <Col flex="0 1 500px"></Col>
        </Row>

    );
};

export default EditUserScreen;