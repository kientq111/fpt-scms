import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Button, Divider, Card, Breadcrumb
} from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import TextArea from 'antd/lib/input/TextArea';
import Loader from '../../components/Loader';
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


const CanteenDetailScreen = () => {
    const [form] = Form.useForm();
    const userLoginInfo = useSelector((state) => state.userLogin);
    const { userInfo } = userLoginInfo;
    const [canteenDetail, setCanteenDetail] = useState({});
    const [loading, setLoading] = useState();
    const onFinish = (values) => {

    };


    const getCanteenById = async (id) => {

        try {
            setLoading(true);
            const res = await axios.get(`/canteen/getCanteenById/1`, {
                params: {

                },
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            })
            setLoading(false)
            console.log(res.data?.data)
            setCanteenDetail(res.data?.data)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getCanteenById(1)

    }, []);

    if (loading === false) {
        form.setFieldsValue({
            canteenName: canteenDetail.name,
            phone: canteenDetail.phone,
            description: canteenDetail.description,
        })
    }
    return (
        <Row>

            <Breadcrumb style={{ marginTop: 10 }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">canteen detail</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card
                style={{
                    width: 900, height: 'auto', marginTop: 30, marginLeft: 100, borderRadius: 20
                }}
            >
                <Divider plain>     <h1 style={{ fontSize: 30, }}>CANTEEN DETAIL</h1></Divider>
                {loading === true && <Loader/>}
                {loading === false &&
                    <Form style={{ marginRight: 150 }}
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        scrollToFirstError
                    >

                        <Form.Item
                            name="canteenName"
                            label="Canteen Name"
                        >
                            <Input readOnly />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Phone Number"
                        >
                            <Input readOnly />
                        </Form.Item>

                        <Form.Item name="description" label="Description "
                        >
                            <TextArea style={{ height: '200px' }} />
                        </Form.Item>



                        <Form.Item
                            name="country"
                            label="Country"

                        >
                            <Input readOnly />
                        </Form.Item>
                        <Form.Item layout="inline"
                            name="city"
                            label="City"

                        >
                            <Input readOnly />
                        </Form.Item>

                        <Form.Item
                            name="district"
                            label="District"

                        >
                            <Input readOnly />
                        </Form.Item>

                        <Form.Item
                            name="street"
                            label="Street"
                            Size="small "

                        >
                            <Input readOnly />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Phone Number"
                        >
                            <Input readOnly />
                        </Form.Item>


                    </Form>
                }
            </Card>


        </Row>

    );
};

export default CanteenDetailScreen;