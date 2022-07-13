import {
    Button,
    Form,
    Input,
    Row,
    Breadcrumb, Card, Divider
} from 'antd';
import Loader from '../../components/Loader';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { listDishes } from '../../actions/dishAction';
import Select from 'react-select';
import { addMenu } from '../../actions/menuAction';

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
const AddMenuScreen = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();


    let listDishOption = [];
    const getListDishSelector = useSelector((state) => state.dishList);
    const { loading, dishes } = getListDishSelector;
    const onFinish = (values) => {
        console.log(values);
        dispatch(addMenu(values.menu, values.description, values.dish))
    };


    useEffect(() => {
        dispatch(listDishes())
    }, [])


    if (loading === false) {
        listDishOption = dishes;
    }

    return (
        <Row>

            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="" >Add Menu</a>
                </Breadcrumb.Item>
            </Breadcrumb>

            <Card
                style={{ marginTop: 30, width: 1100, height: 700 }}
            >    <Divider plain><h1 style={{ margin: 20, fontSize: 30, position: 'relative' }}>Add Menu</h1></Divider>

                <Form style={{ marginTop: 50, marginRight: 250 }}
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="menu"
                        label="Menu Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input menu name!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="dish"
                        label="dish"
                    >
                        <Select
                            getOptionLabel={option => option.dishName}
                            getOptionValue={option => option.id}
                            options={listDishOption}
                            isMulti
                        />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="menu description"
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
                        <Button type="primary" htmlType="submit">
                            Add menu
                        </Button>
                    </Form.Item>
                </Form>

            </Card>


        </Row >
    );
};

export default AddMenuScreen;