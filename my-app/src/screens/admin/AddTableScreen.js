import {
    Button,
    Form,
    Input,
    Row,
    Select, Breadcrumb, Card, Divider
} from 'antd';
import Loader from '../../components/Loader';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addCategory } from '../../actions/categoryAction';
import { addTable } from '../../actions/tableAction';

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
const AddTableScreen = () => {
    const tableData = useSelector((state) => state.tableAdd);
    const dispatch = useDispatch()
    const { loading, error, table } = tableData;
    const [form] = Form.useForm();

    const onFinish = (values) => {
        dispatch(addTable(values.tableName, values.description));
    };


    useEffect(() => {
        console.log(table);

    }, [])

    return (
        <Row>

            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="" >Add Table</a>
                </Breadcrumb.Item>

            </Breadcrumb>


            <Card
                style={{ marginTop: 30, width: 1100, height: 700, borderRadius: 25 }}
            >    <Divider plain><h1 style={{ margin: 20, fontSize: 30, position: 'relative' }}>ADD TABLE</h1></Divider>
                {error && <h1 style={{ color: 'red', fontSize: 20 }}>{error}</h1>}
                {(() => {
                    if (loading === false) {
                        if (table.success === false) {
                            return (
                                <h2 style={{ color: 'red', fontSize: 15, position: 'relative', left: 400, bottom: -35 }}>{table.data}</h2>
                            )
                        } else if (table.success === true) {
                            return (
                                <h2 style={{ color: 'green', fontSize: 15, position: 'relative', left: 400, bottom: -35 }}>ADD TABLE SUCCESSFUL</h2>
                            )
                        }

                    }
                })()}
                <Form style={{ marginTop: 50, marginRight: 100 }}
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}

                    scrollToFirstError
                >


                    <Form.Item
                        name="tableName"
                        label="Table Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Table name!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
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
                        <Input.TextArea showCount maxLength={100} />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        {loading && <Loader />}
                        <Button type="primary" htmlType="submit">
                            Add Table
                        </Button>
                    </Form.Item>
                </Form>

            </Card>


        </Row >
    );
};

export default AddTableScreen;