import {
  Button,
  Form,
  Input,
  InputNumber,
  Switch, Card, Space, Divider, Breadcrumb
} from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listSubcategory } from '../../actions/categoryAction';
import { editDish, getDishById } from '../../actions/dishAction';
import { listMenus } from '../../actions/menuAction';
import Loader from '../../components/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from "react-select";
const { TextArea } = Input;


const EditDishScreen = () => {

  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  let indexSubCategoryOption;
  let indexMenuDish = [];
  const [selectedOptions, setSelectedOptions] = useState();


  const getDishByIdSelector = useSelector((state) => state.dishGetById);
  const editDishSelector = useSelector((state) => state.dishEdit);
  const selectSubcategorySelector = useSelector((state) => state.subcategoryList);
  const selectMenuSelector = useSelector((state) => state.menuList);

  const editDishLoading = editDishSelector.loading;
  const editDishSuccess = editDishSelector.success;
  const { subcategoryInfo } = selectSubcategorySelector;
  const loadingSubcategory = selectSubcategorySelector.loading;
  const loadingDishGetById = getDishByIdSelector.loading;
  const { menus } = selectMenuSelector;
  const loadingMenu = selectMenuSelector.loading

  const [isMenuOptionChanged, setIsMenuOptionChanged] = useState(false);
  let [isSubCategoryOptionChanged, setIsSubCategoryOptionChanged] = useState(false);


  useEffect(() => {
    dispatch(listSubcategory());
    dispatch(listMenus());
    dispatch(getDishById(location.state.id))
  }, []);

  //Problem about option
  useEffect(() => {
    form.setFieldsValue({
      // menu: location.state.menuID,
      dishname: location.state.dishName,
      description: location.state.description,
    })
  }, []);

  useEffect(() => {
    if (editDishSuccess === true) {
      navigate('/admin/listdish')
    }
  }, [editDishSuccess]);



  //Get form values and submit to action
  const onFinish = (values) => {
    //init old values
    let menu = [];
    let subcategory = []
    getDishByIdSelector.dish.menu.forEach(element => {
      menu.push({
        value: element.id,
        label: element.menuName,
        description: element.description,
        status: element.status,
        createdTime: element.createdTime,
        createdBy: element.createdBy,
        updatedTime: element.updatedTime,
        updatedBy: element.updatedBy
      })
    });

    subcategory = {
      value: location.state.subCategory.id,
      label: location.state.subCategory.subCategoryName,
      description: location.state.subCategory.description,
      status: location.state.subCategory.status,
      createdTime: location.state.subCategory.createdTime,
      createdBy: location.state.subCategory.createdBy,
      updatedBy: location.state.subCategory.updatedBy,
      updatedTime: location.state.subCategory.updatedTime,
    }

    //changed when option changed
    if (isMenuOptionChanged === true) {
      menu = values.menu
    }
    if (isSubCategoryOptionChanged === true) {
      subcategory = values.subcategory
    }
    console.log(subcategory, menu);
    dispatch(editDish(location.state.id, values.dishname, values.description, menu, subcategory, location.state.createdTime, location.state.createdBy));
  };


  //BASE64 block
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
  //End of base64 block
  const optionListMenu = [];
  const optionListSubCategory = [];

  if (loadingSubcategory === false) {
    subcategoryInfo.forEach(sub => {
      optionListSubCategory.push({
        value: sub.id,
        label: sub.subCategoryName,
        description: sub.description,
        status: sub.status,
        createdTime: sub.createdTime,
        createdBy: sub.subCategcreatedByoryName,
        updatedBy: sub.updatedBy,
        updatedTime: sub.updatedTime,
      })
    });
    indexSubCategoryOption = optionListSubCategory.findIndex(x => x.value === location.state.subCategory.id);
  }

  if (loadingMenu === false && loadingDishGetById === false) {
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

    getDishByIdSelector.dish.menu.forEach(e => {
      let rawMenuIndex = optionListMenu.findIndex(x => x.value === e.id);
      indexMenuDish.push(rawMenuIndex)
    });
  }

  function handleMenuSelect(data) {
    setSelectedOptions(data);
    console.log(data);
    setIsMenuOptionChanged(true);
  }



  function handleSubCategorySelect(data) {
    setSelectedOptions(data);
    console.log(data);
    setIsSubCategoryOptionChanged(true);
  }

  return (
    <>
      {loadingDishGetById === true && loadingMenu === true && loadingSubcategory === true && <Loader />}
      {loadingDishGetById === false && loadingMenu === false && loadingSubcategory === false && <><Breadcrumb style={{ marginTop: 10 }}>
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
                  options={optionListMenu}
                  placeholder="Select menu"
                  value={selectedOptions}
                  defaultValue={indexMenuDish.map((index) => (optionListMenu[index]))}
                  onChange={handleMenuSelect}
                  isSearchable={true}
                  isMulti
                />
              </Form.Item>

              <Form.Item label="Sub Category" name="subcategory">
                <Select
                  options={optionListSubCategory}
                  value={'a'}
                  defaultValue={optionListSubCategory[indexSubCategoryOption]}
                  onChange={handleSubCategorySelect}
                  isSearchable={true}
                />
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
        </div></>}



    </>
  );
};

export default EditDishScreen;