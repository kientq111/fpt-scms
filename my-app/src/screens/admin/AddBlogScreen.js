import {
    Button,
    Form,
    Input,
    Switch, Card, Space, Divider
} from 'antd';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { Editor } from "@tinymce/tinymce-react";
import { addBlog } from '../../actions/blogAction';






const AddBlogScreen = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [imageStringBase64, setImageStringBase64] = useState();
    const initialText = 'Type content here';
    const [text, setText] = useState(initialText);




    useEffect(() => {

    }, []);



    //CALL API ZONEEE
    const onFinish = (values) => {
        dispatch(addBlog(values.blogTitle, text, imageStringBase64))
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
                        {/* <h4 style={{ marginLeft: 140, fontSize: 15, color: 'green'}}>ADD DISH SUCCESSFUL!</h4> */}
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
                            <input type="file" onChange={ImageHandler} />

                        </Form.Item>
                        <Form.Item style={{ marginLeft: 230 }}>
                            <Space size={'large'}>
                                {/* {addDishLoading && <Loader />} */}
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



