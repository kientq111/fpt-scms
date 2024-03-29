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

const style = {
    control: (base) => ({
        ...base,
        borderColor: 'black'
    })
}

const EditUserScreen = () => {
    const [form] = Form.useForm();
    //useLocation to get state from previous screen

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //get data from store
    const userUpdateSelector = useSelector((state) => state.userUpdate)
    const { success, loading } = userUpdateSelector;
    const [provin, setProvin] = useState([{ name: location.state.city, code: "" }]);
    const [district, setDistrict] = useState([{ name: location.state.district, code: "" }]);
    const streetSplit = location.state.street.split(", ");
    const [wards, setWards] = useState([{ name: location.state.wards, code: "" }])
    let [isProvinChance, setIsProvinChange] = useState(false);
    let [isDistrictChance, setIsDistrictChange] = useState(false);
    let [isWardChange, setIsWardChange] = useState(false);
    let wardsInitialIndex;
    let oldGender = (location.state.gender === "Male" ? 0 : 1);
    let isOptionGenderChange = false;

    //INIT OLD USER PROFILE
    useEffect(() => {
        const formatDob = moment(location.state.dob).format('YYYY-MM-DD')
        console.log(location.state.gender);
        form.setFieldsValue({
            first_name: location.state.firstname,
            last_name: location.state.lastname,
            username: location.state.username,
            email: location.state.email,
            dob: `${formatDob}`,
            street: streetSplit[0],
            phone: location.state.phone,
        })

        axios.get(`https://provinces.open-api.vn/api/p/`)
            .then(res => {
                const dataRes = res.data;
                setProvin(dataRes);
            })
            .catch(error => console.log(error));

    }, [])

    useEffect(() => {
        //Search previous province and get code to list wards
        axios.get(`https://provinces.open-api.vn/api/p/search/?q=${location.state.city}`)
            .then(res => {
                const dataProvinceRes = res.data[0].code;
                axios.get(`https://provinces.open-api.vn/api/p/${dataProvinceRes}?depth=3`)
                    .then(res => {
                        const dataDistric = res.data;
                        setDistrict(dataDistric.districts);
                    })
            })
            .catch(error => console.log(error));
        //Search previous district and get code to list wards
        axios.get(`https://provinces.open-api.vn/api/d/search/?q=${location.state.district}`)
            .then(res => {
                const dataDistrictRes = res.data[0].code;
                axios.get(`https://provinces.open-api.vn/api/d/${dataDistrictRes}?depth=2`)
                    .then(res => {
                        const dataWard = res.data;
                        console.log(dataWard);
                        setWards(dataWard.wards);
                    })
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
        //Clear select when province changed
        form.setFieldsValue({
            district: "",
            wards: ""
        })
        setIsProvinChange(true)
    }

    function handleDistrictSelect(value) {
        axios.get(`https://provinces.open-api.vn/api/d/${value.code}?depth=2`)
            .then(res => {
                const dataRes = res.data;
                setWards(dataRes.wards);
            })
            .catch(error => console.log(error));
        //Clear select when district changed
        form.setFieldsValue({
            wards: "",
        })
        setIsDistrictChange(true)
    }

    function handleWardSelect() {
        setIsWardChange(true);
    }
    //END OF INIT

    //Submit edit form to action
    const onFinish = (values) => {
        let gender;
        let ward = location.state.wards
        let district = location.state.district;
        let city = location.state.city;

        if (isProvinChance === true) {
            city = values.city.name;
        }
        if (isDistrictChance === true) {
            district = values.district.name;
        }
        if (isWardChange === true) {
            ward = values.wards.name;
        }

        gender = (oldGender === 0 ? true : false)

        if (isOptionGenderChange === true) {
            gender = values.gender.value
        }

        const address = {
            street: `${values.street.trim()}`,
            wards: ward,
            district: district,
            city: city,
            country: 'Việt Nam',
        }
        console.log(gender);
        dispatch(updateUser(location.state.id, values.username, values.email, values.dob, values.first_name.trim(), values.last_name.trim(), values.phone, address, gender));

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


    const handlerCancel = () => {
        if (location.state.history === '/admin/liststaff') {
            navigate('/admin/liststaff')
        } else {
            navigate('/admin/listuser')
        }
    }

    const optionGenderChangeHandle = () => {
        isOptionGenderChange = true;
    }

    const optionGender = [{
        value: true,
        label: "Male"
    },
    {
        value: false,
        label: "Female"
    }
    ]


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
                        <Input readOnly disabled />
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
                                pattern: new RegExp('^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ \s\W|_]+$'),
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
                                pattern: new RegExp('^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ \s\W|_]+$'),
                                message: 'Last Name do not have number and special word'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label="Gender"
                    >
                        <Select
                            onChange={optionGenderChangeHandle}
                            defaultValue={[optionGender[oldGender]]}
                            options={optionGender}
                            styles={style}
                        />
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
                    >
                        <Select
                            getOptionLabel={option => option.name}
                            getOptionValue={option => option.code}
                            onChange={handleProvinSelect}
                            defaultValue={[provin[0]]}
                            options={provin}
                            styles={style}
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
                            styles={style}
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
                            onChange={handleWardSelect}
                            defaultValue={[wards[0]]}
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
                                max: 50,
                                message: 'please input not larger than 50 words!',
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
                        <Space size={'middle'}>
                            {loading && <Loader />}
                            <Button type="primary" htmlType="submit">
                                Update Account
                            </Button>
                            <Button onClick={handlerCancel}>
                                Cancel
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>


        </Row >

    );
};

export default EditUserScreen;