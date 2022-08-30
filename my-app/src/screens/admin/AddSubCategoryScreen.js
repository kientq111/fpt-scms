import {
  AutoComplete,
  Button,
  Col,
  Form,
  Input,
  Space,
  Row,
  Breadcrumb, Card, Divider
} from 'antd';
import Loader from '../../components/Loader';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, addSubCategory, listCategory } from '../../actions/categoryAction';
import Select from 'react-select'
import { subCategoryConstatnts } from '../../constants/Constants';
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

const AddSubCategoryScreen = () => {
  const dispatch = useDispatch()
  const addSubCategorySelector = useSelector((state) => state.subCategoryAdd);
  const loadingAddSubCategory = addSubCategorySelector.loading;
  const subCategoryInfo = addSubCategorySelector.subCategoryInfo;
  const subCategoryError = addSubCategorySelector.error;
  const [form] = Form.useForm();

  const onFinish = (values) => {
    dispatch(addSubCategory(values.subCategoryName, values.description));
  };


  useEffect(() => {
    if (addSubCategorySelector) {
      dispatch({
        type: subCategoryConstatnts.SUB_CATEGORY_ADD_RESET,
      })
    }

  }, [])




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
      >    <Divider plain><h1 style={{ margin: 20, fontSize: 30, position: 'relative' }}>ADD SUBCATEGORY</h1></Divider>
        {subCategoryError && <h1 style={{ color: 'red', fontSize: 20 }}>{subCategoryError}</h1>}
        {(() => {
          if (loadingAddSubCategory === false) {
            if (subCategoryInfo.success === false) {
              return (
                <h2 style={{ color: 'red', fontSize: 15, position: 'relative', left: 400, bottom: -35 }}>{subCategoryInfo.data.message}</h2>
              )
            } else if (subCategoryInfo.success === true) {
              return (
                <h2 style={{ color: 'green', fontSize: 15, position: 'relative', left: 400, bottom: -35 }}>Add category successfull</h2>
              )
            }

          }
        })()}
        <Form style={{ marginTop: 50, marginRight: 150 }}
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >

          <Form.Item
            name="subCategoryName"
            label="Subcategory Name"
            rules={[
              {
                required: true,
                message: 'Please input subcategory name!',
                whitespace: true,
              },
              {
                pattern: new RegExp('^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ \s\W|_]+$'),
                message: 'Subcategory do not have number and special word'
              }
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
            <Space size={'middle'}>
              {loadingAddSubCategory && <Loader />}
              <Button type="primary" htmlType="submit">
                Add SubCategory
              </Button>

            </Space>

          </Form.Item>
        </Form>

      </Card>


    </Row >
  );
};

export default AddSubCategoryScreen;