import {
    Button,
    Form,
    Input,
    Row,
    Breadcrumb, Card, Divider, Space, message
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

const style = {
    control: (base) => ({
      ...base,
      borderColor: 'black'
    })
  }
  
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
    const menuEditStatus = menuEditSelector.menus;
    const { loading, dishes } = getListDishSelector;
    let isDishOptionChanged = false;

    const onFinish = (values) => {
        let listDish = menuInfo.listDish;
        if (isDishOptionChanged === true) {
            listDish = values.dish
        }

        dispatch(editMenu(location.state.id, values.menu, values.description, location.state.status, listDish, location.state.createdBy, location.state.createdTime))
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
            if (menuEditStatus.success === false) {
                message.error(menuEditStatus.data.message);
                return
            }
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


    const changeDishOptionHandler = () => {
        isDishOptionChanged = true;
    }

    const cancelHandle = () => {
        navigate('/admin/listmenu');
    }

    return (

        <Row>
            {loading && <Loader />}
            {loading === false && menuLoading === false && <><Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="" >Edit Menu</a>
                </Breadcrumb.Item>
            </Breadcrumb>

                <Card
                    style={{ marginTop: 30, width: 1100, height: 'auto', borderRadius: 25 }}
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
                                onChange={changeDishOptionHandler}
                                defaultValue={oldDishInMenuIndex.map((index) => (listDishOption[index]))}
                                isMulti
                                styles={style}
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
                            <Input.TextArea showCount maxLength={300} style={{ height: 350 }} />
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>

                            <Space size={'large'}>
                                {menuEditLoading && <Loader />}
                                <Button type="primary" htmlType="submit">
                                    Edit Menu
                                </Button>
                                <Button onClick={cancelHandle}>Cancel</Button>
                            </Space>
                        </Form.Item>
                    </Form>

                </Card></>}




        </Row >
    );
};

export default EditMenuScreen;