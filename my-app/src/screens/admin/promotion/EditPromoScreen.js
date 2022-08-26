import {
    Button,
    Form,
    Input,
    Row,
    Breadcrumb, Card, Divider, DatePicker, InputNumber, Space
} from 'antd';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import moment from 'moment';
import { listDishes } from '../../../actions/dishAction';
import axios from 'axios';
import { forEach } from 'lodash';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader'
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

const optionTypePromo = [{ label: 'Promotion By Percent', value: 1 }, { label: 'Promotion By Sale Price', value: 2 }]
const EditPromoScreen = () => {
    const navigate = useNavigate()
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
    const location = useLocation()
    const [promotionType, setPromotionType] = useState(location.state.type)
    const indexPromotionTypeOption = location.state.type === 1 ? 0 : 1
    let oldDishInPromoIndex = [];
    let isDishOptionChanged = false;
    const onFinish = (values) => {
        console.log(values);
        let listDish = [];

        location.state.listDish.forEach(oldItem => {
            listDish.push(oldItem.id);
        })

        if (isDishOptionChanged === true) {
            listDish = [];
            if (values.dishPromo !== undefined) {
                values.dishPromo.forEach(item => {
                    listDish.push(item.id);
                });
            }
        }
        editPromo(values.promotionName, values.description, values.promotionPercent, values.salePrice, moment(values.start_date).format("YYYY-MM-DD HH:mm:ss"), moment(values.end_date).format("YYYY-MM-DD HH:mm:ss"), listDish)
    };

    if (dishLoading === false) {
        optionListDish = listDish;
    }

    const editPromo = async (promotionName, description, promotionPercent, salePrice, promotionStartDate, promotionEndDate, listDishId) => {
        try {
            setLoading(true)
            const id = location.state.id
            let createdBy = location.state.createdBy
            let updatedBy = userInfo.username;
            let status = 1;
            promotionType === 1 ? salePrice = 0 : promotionPercent = 0
            const res = await axios.post(`/promotion/addOrUpdatePromotion`, { id, promotionName, description, promotionPercent, salePrice, promotionStartDate, promotionEndDate, listDishId, createdBy, updatedBy, status, promotionType }, {
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

    const optionOnChangeHandle = () => {
        // code on change and done edit promo, after done => coding voucher =>
        isDishOptionChanged = true;
    }

    useEffect(() => {
        dispatch(listDishes(1))
        console.log(moment(location.state.promotionEndDate).format('YYYY-MM-DD'))
        form.setFieldsValue({
            promotionName: location.state.promoName,
            promotionPercent: location.state.promotionPercent,
            description: location.state.description,
            salePrice: location.state.salePrice,
            start_date: moment(location.state.promotionStartDate, 'YYYY-MM-DD'),
            end_date: moment(location.state.promotionEndDate, 'YYYY-MM-DD'),

        })
    }, []);

    if (dishLoading === false) {
        location.state.listDish?.forEach(e => {
            let dishIndex = optionListDish.findIndex(x => x.id === e.id);
            oldDishInPromoIndex.push(dishIndex)
        });
        console.log(oldDishInPromoIndex);
    }

    const optionTypeHandle = (promoType) => {
        setPromotionType(promoType.value)
    }

    return (
        <Row>

            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="" >update promotion</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            {
                dishLoading === true && <>
                    <h1> </h1>
                    <h1> </h1>
                    <Loader />
                </>
            }
            {dishLoading === false &&
                <Card
                    style={{ marginTop: 30, width: 1100, height: 'auto', borderRadius: 25 }}
                >    <Divider plain><h1 style={{ margin: 20, fontSize: 30, position: 'relative' }}>UPDATE PROMOTION</h1></Divider>

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
                            name="promoType"
                            label="Promo Type"
                        >
                            <Select
                                options={optionTypePromo}
                                onChange={optionTypeHandle}
                                placeholder="Select type promotion"
                                defaultValue={optionTypePromo[indexPromotionTypeOption]}
                                isSearchable={true}
                                styles={style}
                            />
                        </Form.Item>

                        {promotionType === 1 ?
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
                            :
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

                        }
                        <Form.Item
                            name="dishPromo"
                            label="List Dish Promotion"
                        >
                            <Select
                                options={optionListDish}
                                placeholder="Select dish promotion"
                                getOptionLabel={option => option.dishName}
                                getOptionValue={option => option.id}
                                onChange={optionOnChangeHandle}
                                defaultValue={oldDishInPromoIndex.map((index) => (optionListDish[index]))}
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
                            <DatePicker showTime />
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
                            <DatePicker showTime />
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
                            <Space size={'middle'}>
                                <Button type="primary" htmlType="submit">
                                    Edit Promotion
                                </Button>
                                <Button onClick={() => navigate('/admin/listpromo')}>
                                    Cancel
                                </Button>
                            </Space>

                        </Form.Item>
                    </Form>

                </Card>
            }
        </Row >
    );
};

export default EditPromoScreen;