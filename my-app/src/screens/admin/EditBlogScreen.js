import {
    Button,
    Form,
    Input,
    Switch, Card, Space, Divider, Image, Row, Col
} from 'antd';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { Editor } from "@tinymce/tinymce-react";
import { editBlog } from '../../actions/blogAction';
import { useLocation, useNavigate } from 'react-router-dom';


const EditBlogScreen = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [imageStringBase64, setImageStringBase64] = useState(location.state.image);
    const initialText = location.state.content;
    const [text, setText] = useState(initialText);

    const editBlogSelector = useSelector((state) => state.blogEdit);
    const { loading, blog, error, success } = editBlogSelector;

    useEffect(() => {
        if (success === true) {
            navigate('/admin/listblog')
        }
    }, [editBlogSelector]);



    //CALL API ZONEEE
    const onFinish = (values) => {
        dispatch(editBlog(location.state.id, values.blogTitle, text, imageStringBase64))
        console.log(imageStringBase64);
    };


    //BASE64 ZONEE
    const ImageHandler = e => {
        const files = e.target.files;
        const file = files[0];
        getBase64(file);
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
                        width: 1300, height: 800
                    }}
                >
                    <Divider plain>     <h1 style={{ fontSize: 30 }}>Edit Blog</h1></Divider>
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
                        {/* <h4 style={{ marginLeft: 140, fontSize: 15, color: 'green'}}>ADD DISH SUCCESSFUL!</h4> */}
                        <Form.Item label="Blog Title" name="blogTitle"
                            initialValue={location.state.name}
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


                            <Row>
                                <Col span={8}> <input type="file" accept="image/png, image/gif, image/jpeg" onChange={ImageHandler} /></Col>
                                <Col span={8}> <Image width={130}
                                    src={`${imageStringBase64}`}
                                /></Col>
                            </Row>
                        </Form.Item>
                        <Form.Item style={{ marginLeft: 230 }}>
                            <Space size={'large'}>
                                {loading && <Loader />}
                                <Button type='primary' htmlType="submit">Edit Blog</Button>
                                <Button type='default' onClick={() => navigate('/admin/listblog')}>Cancel</Button>
                            </Space>

                        </Form.Item>
                    </Form>

                </Card>
            </div>

        </>
    );
};

export default EditBlogScreen;



