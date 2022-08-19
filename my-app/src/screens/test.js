import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Row,
  Col,
  Button, Divider, Card, Breadcrumb, Statistic
} from 'antd';
import Select from "react-select";
import moment from 'moment'
import { useSelector } from "react-redux";
const { Countdown } = Statistic;
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
  const userLoginInfo = useSelector((state) => state.userLogin);
  const { userInfo } = userLoginInfo;
  const [orderDetailModal, setOrderDetailModal] = useState()
  const [loading, setLoading] = useState();


  const getOrderDetailById = async (orderId) => {
    try {
      setLoading(true)
      const res = await axios.get(`/order/getOrderDishById/${orderId}`, {
        params: {
        },
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      })
      setLoading(false);
      setOrderDetailModal(res.data?.data)
    } catch (error) {
      console.log(error);
    }
  }

  const onFinish = (values) => {
    console.log('Received values of form: ', values);

  };


  useEffect(() => {
    getOrderDetailById(866)
  }, []);
  let date = Date.now()
  let count =  5 * 60 * 1000
  console.log(date)
  return (
   
    <>
      {/* <Countdown value={} /> */}
    </>
  )
}