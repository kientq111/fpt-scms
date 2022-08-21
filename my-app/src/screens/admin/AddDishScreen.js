import {
  Button,
  Form,
  Input,
  Switch, Card, Space, Divider, InputNumber
} from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listSubcategory } from '../../actions/categoryAction';
import { addDish } from '../../actions/dishAction';
import { listMenus } from '../../actions/menuAction';
import Loader from '../../components/Loader';
import Select from "react-select";
import { dishConstants } from '../../constants/Constants';


const { TextArea } = Input;





const AddDishScreen = () => {
  const [form] = Form.useForm();
  const [selectedOptions, setSelectedOptions] = useState();
  const [message, setMessage] = useState();
  // const [menuState, setmenuState] = useState();
  // const [subCategoryState, SetSubCategoryState] = useState();
  const [dishImg, setDishImg] = useState('');
  const dispatch = useDispatch();


  const selectSubcategorySelector = useSelector((state) => state.subcategoryList);
  const selectMenuSelector = useSelector((state) => state.menuList);
  const addDishSelector = useSelector((state) => state.dishAdd);
  const addDishLoading = addDishSelector.loading;
  const { subcategoryInfo } = selectSubcategorySelector;
  const loadingSubcategory = selectSubcategorySelector.loading;
  const { loading, menus } = selectMenuSelector;

  useEffect(() => {
    if (addDishSelector) {
      dispatch({
        type: dishConstants.DISH_ADD_RESET,
      })
    }
    dispatch(listSubcategory(1));
    dispatch(listMenus());
  }, []);

  useEffect(() => {
    if (addDishLoading === false) {
      setMessage('Add Dish Successful');
    }
  }, [addDishSelector]);

  //Option Zoneeeee
  const optionListMenu = [];
  const optionListSubCategory = [];

  if (loading === false) {
    menus.forEach(menu => {
      optionListMenu.push({
        value: menu.id,
        label: menu.menuName,
        description: menu.description,
        status: menu.status,
        createdTime: menu.createdTime,
        createdBy: menu.createdBy,
        updatedTime: menu.updatedTime,
        updatedBy: menu.updatedBy
      })
    });
  }

  if (loadingSubcategory === false) {
    subcategoryInfo.forEach(sub => {
      optionListSubCategory.push({
        value: sub.id,
        label: sub.subCategoryName,
        description: sub.description,
        status: sub.status,
        createdTime: sub.createdTime,
        createdBy: sub.createdBy,
        updatedBy: sub.updatedBy,
        updatedTime: sub.updatedTime
      })
    });
  }

  //CALL API ZONEEE
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    dispatch(addDish(values.dishname, values.price, values.description, values.menu, values.subcategory, dishImg, values.finishedTime));
  };


  //BASE64 ZONEE
  const ImageHandler = e => {
    const files = e.target.files;
    const file = files[0];
    setDishImg(file);
  };


  const onLoad = fileString => {
    console.log(fileString);
    setDishImg(fileString);
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
            width: 1000, height: 'auto', borderRadius: 25
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
            <h4 style={{ marginLeft: 140, fontSize: 15, color: 'green' }}>{message}</h4>
            <Form.Item label="Dish Name" name="dishname"
              rules={[
                {
                  required: true,
                  message: 'Please input dishname!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Price" name="price"
              rules={[
                {
                  required: true,
                  message: 'Please input Price!',
                },
              ]}
            >
              <InputNumber min={0} defaultValue={0} style={{ width: 250 }} />
            </Form.Item>
            <Form.Item label="Finished Time(min)" name="finishedTime"
              rules={[
                {
                  required: true,
                  message: 'Please input Finished Time!',
                },
              ]}
            >
              <InputNumber min={0} max={500} defaultValue={0} style={{ width: 250 }} />
            </Form.Item>
            <Form.Item label="Menu" name="menu">
              <Select
                options={optionListMenu}
                placeholder="Select menu"
                value={selectedOptions}
                // onChange={handleMenuSelect}
                isSearchable={true}
                isMulti
              />
            </Form.Item>
            <Form.Item label="Sub Category" name="subcategory"
              rules={[
                {
                  required: true,
                  message: 'Please select subcategory!',
                },
              ]}
            >
              <Select
                options={optionListSubCategory}
                placeholder="Select subcategory"
                value={selectedOptions}
                // onChange={handleSubCategorySelect}
                isSearchable={true}

              />
            </Form.Item>
            <Form.Item label="Description" name="description"
              rules={[
                {
                  required: true,
                  message: 'Please select description!',
                },
              ]}>
              <TextArea rows={4} maxLength={500} showCount />
            </Form.Item>
            <Form.Item label="Image" name="dishimg" accept="image/png, image/gif, image/jpeg" >
              <input type="file" onChange={ImageHandler} />

            </Form.Item>
            <Form.Item style={{ marginLeft: 160 }}>
              <Space size={'large'}>
                {addDishLoading && <Loader />}
                <Button type='primary' htmlType="submit">Add Dish</Button>
              </Space>

            </Form.Item>
          </Form>

        </Card>
      </div>

    </>
  );
};

export default AddDishScreen;