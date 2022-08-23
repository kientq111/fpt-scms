import {
    Button,
    Form,
    Input,
    Row,
    Breadcrumb, Card, Divider, DatePicker, InputNumber
} from 'antd';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import moment from 'moment';
import { listDishes } from '../../../actions/dishAction';
import axios from 'axios';
import { forEach } from 'lodash';

const { RangePicker } = DatePicker;
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
const AddPromoScreen = () => {
    const listDishSelector = useSelector((state) => state.dishList);
    const dishLoading = listDishSelector.loading;
    const listDish = listDishSelector.dishes;
    const userLoginInfo = useSelector((state) => state.userLogin);
    const { userInfo } = userLoginInfo;
    const [loading, setLoading] = useState();
    const dispatch = useDispatch()
    const [message, setMessage] = useState();
    let optionListDish = []
    const [form] = Form.useForm();

    const onFinish = (values) => {
        // console.log(values);
        const listDish = [];
        if (values.dishPromo !== undefined) {
            values.dishPromo.forEach(item => {
                listDish.push(item.id);
            });
        }
        addPromo(values.promotionName, values.description, values.promotionPercent, values.salePrice, moment(values.start_date).format("YYYY-MM-DD"), moment(values.end_date).format("YYYY-MM-DD"), listDish)
    };

    if (dishLoading === false) {
        optionListDish = listDish;
    }

    const addPromo = async (promotionName, description, promotionPercent, salePrice, promotionStartDate, promotionEndDate, listDishId) => {
        try {
            setLoading(true)
            let createdBy = userInfo.username;
            let updatedBy = userInfo.username;
            let createdDate = new Date();
            let updatedDate = new Date();
            let status = 1;
            let promotionType = 2;
            const res = await axios.post(`/promotion/addOrUpdatePromotion`, { promotionName, description, promotionPercent, salePrice, promotionStartDate, promotionEndDate, listDishId, createdBy, updatedBy, createdDate, updatedDate, status, promotionType }, {
                params: {
                },
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            })
            console.log(res.data?.data);
            setLoading(false)
            setMessage(res.data?.data?.message);
        } catch (error) {
        }
    }

    useEffect(() => {
        dispatch(listDishes(1))
    }, []);


    return (
        <Row>

            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="" >add promotion</a>
                </Breadcrumb.Item>

            </Breadcrumb>


            <Card
                style={{ marginTop: 30, width: 1100, height: 'auto', borderRadius: 25 }}
            >    <Divider plain><h1 style={{ margin: 20, fontSize: 30, position: 'relative' }}>ADD PROMOTION</h1></Divider>

                <Form style={{ marginTop: 50, marginRight: 100 }}
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="promotionName"
                        label="Promotion Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input promotion name!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input size='large ' />
                    </Form.Item>


                    <Form.Item
                        name="promotionPercent"
                        label="Promotion Percent"
                        prefix="%"
                        rules={[
                            {
                                required: true,
                                message: 'Please input promotion percent!',
                            },
                        ]}
                    >
                        <InputNumber
                            defaultValue={0}
                            min={0}
                            max={100}
                            formatter={(value) => `${value}%`}
                            parser={(value) => value.replace('%', '')}
                        />
                    </Form.Item>

                    <Form.Item
                        name="salePrice"
                        label="Sale Price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input sale price!',
                            },
                        ]}
                    >
                        <InputNumber min={0} max={9999999} defaultValue={0} />
                    </Form.Item>

                    <Form.Item
                        name="dishPromo"
                        label="List Dish Promotion"
                        rules={[
                            {
                                required: true,
                                message: 'Please select list dish promotion!',
                            },
                        ]}
                    >
                        <Select
                            options={listDish}
                            placeholder="Select dish promotion"
                            getOptionLabel={option => option.dishName}
                            getOptionValue={option => option.id}
                            isSearchable={true}
                            styles={style}
                            isMulti
                        />
                    </Form.Item>

                    <Form.Item
                        name="start_date"
                        label="Start Date"
                        rules={[
                            {
                                required: true,
                                message: 'Please select date!',
                            },
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        name="end_date"
                        label="End Date"
                        rules={[
                            {
                                required: true,
                                message: 'Please select date!',
                            },
                        ]}
                    >
                        <DatePicker />
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
                        {loading === false && <p style={{ color: 'green' }}>{message}</p>}
                        <Button type="primary" htmlType="submit">
                            Add Promotion
                        </Button>
                    </Form.Item>
                </Form>

            </Card>
        </Row >
    );
};

export default AddPromoScreen;