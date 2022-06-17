import React, { useState } from 'react';
import {
    Form,
    Input,
    InputNumber,
    Select,
    Row,
    Col,
    Button,
    DatePicker, Avatar
} from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
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

const ViewUserDetailScreen = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };


    return (
        <Row>
            <Col flex="1 1 200px">
                <h1 style={{ margin: 20, fontSize: 30 }}>User Detail</h1>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    {/* <Form.Item
                        name="avatar"
                    >
                        <Avatar
                            size={{
                                xs: 34,
                                sm: 42,
                                md: 50,
                                lg: 74,
                                xl: 90,
                                xxl: 120,
                            }}
                            // style={{position:'relative', left:600}}
                            icon={<AntDesignOutlined />}
                        />
                    </Form.Item> */}

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
                        name="user_name"
                        label="User Name"
                    >
                        <Input readOnly />
                    </Form.Item>

                    <Form.Item name="date-picker" label="Date of Birth"  >
                        <Input readOnly />
                    </Form.Item>


                    <Form.Item
                        name="phone"
                        label="Phone Number"
                    >
                        <Input readOnly />
                        
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="address"
                    >
                        <Input readOnly />
                        
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Gender"
                    >
                        <Input readOnly />
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

export default ViewUserDetailScreen;