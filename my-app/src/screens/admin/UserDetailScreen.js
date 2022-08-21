import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Button, Divider, Card, Breadcrumb
} from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
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
const UserDetailScreen = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    //get data from store

    //Submit register form to action

    const onFinish = (values) => {

    };

    useEffect(() => {
        form.setFieldsValue({
            first_name: location.state.firstname,
            last_name: location.state.lastname,
            username: location.state.username,
            email: location.state.email,
            dob: moment(location.state.dob).format('DD-MM-YYYY'),
            country: location.state.country,
            city: location.state.city,
            district: location.state.district,
            street: location.state.street,
            phone: location.state.phone,
            gender: location.state.gender
        })
        console.log('phone: ', location.state.phone);
    }, []);

    return (
        <Row>

            <Breadcrumb style={{ marginTop: 10 }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">List Users</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">User Detail Profile</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card
                style={{
                    width: 900, height: 900, marginTop: 20, marginLeft: 100,
                }}
            >
                <Divider plain>     <h1 style={{ fontSize: 30 }}>User Detail Profile</h1></Divider>
                <Form style={{ marginRight: 150 }}
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="email"
                        label="E-mail"


                    >
                        <Input readOnly />
                    </Form.Item>

                    <Form.Item
                        name="first_name"
                        label="First Name"
                     


                    >
                        <Input readOnly />
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
                        <Input readOnly />
                    </Form.Item>



                    <Form.Item
                        name="username"
                        label="User Name"
                 

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
                        <Input readOnly />
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
                        <Input readOnly />
                    </Form.Item>

                    <Form.Item
                        name="country"
                        label="Country"

                    >
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item layout="inline"
                        name="city"
                        label="City"

                    >
                        <Input readOnly />
                    </Form.Item>

                    <Form.Item
                        name="district"
                        label="District"

                    >
                        <Input readOnly />
                    </Form.Item>

                    <Form.Item
                        name="street"
                        label="Street"
                        Size="small "

                    >
                        <Input readOnly />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone Number"

                    >
                        <Input readOnly />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button onClick={() => navigate('/admin/listuser')} type='primary'>Back</Button>
                    </Form.Item>
                </Form>
            </Card>


        </Row>

    );
};

export default UserDetailScreen;