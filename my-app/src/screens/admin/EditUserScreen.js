import {
    Button, Modal, Form,
    Input,
    Row,
    Col,
} from 'antd';
import { useState } from 'react';


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

const onFinish = (values) => {
    console.log('Received values of form: ', values);
};


const EditUserScreen = () => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Edit User
            </Button>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Row>
                    <Col flex="1 1 200px">
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
                            >
                                <Input   />
                            </Form.Item>

                            <Form.Item
                                name="first_name"
                                label="First Name"

                            >
                                <Input   />
                            </Form.Item>

                            <Form.Item
                                name="user_name"
                                label="User Name"
                            >
                                <Input   />
                            </Form.Item>

                            <Form.Item name="date-picker" label="Date of Birth"  >
                                <Input   />
                            </Form.Item>


                            <Form.Item
                                name="phone"
                                label="Phone Number"
                            >
                                <Input   />

                            </Form.Item>

                            <Form.Item
                                name="address"
                                label="address"
                            >
                                <Input   />

                            </Form.Item>
                            <Form.Item
                                name="gender"
                                label="Gender"
                            >
                                <Input   />
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">
                                    Update Profile
                                </Button>
                            </Form.Item>
                        </Form></Col>
                    <Col flex="0 1 500px"></Col>
                </Row>
            </Modal>
        </>
    );
};

export default EditUserScreen;
