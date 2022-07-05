import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Switch, Card, Space, Divider
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listSubcategory } from '../../actions/categoryAction';
import { addDish } from '../../actions/dishAction';
import { listMenus } from '../../actions/menuAction';
import Loader from '../../components/Loader';
const { TextArea } = Input;





const AddDishScreen = () => {
  const [form] = Form.useForm();
  
  const dispatch = useDispatch();
  const selectSubcategorySelector = useSelector((state) => state.subcategoryList);
  const selectMenuSelector = useSelector((state) => state.menuList);
  const addDishSelector = useSelector((state) => state.dishAdd);
  const addDishLoading = addDishSelector.loading;
  const { subcategoryInfo } = selectSubcategorySelector;
  const loadingSubcategory = selectMenuSelector.loading;
  const { loading, menus } = selectMenuSelector;

  useEffect(() => {
    dispatch(listSubcategory());
    dispatch(listMenus());
  }, []);



  //CALL API ZONEEE
  const onFinish = (values) => {
    console.log('Received values of form: ', values);

    dispatch(addDish(values.dishname, values.description, values.menu, values.subcategory));
  };


  //BASE64 ZONEE
  const ImageHandler = e => {
    const files = e.target.files;
    const file = files[0];
    getBase64(file);
  };


  const onLoad = fileString => {
    console.log(fileString);
  };

  const getBase64 = file => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };
  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card
          bordered={false}
          style={{
            marginTop: 20, marginLeft: 150,
            width: 1000, height: 700
          }}
        >
          <Divider plain>     <h1 style={{ fontSize: 30 }}>Add Dish</h1></Divider>
          <Form style={{ marginLeft: 100 }}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            form={form}
            name="addish"
            onFinish={onFinish}
            scrollToFirstError
          >
            {/* <h4 style={{ marginLeft: 140, fontSize: 15, color: 'green'}}>ADD DISH SUCCESSFUL!</h4> */}
            <Form.Item label="Dish Name" name="dishname">
              <Input />
            </Form.Item>
            <Form.Item label="Menu" name="menu">
              <Select
                showSearch
                style={{
                  width: 200,
                }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.includes(input)}
                filterSort={(optionA, optionB) =>
                  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
              >
                {loading === false && menus.map((menu) => {
                  return (
                    <Select.Option value={menu.id}>{menu.menuName}</Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
            <Form.Item label="Sub Category" name="subcategory">

              <Select
                showSearch
                style={{
                  width: 200,
                }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.includes(input)}
                filterSort={(optionA, optionB) =>
                  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
              >
                {loadingSubcategory === false && subcategoryInfo.map((subCategory) => {
                  return (
                    <Select.Option value={subCategory.id}>{subCategory.subCategoryName}</Select.Option>
                  )
                })}
              </Select>


            </Form.Item>

            <Form.Item label="Description" name="description">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Image" name="dishimg" >
              <input type="file" onChange={ImageHandler} />

            </Form.Item>
            <Form.Item style={{ marginLeft: 160 }}>
              <Space size={'large'}>
                {addDishLoading && <Loader />}
                <Button type='primary' htmlType="submit">Add Dish</Button>
                <Button>Cancel</Button>
              </Space>

            </Form.Item>
          </Form>

        </Card>
      </div>

    </>
  );
};

export default AddDishScreen;