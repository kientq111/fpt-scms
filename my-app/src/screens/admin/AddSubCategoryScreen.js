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
  import { addCategory } from '../../actions/categoryAction';
  
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
    const categoryData = useSelector((state) => state.categoryAdd);
    const dispatch = useDispatch()
    const { loading, error, categoryInfo } = categoryData;
    const [form] = Form.useForm();
  
    const onFinish = (values) => {
      dispatch(addCategory(values.categoryName, values.description));
    };
  
    
    useEffect(() => {
      console.log(categoryInfo);
  
    }, [])
  
    return (
      <Row>
  
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="" >Add Category</a>
          </Breadcrumb.Item>
  
        </Breadcrumb>
  
  
        <Card
          style={{ marginTop: 30, width: 1100, height: 700 }}
        >    <Divider plain><h1 style={{ margin: 20, fontSize: 30, position: 'relative' }}>Add Category</h1></Divider>
          {error && <h1 style={{ color: 'red', fontSize: 20 }}>{error}</h1>}
          {(() => {
            if (loading === false) {
              if (categoryInfo.isSuccess === false) {
                return (
                  <h2 style={{ color: 'red', fontSize: 15, position: 'relative', left: 400, bottom: -35 }}>{categoryInfo.data}</h2>
                )
              } else if (categoryInfo.isSuccess === true) {
                return (
                  <h2 style={{ color: 'green', fontSize: 15, position: 'relative', left: 400, bottom: -35 }}>Add category successfull</h2>
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
                Add Category
              </Button>
            </Form.Item>
          </Form>
  
        </Card>
  
  
      </Row >
    );
  };
  
  export default AddSubCategoryScreen;