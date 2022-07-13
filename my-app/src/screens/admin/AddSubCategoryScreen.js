import {
  AutoComplete,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Breadcrumb, Card, Divider
} from 'antd';
import Loader from '../../components/Loader';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, addSubCategory, listCategory } from '../../actions/categoryAction';
import Select from 'react-select'
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
const AddSubCategoryScreen = () => {
  const categoryData = useSelector((state) => state.categoryList);
  const dispatch = useDispatch()
  let optionListSubCategoryMenu = [];
  const { loading, categoryInfo } = categoryData;
  const [form] = Form.useForm();

  const onFinish = (values) => {
    dispatch(addSubCategory(values.subCategoryName, values.category, values.description));
    console.log(categoryInfo);
  };


  useEffect(() => {
    dispatch(listCategory())
  }, [])

  if (loading === false) {
    optionListSubCategoryMenu = categoryInfo;
  }

  return (
    <Row>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="" >Add SubCategory</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card
        style={{ marginTop: 30, width: 1100, height: 700 }}
      >    <Divider plain><h1 style={{ margin: 20, fontSize: 30, position: 'relative' }}>Add SubCategory</h1></Divider>

        <Form style={{ marginTop: 50, marginRight: 150 }}
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >


          <Form.Item
            name="subCategoryName"
            label="subCategory Name"
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
            name="category"
            label="Category"
          >
            <Select
              options={optionListSubCategoryMenu}
              placeholder="Select category"
              getOptionLabel={option => option.categoryName}
              getOptionValue={option => option.id}
              isSearchable={true}
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
            <Button type="primary" htmlType="submit">
              Add Category
            </Button>
          </Form.Item>
        </Form>

      </Card>


    </Row >
  );
};

export default AddSubCategoryScreen;