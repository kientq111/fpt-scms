import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Switch, Card, Space, Divider, Breadcrumb
  } from 'antd';
  import { useState, useEffect } from 'react';
  import { useDispatch, useSelector } from 'react-redux';

  import { useLocation, useNavigate } from 'react-router-dom';
  const { TextArea } = Input;
  
  
  const TestSelectScreen = () => {
  
    const [form] = Form.useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [menuID, setMenuID] = useState(location.state.menuID);
    const [subCategoryID, setSubCategoryID] = useState(location.state.subCategoryID);
  
    const editDishSelector = useSelector((state) => state.dishEdit);
    const selectSubcategorySelector = useSelector((state) => state.subcategoryList);
    const selectMenuSelector = useSelector((state) => state.menuList);
  
    const editDishLoading = editDishSelector.loading;
    const editDishSuccess = editDishSelector.success;
    const { subcategoryInfo } = selectSubcategorySelector;
    const loadingSubcategory = selectMenuSelector.loading;
    const { loading, menus } = selectMenuSelector;
  

    //if have id, name :> pass id, name else no
    //CALL API ZONEEE
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };
  
  
    //BASE64 ZONEE
    const ImageHandler = e => {
      const files = e.target.files;
      const file = files[0];
      getBase64(file);
    };
  
  
    const newMenuIdHandle = (id) => {
      console.log(id);
      setMenuID(id)
    }
  
    const newSubcategoryHandler = (id) => {
      console.log(id);
      setSubCategoryID(id)
    }
  
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
        <Breadcrumb style={{ marginTop: 10 }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">List Dish</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Edit Dish</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-card-border-less-wrapper">
          <Card
            bordered={false}
            style={{
              marginTop: 20, marginLeft: 150,
              width: 1000, height: 700
            }}
          >
            <Divider plain>     <h1 style={{ fontSize: 30 }}>Update Dish</h1></Divider>
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
  
   
              <Form.Item label="Description" name="description">
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item label="Image" name="dishimg" >
                <input type="file" onChange={ImageHandler} />
  
              </Form.Item>
              <Form.Item style={{ marginLeft: 160 }}>
                <Space size={'large'}>
                  <Button type='primary' htmlType="submit">Update Dish</Button>
                  <Button>Cancel</Button>
                </Space>
  
              </Form.Item>
            </Form>
  
          </Card>
        </div>
  
      </>
    );
  };
  
  export default TestSelectScreen;