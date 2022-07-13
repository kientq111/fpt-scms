import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select, Breadcrumb, Card, Divider
} from 'antd';
import Loader from '../../components/Loader';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addSubCategory, editCategory } from '../../actions/categoryAction';
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
const EditCategoryScreen = () => {
  const categoryData = useSelector((state) => state.categoryEdit);
  const dispatch = useDispatch()
  const { loading, error, categoryInfo, success } = categoryData;
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    dispatch(editCategory(location.state.id, values.categoryName, values.description, location.state.createdTime, location.state.createdBy));
  };


  useEffect(() => {
    console.log(categoryInfo);
    console.log(location.state);
    form.setFieldsValue({
      // menu: location.state.menuID,
      categoryName: location.state.categoryName,
      description: location.state.description,
    })
  }, [])

  useEffect(() => {
    if (success === true) {
      navigate('/admin/listcategory')
    }
  }, [categoryData]);


  return (
    <Row>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="" >Update Category</a>
        </Breadcrumb.Item>

      </Breadcrumb>


      <Card
        style={{ marginTop: 30, width: 1100, height: 700 }}
      >    <Divider plain><h1 style={{ margin: 20, fontSize: 30, position: 'relative' }}>Update Category</h1></Divider>
        {error && <h1 style={{ color: 'red', fontSize: 20 }}>{error}</h1>}
        {(() => {
          if (loading === false) {
            if (categoryInfo.isSuccess === false) {
              return (
                <h2 style={{ color: 'red', fontSize: 15, position: 'relative', left: 400, bottom: -35 }}>{categoryInfo.data}</h2>
              )
            } else if (categoryInfo.isSuccess === true) {
              return (
                <h2 style={{ color: 'green', fontSize: 15, position: 'relative', left: 400, bottom: -35 }}>update category successfull</h2>
              )
            }
          }
        })()}
        <Form style={{ marginTop: 50 }}
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}

          scrollToFirstError
        >
          <Form.Item
            name="categoryName"
            label="category name"
            rules={[
              {
                required: true,
                message: 'Please input category name!',
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
              },
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            {loading && <Loader />}
            <Button type="primary" htmlType="submit">
              Update Category
            </Button>
          </Form.Item>
        </Form>

      </Card>


    </Row >
  );
};

export default EditCategoryScreen;