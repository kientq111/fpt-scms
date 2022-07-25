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
import { addMenu, editMenu, getMenuById } from '../../actions/menuAction';
import { useLocation, useNavigate } from 'react-router-dom';

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
const EditMenuScreen = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();

    let oldDishInMenuIndex = [];


    let listDishOption = [];
    const getListDishSelector = useSelector((state) => state.dishList);
    const getMenuByIdSelector = useSelector((state) => state.menuGetById);
    const menuEditSelector = useSelector((state) => state.menuEdit);

    const menuLoading = getMenuByIdSelector.loading;
    const menuInfo = getMenuByIdSelector.menu;
    const menuEditSuccess = menuEditSelector.success;
    const menuEditLoading = menuEditSelector.loading;
    const { loading, dishes } = getListDishSelector;


    const onFinish = (values) => {
        console.log(values);

        dispatch(editMenu(location.state.id, values.menu, values.description, values.dish, location.state.createdBy, location.state.createdTime))
    };


    useEffect(() => {
        dispatch(listDishes(1))
        dispatch(getMenuById(location.state.id))
        form.setFieldsValue({
            menu: location.state.menuName,
            description: location.state.description,
        })
    }, [])

    useEffect(() => {
        if (menuEditSuccess === true) {
            console.log('aaaaa hahah');
            navigate('/admin/listmenu', {
                state: {
                    isEditMenuSuccess: true
                }
            })
        }
    }, [menuEditSelector])


    if (loading === false && menuLoading === false) {
        listDishOption = dishes;

        menuInfo.listDish.forEach(e => {
            let rawDishInMenu = listDishOption.findIndex(x => x.id === e.id);
            oldDishInMenuIndex.push(rawDishInMenu)
        });

    }

    const cancelHandle = () => {
        navigate('/admin/listmenu');
    }

    return (

        <Row>
            {loading && menuLoading && <Loader />}
            {loading === false && menuLoading === false && <><Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="" >Edit Menu</a>
                </Breadcrumb.Item>
            </Breadcrumb>

                <Card
                    style={{ marginTop: 30, width: 1100, height: 700 }}
                >    <Divider plain><h1 style={{ margin: 20, fontSize: 30, position: 'relative' }}>Edit Menu</h1></Divider>

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
                                defaultValue={oldDishInMenuIndex.map((index) => (listDishOption[index]))}
                                isMulti
                            />
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="description"
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

                            <Space size={'large'}>
                                <Button type="primary" htmlType="submit">
                                    Edit Menu
                                </Button>
                                {menuEditLoading && <Loader />}
                                <Button onClick={cancelHandle}>Cancel</Button>
                            </Space>
                        </Form.Item>
                    </Form>

                </Card></>}




        </Row >
    );
};

export default EditMenuScreen;