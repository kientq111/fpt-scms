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
const { TextArea } = Input;



const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });
const arrOption = [
  { value: 'mot hai ba' },
  { value: '4 5 ba' },
  { value: 'mot ha5i ba' },

]

const AddDishScreen = () => {
  const [form] = Form.useForm();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();
  const selectSubcategorySelector = useSelector((state) => state.subcategoryList);
  const { loading, subcategoryInfo } = selectSubcategorySelector;
  //IMG ZONEEEEE!!!
  const [componentDisabled, setComponentDisabled] = useState(true);
  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };
  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);


  useEffect(() => {
    dispatch(listSubcategory());
  }, []);

  //CALL API ZONEEE
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const menu = {
      menuName: values.menuname
    }
    const subcategory = {
      subCategoryName: values.menuname
    }
    dispatch(addDish(values.dishname, values.description));
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

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

            <Form.Item label="Dish Name" name="dishname">
              <Input />
            </Form.Item>
            <Form.Item label="Menu" name="menuname">
              <Select>
                <Select.Option value="demo">MenuTusday</Select.Option>
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
                {loading === false && subcategoryInfo.map((subCategory) => {
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
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                  alt="example"
                  style={{
                    width: '100%',
                  }}
                  src={previewImage}
                />
              </Modal>
            </Form.Item>
            <Form.Item style={{ marginLeft: 160 }}>
              <Space size={'large'}>
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