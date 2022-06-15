import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Select, Modal, Upload } from 'antd';
import React, { useState } from 'react';
const { Option } = Select;


//Base64 to handle upload image
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });


const AddDishScreen = () => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState('');

    const handleCancel = () => setPreviewVisible(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

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
                                <Form.Item
                                    {...restField}
                                    name={[name, 'image']}

                                >
                                    <>
                                        <Upload
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            listType="picture-card"
                                            onPreview={handlePreview}
                                            onChange={handleChange}
                                        >
                                            {fileList.length >= 3 ? null : uploadButton}
                                        </Upload>
                                        <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                                            <img
                                                alt="example"
                                                style={{
                                                    width: '100%',
                                                }}
                                                src={previewImage}
                                            />
                                        </Modal>
                                    </>
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