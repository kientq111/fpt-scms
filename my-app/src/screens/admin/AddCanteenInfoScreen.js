import {
    Button,
    Form,
    Input,
    Row,
    Breadcrumb, Card, Divider, TimePicker, Image, message
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
    const [loadingCanteenInfo, setLoadingCanteeInfo] = useState();
    const [canteenImgPreview, setCanteenImgPreview] = useState();
    const [canteenInfo, setCanteenInfo] = useState({});
    const [provin, setProvin] = useState([]);
    const [district, setDistrict] = useState([]);
    const [wards, setWards] = useState([])
    const [isProvinChange, setIsProvinChange] = useState(false);
    const [isDistrictChange, setIsDistrictChange] = useState(false);
    const [isWardChange, setIsWardChange] = useState(false);
    const [isFromDayChange, setIsFromDayChange] = useState(false);
    const [isToDayChange, setIsToDayChange] = useState(false);
    const [canteenImg, setCanteenImg] = useState('');
    const [canteenMessage, setCanteenMessage] = useState()
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
        setIsProvinChange(true)
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
        setIsDistrictChange(true)
    }

    const addCanteen = async (id, canteenName, phone, description, openTime, closeTime, fromDateOfWeek, toDateOfWeek, address) => {
        const createdTime = canteenInfo.createdDate;
        const updatedTime = null;
        const createdBy = canteenInfo.createdBy
        const updatedBy = null;
        const userId = userInfo.id;
        let logoUrl = canteenImg;
        try {
            const res = await axios.post(`/canteen/addOrUpdate`,
                {
                    id, canteenName, phone, description, createdTime, createdBy, updatedTime, updatedBy, logoUrl, openTime, closeTime, fromDateOfWeek, toDateOfWeek, userId, address
                }
                , {
                    params: {
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userInfo.accessToken}`,
                    },
                })
            console.log(res.data)
            setCanteenMessage(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const imageOnChangeHandle = async (file) => {
        try {
            const configImg = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            }

            if (typeof (file) === 'object') {
                const resImg = await axios.post(
                    `/image/upload`,
                    { file },
                    configImg
                )
                if (resImg.data?.success === false) {
                    message.error("Opps, There's something error when you upload! please re-upload image")
                    return
                }
                setCanteenImg(resImg.data?.data?.imageUrl)
            }
        } catch (error) {

        }
    }

    //Base64 Zone
    const ImageHandler = e => {
        const files = e.target.files;
        const file = files[0];
        getBase64(file);
        // setCanteenImg(file);
        imageOnChangeHandle(file)
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
            setCanteenImg(res.data?.data.logoUrl)
        } catch (error) {
            console.log(error);
        }
    }

    const [form] = Form.useForm();

    const onFinish = (values) => {
        const openTime = moment(values.openCloseTime[0]).format('HH:mm A')
        const closedTime = moment(values.openCloseTime[1]).format('HH:mm A')
        let provinceValue = canteenInfo.address.city
        let districtValue = canteenInfo.address.district
        let wardsValue = canteenInfo.address.wards
        let openDayValue = canteenInfo.fromDateOfWeek
        let closeDayValue = canteenInfo.toDateOfWeek
        if (isProvinChange === true) {
            provinceValue = values.city.name
        }

        if (isDistrictChange === true) {
            districtValue = values.district.name
        }

        if (isWardChange === true) {
            wardsValue = values.wards.name
        }

        if (isFromDayChange === true) {
            openDayValue = values.fromDay.name
        }

        if (isToDayChange === true) {
            closeDayValue = values.toDay.name
        }

        let addressValue = {
            street: values.street,
            wards: wardsValue,
            district: districtValue,
            city: provinceValue,
            country: "VIET NAM"
        }

        console.log(values.openCloseTime)
        console.log({closedTime})
        addCanteen(1, values.canteenName, values.phone, values.description, openTime, closedTime, openDayValue, closeDayValue, addressValue)
    };

    useEffect(() => {
        getCanteenById();
    }, [])

    useEffect(() => {
        if (loadingCanteenInfo === false) {
            form.setFieldsValue({
                canteenName: canteenInfo.name,
                description: canteenInfo.description,
                phone: canteenInfo.phone,
                street: canteenInfo.address.street,
                openCloseTime: [moment(canteenInfo.openTime, format), moment(canteenInfo.closedTime, format)],
            })
        }
    }, [loadingCanteenInfo])

    let optionCityDefault;
    let optionDistrictDefault;
    let optionWardDefault;
    let optionFromDay;
    let optionToDay;
    if (loadingCanteenInfo === false) {

        optionCityDefault = {
            code: '',
            name: canteenInfo.address.city
        }
        optionDistrictDefault = {
            code: '',
            name: canteenInfo.address.district
        }
        optionWardDefault = {
            code: '',
            name: canteenInfo.address.wards
        }
        optionFromDay = {
            name: canteenInfo.fromDateOfWeek
        }
        optionToDay = {
            name: canteenInfo.toDateOfWeek
        }

    }


    const isOptionWardChange = () => {
        setIsWardChange(true)
    }

    const isOptionFromDayChange = () => {
        setIsFromDayChange(true)
    }

    const isOptionToDayChange = () => {
        setIsToDayChange(true)
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
                    >
                        <Select
                            getOptionLabel={option => option.name}
                            getOptionValue={option => option.name}
                            defaultValue={optionFromDay}
                            onChange={isOptionFromDayChange}
                            options={optionDay}
                            styles={style}
                        />
                    </Form.Item>

                    <Form.Item
                        name="toDay"
                        label="To Day"

                    >
                        <Select
                            getOptionLabel={option => option.name}
                            getOptionValue={option => option.name}
                            defaultValue={optionToDay}
                            onChange={isOptionToDayChange}
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

                    >
                        <Select
                            getOptionLabel={option => option.name}
                            getOptionValue={option => option.code}
                            onChange={handleProvinSelect}
                            options={provin}
                            defaultValue={[optionCityDefault]}
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
                            options={district}
                            defaultValue={optionDistrictDefault}
                            onChange={handleDistrictSelect}
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
                            options={wards}
                            onChange={isOptionWardChange}
                            defaultValue={optionWardDefault}
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
                        {canteenMessage?.success === false ?
                            <h6 style={{ color: 'red' }}>{canteenMessage?.data?.message}</h6> : <h6 style={{ color: 'green' }}>{canteenMessage?.data?.message}</h6>
                        }

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