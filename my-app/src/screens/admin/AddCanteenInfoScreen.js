import {
    Button,
    Form,
    Input,
    Row,
    Breadcrumb, Card, Divider, TimePicker, Image
} from 'antd';
import Loader from '../../components/Loader';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import axios from 'axios';
import moment from 'moment';


const format = 'HH:mm A';
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
const optionDay = [{ name: "Monday" }, { name: "Tuesday" }, { name: "Wednesday" }, { name: "Thursday" }, { name: "Friday" }, { name: "Saturday" }, { name: "Sunday" }]

const style = {
    control: (base) => ({
        ...base,
        borderColor: 'black'
    })
}

const AddCanteenInfoScreen = () => {

    const userLoginInfo = useSelector((state) => state.userLogin);
    const { userInfo } = userLoginInfo;
    const [disableInput, setDisableInput] = useState(true);
    const [loadingCanteenInfo, setLoadingCanteeInfo] = useState();
    const [canteenImgPreview, setCanteenImgPreview] = useState();
    const [canteenInfo, setCanteenInfo] = useState({});

    const [provin, setProvin] = useState([]);
    const [district, setDistrict] = useState([]);
    const [wards, setWards] = useState([])
    let [isProvinChance, setIsProvinChange] = useState(false);
    let [isDistrictChance, setIsDistrictChange] = useState(false);
    let [isWardChange, setIsWardChange] = useState(false);


    useEffect(() => {
        axios.get(`https://provinces.open-api.vn/api/p/`)
            .then(res => {
                const dataRes = res.data;
                setProvin(dataRes);
            })
            .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        if (loadingCanteenInfo === false) {
            console.log('console ne')
            axios.get(`https://provinces.open-api.vn/api/p/search/?q=${canteenInfo.address.city}`)
                .then(res => {
                    const dataProvinceRes = res.data[0].code;
                    axios.get(`https://provinces.open-api.vn/api/p/${dataProvinceRes}?depth=3`)
                        .then(res => {
                            const dataDistric = res.data;
                            setDistrict(dataDistric.districts);
                        })
                })
                .catch(error => console.log(error));

            axios.get(`https://provinces.open-api.vn/api/d/search/?q=${canteenInfo.address.district}`)
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
        }
    }, [loadingCanteenInfo]);


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

    const addCanteen = async (id, canteenName, phone, description, createdTime, createdBy, updatedTime, updatedBy, logoUrl, openTime, closeTime, fromDateOfWeek, toDateOfWeek, userId, address) => {
        try {
            const res = await axios.post(`/order/getListOrderDish`,
                {
                    id, canteenName, phone, description, createdTime, createdBy, updatedTime, updatedBy, logoUrl, openTime, closeTime, fromDateOfWeek, toDateOfWeek, userId, address
                }
                , {
                    params: {
                    },
                    headers: {
                        Authorization: `Bearer ${userInfo.accessToken}`,
                    },
                })

        } catch (error) {
            console.log(error);
        }
    }

    //Base64 Zone
    const ImageHandler = e => {
        const files = e.target.files;
        const file = files[0];
        getBase64(file);
    };

    const onLoad = fileString => {
        setCanteenImgPreview(fileString);
    };

    const getBase64 = file => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            onLoad(reader.result);
        };
    };

    const getCanteenById = async () => {
        setLoadingCanteeInfo(true)
        try {

            const res = await axios.get(`/canteen/getCanteenById/1`, {
                params: {

                },
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            })
            setLoadingCanteeInfo(false)
            setWards(res.data?.data.address.wards)
            console.log(res.data?.data.address.wards);
            setCanteenInfo(res.data?.data)
            setCanteenImgPreview(res.data?.data.logoUrl)
        } catch (error) {
            console.log(error);
        }
    }

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values)
        // addCanteen(values.id, values.canteenName, values.description, values)
    };

    useEffect(() => {
        getCanteenById();
    }, [])

    if (loadingCanteenInfo === false) {
        form.setFieldsValue({
            canteenName: canteenInfo.name,
            description: canteenInfo.description,
            phone: canteenInfo.phone,

            openCloseTime: [moment("08:00 AM", format), moment("11:00 AM", format)],
            fromDay: 'Monday'
        })
    }


    return (
        <Row>

            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="" >update Canteen</a>
                </Breadcrumb.Item>

            </Breadcrumb>

            {loadingCanteenInfo && <Loader />}
            {loadingCanteenInfo === false && <Card
                style={{ marginTop: 30, width: 1100, height: 'auto', marginBottom: 25, borderRadius: 25 }}
            >    <Divider plain><h1 style={{ margin: 20, fontSize: 30, position: 'relative' }}>UPDATE CANTEEN INFOMATION</h1></Divider>

                <Form style={{ marginTop: 10, marginRight: '20%' }}
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >

                    <Form.Item
                        name="canteenName"
                        label="Canteen Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input canteen name!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="openCloseTime"
                        label="Open-Close Time"
                        rules={[
                            {
                                required: true,
                                message: 'Please select open-close time!',
                            },
                        ]}
                    >
                        <TimePicker.RangePicker format={format} />

                    </Form.Item>


                    <Form.Item
                        name="fromDay"
                        label="From Day"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            getOptionLabel={option => option.name}
                            getOptionValue={option => option.name}
                            options={optionDay}
                            styles={style}
                        />
                    </Form.Item>

                    <Form.Item
                        name="toDay"
                        label="To Day"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            getOptionLabel={option => option.name}
                            getOptionValue={option => option.name}
                            options={optionDay}
                            styles={style}
                        />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"

                        rules={[
                            {
                                required: true,
                                message: 'Please input description',
                            },
                        ]}
                    >
                        <Input.TextArea showCount maxLength={900} style={{ height: 200 }} />
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


                    <Form.Item
                        name="city"
                        label="City"
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
                            defaultValue={[provin[0]]}
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
                            options={district}
                            defaultValue={[district[0]]}
                            onChange={handleDistrictSelect}
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
                            defaultValue={[wards[0]]}
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

                    <Form.Item label="Logo Image" name="canteenImg" >
                        <input type="file" accept="image/png, image/gif, image/jpeg" onChange={ImageHandler} />
                        <h1></h1>
                        <Image
                            width={200}
                            src={`${canteenImgPreview}`}
                        />
                    </Form.Item>


                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Update Canteen
                        </Button>
                    </Form.Item>
                </Form>

            </Card>
            }




        </Row >
    );
};

export default AddCanteenInfoScreen;