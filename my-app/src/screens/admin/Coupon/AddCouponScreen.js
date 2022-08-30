import {
    Button,
    Form,
    Input,
    Row,
    Breadcrumb, Card, Divider, DatePicker, InputNumber, Alert
} from 'antd';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import moment from 'moment';
import { listDishes } from '../../../actions/dishAction';
import axios from 'axios';
import { forEach, fromPairs } from 'lodash';
import { base_url } from '../../../api/api';
const { RangePicker } = DatePicker;
const { Search } = Input;
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
const optionTypeDiscount = [{ label: 'Discount Percent', value: 1 }, { label: 'Discount Money', value: 2 }]
const optionIsUsePromotion = [{ label: 'No', value: false }, { label: 'Yes', value: true }]
const AddCouponScreen = () => {

    const userLoginInfo = useSelector((state) => state.userLogin);
    const { userInfo } = userLoginInfo;
    const [loading, setLoading] = useState();
    const dispatch = useDispatch()
    const [message, setMessage] = useState();
    const [genCode, setGenCode] = useState();
    const [form] = Form.useForm();
    const [isUsePromotion, setIsUsePromotion] = useState(false)
    const [typeDiscount, setTypeDiscount] = useState(1)

    const onFinish = (values) => {
        addCoupon(values.couponCode, values.description, values.percentDiscount, values.discountMoney,
            values.maxDiscountMoney, values.minValueOrder, values.numberOfCoupon, values.numberOfCustomerUse,
            moment(values.couponFromDate).format("YYYY-MM-DD hh:mm:ss"), moment(values.couponToDate).format("YYYY-MM-DD hh:mm:ss"))
    };

    const genCodeHandle = async () => {
        try {
            const res = await axios.get(`/coupon/generatorCoupCode/15`, {
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            })
            setGenCode(res.data?.data?.message)
            console.log({ genCode });
            form.setFieldsValue({
                couponCode: genCode
            })
        } catch (error) {
            console.log(error);
        }
    }


    const addCoupon = async (couponCode, description, percentDiscount, discountMoney, maxDiscountMoney, minValueOrder, numberOfCoupon, numberOfCustomerUse, couponFromDate, couponToDate) => {
        try {
            setLoading(true)
            let createdBy = userInfo.username;
            let updatedBy = userInfo.username;
            let createdDate = null;
            let updatedDate = null;
            let status = 1;
            let type = 2;
            typeDiscount === 1 ? discountMoney = null : percentDiscount = null;
            if (typeDiscount !== 1) {
                maxDiscountMoney = null;
            }
            const res = await axios.post(`${base_url}/coupon/addOrUpdate`, {
                couponCode, description, percentDiscount, discountMoney, maxDiscountMoney, typeDiscount,
                type, minValueOrder,
                numberOfCoupon, numberOfCustomerUse, couponFromDate,
                couponToDate, status, createdBy, updatedBy, createdDate, updatedDate, isUsePromotion
            }, {
                params: {
                },
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            })
            console.log(res.data);
            setLoading(false)
            setMessage(res.data);
        } catch (error) {
        }
    }


    const optionUsePromoHandle = (isUsePromo) => {
        setIsUsePromotion(isUsePromo.value)
    }

    const optionTypeDiscountHandle = (typeDiscount) => {
        setTypeDiscount(typeDiscount.value)
    }


    return (
        <Row>
            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="" >add coupon</a>
                </Breadcrumb.Item>

            </Breadcrumb>


            <Card
                style={{ marginTop: 30, width: 1100, height: 'auto', borderRadius: 25 }}
            >    <Divider plain><h1 style={{ margin: 20, fontSize: 30, position: 'relative' }}>ADD COUPON</h1></Divider>

                <Form style={{ marginTop: 50, marginRight: 100 }}
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="couponCode"
                        label="Coupon Code"
                        rules={[
                            {
                                required: true,
                                message: 'Please click button generate to generate coupon code!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Search
                            style={{ width: '60%' }}
                            enterButton="Generate Coupon"
                            onSearch={genCodeHandle}
                            readOnly
                        />
                    </Form.Item>
                    <Form.Item
                        name="typeDiscount"
                        label="Type Discount"
                    >
                        <Select
                            options={optionTypeDiscount}
                            onChange={optionTypeDiscountHandle}
                            defaultValue={optionTypeDiscount[0]}
                            isSearchable={true}
                            styles={style}
                        />
                    </Form.Item>
                    {typeDiscount === 1 ?
                        <>
                            <Form.Item
                                name="percentDiscount"
                                label="Percent Discount"
                                prefix="%"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input percent discount!',
                                    },
                                ]}
                            >
                                <InputNumber style={{ width: '30%' }}
                                    defaultValue={0}
                                    min={0}
                                    max={100}
                                    formatter={(value) => `${value}%`}
                                    parser={(value) => value.replace('%', '')}
                                />
                            </Form.Item>

                            <Form.Item
                                name="maxDiscountMoney"
                                label="Max Discount Money"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Max Discount Money!',
                                    },
                                ]}
                            >
                                <InputNumber min={0} max={9999999} defaultValue={0} style={{ width: '30%' }} />
                            </Form.Item>
                        </>
                        :
                        <Form.Item
                            name="discountMoney"
                            label="Discount Money"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input sale price!',
                                },
                            ]}
                        >
                            <InputNumber min={0} max={9999999} defaultValue={0} style={{ width: '30%' }} />
                        </Form.Item>
                    }

                    <Form.Item
                        name="isUsePromo"
                        label="Accept Coupon With Promotion"
                    >
                        <Select
                            options={optionIsUsePromotion}
                            onChange={optionUsePromoHandle}
                            defaultValue={optionIsUsePromotion[0]}
                            isSearchable={true}
                            styles={style}
                        />
                    </Form.Item>


                    <Form.Item
                        name="minValueOrder"
                        label="Min Value Order"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Min Value Order!',
                            },
                        ]}
                    >
                        <InputNumber min={0} max={9999999} defaultValue={0} style={{ width: '30%' }} />
                    </Form.Item>





                    <Form.Item
                        name="numberOfCoupon"
                        label="Number Of Coupon"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Number Of Coupon!',
                            },
                        ]}
                    >
                        <InputNumber min={0} max={9999999} defaultValue={0} style={{ width: '30%' }} />
                    </Form.Item>
                    <Form.Item
                        name="numberOfCustomerUse"
                        label="Number Of Customer Use"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Number Of Customer Use!',
                            },
                        ]}
                    >
                        <InputNumber min={0} max={9999999} defaultValue={0} style={{ width: '30%' }} />
                    </Form.Item>



                    <Form.Item
                        name="couponFromDate"
                        label="Coupon Start Date"
                        rules={[
                            {
                                required: true,
                                message: 'Please select date!',
                            },
                        ]}
                    >
                        <DatePicker style={{ width: '30%' }} format={"DD/MM/YYYY hh:mm:ss"} showTime w />
                    </Form.Item>

                    <Form.Item
                        name="couponToDate"
                        label="Coupon Expires Date"
                        rules={[
                            {
                                required: true,
                                message: 'Please select date!',
                            },
                        ]}
                    >
                        <DatePicker style={{ width: '30%' }} format={"DD/MM/YYYY hh:mm:ss"} showTime />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input description',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input.TextArea showCount maxLength={300} style={{ height: 150 }} />

                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        {loading === false && message?.success === false && <p style={{ color: 'red' }}>{message?.data?.message}</p>}
                        {loading === false && message?.success === true && <p style={{ color: 'green' }}>{message?.data?.message}</p>}
                        <Button type="primary" htmlType="submit">
                            Add Promotion
                        </Button>
                    </Form.Item>
                </Form>

            </Card>
        </Row >
    );
};

export default AddCouponScreen;