import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';
import {
    Form,
    Input,
    Row,
    Col,
    Button, Divider, Card, Breadcrumb
} from 'antd';
import Loader from '../../components/Loader';
import Select from "react-select";
import axios from 'axios';
import { userConstants } from '../../constants/Constants';
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

const style = {
    control: (base) => ({
        ...base,
        borderColor: 'black'
    })
}
// iter2: if add success => redirect success screen
const AddUserScreen = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [provin, setProvin] = useState([{ name: "", code: "" }]);
    const [district, setDistrict] = useState([{ name: "", code: "" }]);
    const [wards, setWards] = useState([{ name: "", code: "" }])



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
            })
            .catch(error => console.log(error));
        form.setFieldsValue({
            wards: "",
        })
    }

    //get data from store
    const userAddSelector = useSelector((state) => state.userRegister)
    const { userInfo, loading } = userAddSelector;

    useEffect(() => {
        if (userAddSelector) {
            dispatch({
                type: userConstants.USER_REGISTER_RESET,
            })
        }

    }, [])

    //Submit register form to action
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        const address = {
            street: `${values.street.trim()}`,
            wards: values.wards.name,
            district: values.district.name,
            city: values.city.name,
            country: "VIET NAM",
        }


        dispatch(register(values.username.toLowerCase(), values.email.toLowerCase(), values.password, values.dob, values.first_name.trim(), values.last_name.trim(), values.gender.Value, values.phone, address));
    };

    useEffect(() => {
        if (userInfo) {
            console.log(userInfo.success);
        }
    }, [userInfo])


    const genderOptions = [
        {
            Value: true,
            Label: 'Male'
        },
        {
            Value: false,
            Label: 'Female'
        },
    ]

    return (
        <Row>

            <Breadcrumb style={{ marginTop: 10 }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">Add User</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card
                style={{
                    width: 900, height: 1100, marginTop: 20, marginLeft: 100, borderRadius: 25
                }}
            >
                <Divider plain>     <h1 style={{ fontSize: 30 }}>ADD USER</h1></Divider>
                <Form style={{ marginRight: 150 }}
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    {loading === false && userInfo.success === false && <h5 style={{ marginLeft: 230, color: 'red' }}>{userInfo.message}</h5>}
                    {loading === false && userInfo.success === true && <h5 style={{ marginLeft: 230, color: 'green' }}>ADD USER SUCCESSFUL!</h5>}
                    <Form.Item
                        name="email"
                        label="E-mail"

                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
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
                                message: 'First Name do not have number and special word'
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
                                message: 'Last Name do not have number and special word'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"

                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'),
                                message: 'Password must contain at least one lowercase letter, uppercase letter, number, and special character'
                            },
                            {
                                max: 12,
                                message: 'Password not large than 12 word'
                            }

                        ]}
                        hasFeedback
                    >
                        <Input.Password style={{ borderColor: 'black', borderRadius: 4 }} />
                    </Form.Item>

                    <Form.Item
                        name="confirm"

                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password style={{ borderColor: 'black', borderRadius: 4 }} />
                    </Form.Item>


                    <Form.Item
                        name="username"
                        label="User Name"
                        tooltip="user name used to login to your account"

                        rules={[
                            {
                                required: true,
                                message: 'Please input your user name!',
                                whitespace: true,
                            },
                            {
                                pattern: new RegExp('^(?!.*\d_)(?!.*_\d)[a-zA-Z0-9_]+$'),
                                message: 'User name must not have special character'
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
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                                message: 'Please select gender!',
                            },
                        ]}
                    >
                        <Select
                            getOptionLabel={option => option.Label}
                            getOptionValue={option => option.Value}
                            options={genderOptions}
                            styles={style}
                        />
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
                            styles={style}
                        />
                    </Form.Item>
                    <Form.Item
                        name="district"
                        label="District"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            getOptionLabel={option => option.name}
                            getOptionValue={option => option.code}
                            onChange={handleDistrictSelect}
                            options={district}
                            styles={style}
                        />
                    </Form.Item>

                    <Form.Item
                        name="wards"
                        label="Wards"
                        Size="small "
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            getOptionLabel={option => option.name}
                            getOptionValue={option => option.code}
                            options={wards}
                            styles={style}
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
                            Add Account
                        </Button>
                        {loading && <Loader />}
                    </Form.Item>
                </Form>
            </Card>


        </Row >

    );
};

export default AddUserScreen;