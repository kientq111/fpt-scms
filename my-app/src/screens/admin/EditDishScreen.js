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
import { listSubcategory } from '../../actions/categoryAction';
import { editDish } from '../../actions/dishAction';
import { listMenus } from '../../actions/menuAction';
import Loader from '../../components/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
const { TextArea } = Input;


const EditDishScreen = () => {

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

  //3 qua bom nguyen tu
  useEffect(() => {
    dispatch(listSubcategory());
    dispatch(listMenus());
  }, []);

  //Problem about option
  useEffect(() => {
    form.setFieldsValue({
      // menu: location.state.menuID,
      dishname: location.state.dishName,
      subcategory: location.state.subCategoryName,
      menu: location.state.menuName,
      description: location.state.description,
    })

  }, []);

  useEffect(() => {
    if (editDishSuccess === true) {
      navigate('admin/listdish')
    }
  }, [editDishSuccess]);


  //if have id, name :> pass id, name else no
  //CALL API ZONEEE
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    console.log(location.state.id, values.dishname, values.description, menuID, subCategoryID);
    dispatch(editDish(location.state.id, values.dishname, values.description, menuID, subCategoryID));
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

            <Form.Item label="Menu" name="menu">
              <Select
                onChange={(values) => newMenuIdHandle(values)}
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
                onChange={(values) => newSubcategoryHandler(values)}
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
                {editDishLoading && <Loader />}
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

export default EditDishScreen;