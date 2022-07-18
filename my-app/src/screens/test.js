import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Row,
  Col,
  Button, Divider, Card, Breadcrumb
} from 'antd';
import Select from "react-select";


const { Option } = Select;

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


export default function App() {
  const [form] = Form.useForm();
  const [provin, setProvin] = useState([{ name: "Đà Lạt", code: "" }]);
  const [district, setDistrict] = useState([{ name: "Đà Nẵng", code: "" }]);
  const [wards, setWards] = useState([{ name: "", code: "" }])
  let optionDistrictFlag = false;
  
  useEffect(() => {
    axios.get(`https://provinces.open-api.vn/api/p/`)
      .then(res => {
        const dataRes = res.data;
        setProvin(dataRes);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    axios.get(`https://provinces.open-api.vn/api/p/search/?q='Tỉnh Bắc Kạn'`)
      .then(res => {
        const dataRes = res.data[0].code;
        axios.get(`https://provinces.open-api.vn/api/p/${dataRes}?depth=3`)
          .then(res => {
            const dataDistric = res.data;
            console.log(dataDistric);
            setDistrict(dataDistric.districts);
          })
      })
      .catch(error => console.log(error));
  }, []);


  const onFinish = (values) => {
    console.log('Received values of form: ', values);

  };

  // Function triggered on selection
  function handleProvinSelect(value) {
    console.log(value);
    axios.get(`https://provinces.open-api.vn/api/p/${value.code}?depth=3`)
      .then(res => {
        const dataRes = res.data;
        setDistrict(dataRes.districts);
      })
      .catch(error => console.log(error));
    form.setFieldsValue({
      district: "",
      wards: ""
    })
  }

  function handleDistrictSelect(value) {
    console.log(value);
    axios.get(`https://provinces.open-api.vn/api/d/${value.code}?depth=2`)
      .then(res => {
        const dataRes = res.data;
        setWards(dataRes.wards);
      })
      .catch(error => console.log(error));
    form.setFieldsValue({
      wards: "",
    })
  }
  return (
    <>
      <Form style={{ marginRight: 150 }}
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >

        <Form.Item
          name="city"
          label="city"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            getOptionLabel={option => option.name}
            getOptionValue={option => option.code}
            onChange={handleProvinSelect}
            defaultValue={provin[0]}
            options={provin}
          />
        </Form.Item>
        <Form.Item
          name="district"
          label="District"
        >
          <Select
            getOptionLabel={option => option.name}
            getOptionValue={option => option.code}
            onChange={handleDistrictSelect}
            defaultValue={[district[0]]}
            options={district}
          />
        </Form.Item>

        <Form.Item
          name="wards"
          label="wards"
          Size="small "
        >
          <Select
            getOptionLabel={option => option.name}
            getOptionValue={option => option.code}
            options={wards}
          />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Add Account
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}