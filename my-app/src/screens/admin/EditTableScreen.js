import {
    Button,
    Form,
    Input,
    Row,
    Select, Breadcrumb, Card, Divider, Space
} from 'antd';
import Loader from '../../components/Loader';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addCategory } from '../../actions/categoryAction';
import { useLocation, useNavigate } from 'react-router-dom';
import { addTable, editTable } from '../../actions/tableAction';

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
const EditTableScreen = () => {
    const tableData = useSelector((state) => state.tableEdit);
    const dispatch = useDispatch()
    const { loading, error, table, success } = tableData;
    const [form] = Form.useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const onFinish = (values) => {
        dispatch(editTable(location.state.id, location.state.tableNumber, values.description, 1,
            location.state.status, location.state.type, location.state.createdDate, location.state.createdBy));
    };


    useEffect(() => {
        console.log(location.state.createdBy)
        form.setFieldsValue({
            tableNumber: location.state.tableNumber,
            description: location.state.description,
        })
    }, [])


    useEffect(() => {
        if (success === true) {
            navigate('/admin/listtable');
        }
    }, [success])

    return (
        <Row>

            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="" >Update Table</a>
                </Breadcrumb.Item>

            </Breadcrumb>


            <Card
                style={{ marginTop: 30, width: 1100, height: 700, borderRadius: 25 }}
            >    <Divider plain><h1 style={{ margin: 20, fontSize: 30, position: 'relative' }}>UPDATE TABLE</h1></Divider>
            
                <Form style={{ marginTop: 50, marginRight: 100 }}
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="tableNumber"
                        label="Table Number"
                    >
                        <Input readOnly disabled />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input description',
                            },
                        ]}
                    >
                        <Input.TextArea showCount maxLength={1000} style={{ height: 200 }} />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Space size={'middle'}>
                            {loading && <Loader />}
                            <Button type="primary" htmlType="submit">
                                Update Table
                            </Button>
                            <Button onClick={() => window.history.back()}>
                                Cancel
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>

            </Card>


        </Row >
    );
};

export default EditTableScreen;