import {
    AutoComplete,
    Button,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Breadcrumb, Card, Divider, Space, message
} from 'antd';
import Loader from '../../components/Loader';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { editSubCategory, addSubCategory, listCategory } from '../../actions/categoryAction';
import Select from 'react-select'
import { useNavigate, useLocation } from 'react-router-dom';
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

const EditSubCategoryScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const subCategoryEditSelector = useSelector((state) => state.subCategoryEdit);
    const dispatch = useDispatch()
    const editLoading = subCategoryEditSelector.loading;
    const editSuccess = subCategoryEditSelector.success;
    const subCategoryInfo = subCategoryEditSelector.subCategoryInfo;

    const [form] = Form.useForm();

    //To show label of category before


    const onFinish = (values) => {
        dispatch(editSubCategory(location.state.id, values.subCategoryName, values.description, location.state.createdBy, location.state.createdTime, location.state.status));
    };


    useEffect(() => {
        form.setFieldsValue({
            // menu: location.state.menuID,
            subCategoryName: location.state.subCategoryName,
            description: location.state.description,
        })
    }, [])


    useEffect(() => {
        if (editSuccess === true) {
            console.log(subCategoryInfo);
            if (subCategoryInfo.success === false) {
                message.error(subCategoryInfo?.data?.message)
                return
            }
            navigate('/admin/listsubcategory')
        }
    }, [editSuccess])




    return (
        <Row>
            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="" >Add SubCategory</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card
                style={{ marginTop: 30, width: 1100, height: 'auto', borderRadius: 25 }}
            >    <Divider plain><h1 style={{ margin: 20, fontSize: 30, position: 'relative' }}>EDIT SUBCATEGORY</h1></Divider>

                <Form style={{ marginTop: 50, marginRight: 150 }}
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >


                    <Form.Item
                        name="subCategoryName"
                        label="SubCategory Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input sub category name!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        name="description"
                        label="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input description',
                                whitespace: true
                            },
                        ]}
                    >
                        <Input.TextArea showCount maxLength={300} style={{ height: 300 }} />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Space size={'large'}>
                            {editLoading && <Loader />}
                            <Button type="primary" htmlType="submit">
                                Edit SubCategory
                            </Button>
                            <Button onClick={() => navigate('/admin/listsubcategory')}>
                                Cancel
                            </Button>
                        </Space>

                    </Form.Item>
                </Form>

            </Card>


        </Row >
    );
};

export default EditSubCategoryScreen;