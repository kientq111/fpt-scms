import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Select,  Modal, Upload } from 'antd';

import React from 'react';
const { Option } = Select;
const AddDishScreen = () => {
    const onFinish = (values) => {
        console.log('Received values of form:', values);
    };

    return (

        <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
            <h1 style={{ margin: 20, fontSize: 30 }}>Add Dish</h1>
            <Form.List name="users">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space
                                key={key}
                                style={{
                                    display: 'flex',
                                    marginBottom: 8,
                                }}
                                align="baseline"
                            >

                                <Form.Item
                                    {...restField}
                                    name={[name, 'last']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Missing Dish Name',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Dish Name" />
                                </Form.Item>

                                <Form.Item
                                    {...restField}
                                    name={[name, 'dish_Name']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Missing Description',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Description" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'image']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Missing image',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Image" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'price']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Missing Price',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Price" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'status']}
                                   >
                                    <Select
                                        defaultValue={'1'}
                                    >
                                        <Option value="1" >Active</Option>
                                        <Option value="0">Inactive</Option>
                                    </Select>
                                </Form.Item>

                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add field
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddDishScreen;