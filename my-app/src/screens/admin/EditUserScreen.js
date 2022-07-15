import React, { useState, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../actions/userActions';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import moment from 'moment';
import {
    Form,
    Input,
    Row,
    Col,
    Button, Divider, Space, Card, Breadcrumb
} from 'antd';
import Select from 'react-select'
import axios from 'axios';

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

const EditUserScreen = () => {
    const [form] = Form.useForm();
    //useLocation to get state from previous screen
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //get data from store
    const userUpdateSelector = useSelector((state) => state.userUpdate)
    const { success, loading } = userUpdateSelector;
    const [provin, setProvin] = useState([{ name: "", code: "" }]);
    const [district, setDistrict] = useState([{ name: "", code: "" }]);
    const [wards, setWards] = useState([{ name: "", code: "" }])
    const streetSplit = location.state.street.split("-");
    let wardsInitialIndex;
    useEffect(() => {
        axios.get(`https://provinces.open-api.vn/api/p/`)
            .then(res => {
                const dataRes = res.data;
                setProvin(dataRes);
            })
            .catch(error => console.log(error));
    }, []);


    // Function triggered on selection
    function handleProvinSelect(value) {
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
        axios.get(`https://provinces.open-api.vn/api/d/${value.code}?depth=2`)
            .then(res => {
                const dataRes = res.data;
                setWards(dataRes.wards);
                wardsInitialIndex = wards.findIndex(x => x.name === streetSplit[1])
            })
            .catch(error => console.log(error));
        form.setFieldsValue({
            wards: "",
        })
    }

    //Submit edit form to action
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        const address = {
            street: `${values.street}-${values.wards.name}`,
            district: values.district.name,
            city: values.city.name,
            country: 'VIET NAM',
        }
        dispatch(updateUser(location.state.id, values.username, values.email, values.dob, values.first_name, values.last_name, values.phone, address, values.gender));

    };

    useEffect(() => {
        if (success === true) {
            if (location.state.history === '/admin/liststaff') {
                navigate('/admin/liststaff')
            } else {
                navigate('/admin/listuser')
            }
        }

    }, [success])

    useEffect(() => {
        const formatDob = moment(location.state.dob).format('YYYY-MM-DD')
        form.setFieldsValue({
            first_name: location.state.firstname,
            last_name: location.state.lastname,
            username: location.state.username,
            email: location.state.email,
            dob: `${formatDob}`,
            country: location.state.country,
            city: location.state.city,
            district: location.state.district,
            street: location.state.street,
            phone: location.state.phone,
            gender: 'Male'
        })

        console.log(streetSplit);
    }, [])


    const handlerCancel = () => {
        if (location.state.history === '/admin/liststaff') {
            navigate('/admin/liststaff')
        } else {
            navigate('/admin/listuser')
        }
    }

    return (
        <Row>

            <Breadcrumb style={{ marginTop: 10 }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">update account</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card
                style={{
                    width: 900, height: 1100, marginTop: 20, marginLeft: 100, borderRadius: 25
                }}
            >
                <Divider plain>     <h1 style={{ fontSize: 30 }}>UPDATE ACCOUNT</h1></Divider>
                <Form style={{ marginRight: 150 }}
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="email"
                        label="E-mail"
                    >
                        <Input readOnly />
                    </Form.Item>

                    <Form.Item
                        name="first_name"
                        label="First Name"
                        tooltip="What do you want others to call you?"

                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name!',
                                whitespace: true,
                            },



                            {
                                pattern: new RegExp('^[a-zA-Z ]*$'),
                                message: 'First Name do not have number'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item


                        name="last_name"
                        label="Last Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                                whitespace: true,
                            },
                            {
                                pattern: new RegExp('^[a-zA-Z ]*$'),
                                message: 'Last Name do not have number'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item name="dob" label="Date of Birth" rules={[
                        {
                            required: true,
                            message: 'Input your birthday!',
                            whitespace: true,
                        },
                    ]} >
                        <input type='date' />
                    </Form.Item>

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
                            options={district}
                        />
                    </Form.Item>

                    <Form.Item
                        name="wards"
                        label="Wards"
                        Size="small "
                    >
                        <Select
                            getOptionLabel={option => option.name}
                            getOptionValue={option => option.code}
                            defaultValue={'aaa'}
                            options={wards}
                        />
                    </Form.Item>

                    <Form.Item
                        name="street"
                        label="Street"
                        Size="small "
                        rules={[
                            {
                                required: true,
                                message: 'Please input your street!',
                                whitespace: true,
                            }, {
                                max: 20,
                                message: 'please input not larger than 20 words!',
                            }
                        ]}
                    >
                        <Input Size="small" />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            }, {
                                pattern: new RegExp('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$'),
                                message: 'Wrong phone number format'
                            },
                        ]}
                    >
                        <Input
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Update Account
                        </Button>
                        {loading && <Loader />}
                    </Form.Item>
                </Form>
            </Card>


        </Row >

    );
};

export default EditUserScreen;