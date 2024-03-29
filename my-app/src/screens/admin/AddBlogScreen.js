import {
    Button,
    Form,
    Input,
    Switch, Card, Space, Divider, message
} from 'antd';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { Editor } from "@tinymce/tinymce-react";
import { addBlog, editBlog } from '../../actions/blogAction';
import axios from 'axios';
import { blogConstants } from '../../constants/Constants';

const AddBlogScreen = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const userLoginInfo = useSelector((state) => state.userLogin);
    const { userInfo } = userLoginInfo;
    const [imageStringBase64, setImageStringBase64] = useState();
    const initialText = 'Type content here';
    const [text, setText] = useState(initialText);
    const addBlogSelector = useSelector((state) => state.blogAdd);
    const { loading, success } = addBlogSelector
    const [blogImage, setBlogImage] = useState('')

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
                setBlogImage(resImg.data?.data?.imageUrl)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        if (addBlogSelector) {
            dispatch({
                type: blogConstants.BLOG_ADD_RESET,
            })
        }
    }, []);

    //CALL API ZONEEE
    const onFinish = (values) => {
        dispatch(addBlog(values.blogTitle, text, blogImage))
    };


    //BASE64 ZONEE
    const ImageHandler = e => {
        const files = e.target.files;
        const file = files[0];
        getBase64(file);
        imageOnChangeHandle(file)
    };


    const onLoad = fileString => {
        console.log(fileString);
        setImageStringBase64(fileString)
    };

    const getBase64 = file => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            onLoad(reader.result);
        };
    };

    return (
        <>
            <div className="site-card-border-less-wrapper">
                <Card
                    bordered={false}
                    style={{
                        borderRadius: 10,
                        marginTop: 20, marginLeft: 150,
                        width: 1300, height: 'auto'
                    }}
                >
                    <Divider plain>     <h1 style={{ fontSize: 30 }}>Add Blog</h1></Divider>
                    <Form style={{ width: 1400 }}
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        layout=""
                        form={form}
                        name="addish"
                        onFinish={onFinish}
                        scrollToFirstError
                    >

                        <Form.Item label="Blog Title" name="blogTitle"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Blog Title!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <div style={{ width: 900, marginLeft: 150 }}>
                            <Editor
                                apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
                                value={text}
                                outputFormat='text'
                                onEditorChange={(newText) => setText(newText)}
                            />
                        </div>
                        <Form.Item label="Image" name="dishimg" >
                            <input type="file" onChange={ImageHandler} accept="image/png, image/gif, image/jpeg" />

                        </Form.Item>
                        {success && <h6 style={{ marginLeft: 150, fontSize: 15, color: 'green' }}>ADD BLOG SUCCESSFUL!</h6>}
                        <Form.Item style={{ marginLeft: 230 }}>
                            <Space size={'large'}>
                                {loading && <Loader />}
                                <Button type='primary' htmlType="submit">Add Blog</Button>
                            </Space>

                        </Form.Item>
                    </Form>

                </Card>
            </div>

        </>
    );
};

export default AddBlogScreen;



