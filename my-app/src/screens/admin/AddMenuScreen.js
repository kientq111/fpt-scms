import {
    Button,
    Form,
    Input,
    Row,
    Breadcrumb, Card, Divider, Space
} from 'antd';
import Loader from '../../components/Loader';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { listDishes } from '../../actions/dishAction';
import Select from 'react-select';
import { addMenu } from '../../actions/menuAction';
import { menuConstants } from '../../constants/Constants';

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
    const addMenuSelector = useSelector((state) => state.menuAdd);
    const addMenuSuccess = addMenuSelector.success
    const addMenuLoading = addMenuSelector.loading
    const addMenuInfo = addMenuSelector.menus
    const { loading, dishes } = getListDishSelector;
    const onFinish = (values) => {
        // console.log(values.dish);
        dispatch(addMenu(values.menu, values.description, values.dish))
    };


    useEffect(() => {
        if (addMenuSelector) {
            dispatch({
                type: menuConstants.MENU_ADD_RESET,
            })
        }
        dispatch(listDishes(1))
    }, [])




    if (loading === false) {
        listDishOption = dishes;
    }

    return (
        <Row>

            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    Add Menu
                </Breadcrumb.Item>
            </Breadcrumb>

            <Card
                style={{ marginTop: 30, width: 1100, height: 'auto', borderRadius: 25 }}
            >    <Divider plain><h1 style={{ margin: 20, fontSize: 30, position: 'relative' }}>Add Menu</h1></Divider>

                {(() => {
                    if (addMenuLoading === false) {
                        if (addMenuInfo.success === false) {
                            return (
                                <h2 style={{ color: 'red', fontSize: 15, position: 'relative', left: 400, bottom: -35 }}>{addMenuInfo.data.message}</h2>
                            )
                        } else {
                            return (
                                <h2 style={{ color: 'green', fontSize: 15, position: 'relative', left: 400, bottom: -35 }}>ADD MENU SUCCESSFUL</h2>
                            )
                        }

                    }
                })()}
                <Form style={{ marginTop: 50, marginRight: 250, }}
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
                        <Input.TextArea showCount maxLength={300} style={{ height: 150 }} />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Space size={'middle'}>
                            {addMenuLoading && <Loader />}
                            <Button type="primary" htmlType="submit">
                                Add menu
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>

            </Card>


        </Row >
    );
};

export default AddMenuScreen;