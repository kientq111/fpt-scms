import {
    Button,
    Form,
    Input,
    Switch, Card, Space, Divider
} from 'antd';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { addBlog } from '../../actions/blogAction';
const { TextArea } = Input;





const AddBlogScreen = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [imageStringBase64, setImageStringBase64] = useState();
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const editor = useRef(null);
    function focusEditor() {
        editor.current.focus();
    }


    useEffect(() => {

    }, []);


    //CALL API ZONEEE
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        console.log(imageStringBase64);
        dispatch(addBlog(values.blogTitle, "content nek", imageStringBase64))
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
                        marginTop: 20, marginLeft: 150,
                        width: 1000, height: 700
                    }}
                >
                    <Divider plain>     <h1 style={{ fontSize: 30 }}>Add Blog</h1></Divider>
                    <Form style={{ marginLeft: 100 }}
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
                        <Form.Item label="Blog Title" name="blogTitle">
                            <Input />
                        </Form.Item>




                        <Form.Item label="Content" name="content">
                            <div
                                style={{ border: "1px solid black", minHeight: "6em", cursor: "text" }}
                                onClick={focusEditor}
                            >
                                <Editor
                                    ref={editor}
                                    editorState={editorState}
                                    onChange={setEditorState}
                                    placeholder="Write something!"
                                />
                            </div>
                        </Form.Item>
                        <Form.Item label="Image" name="dishimg" >
                            <input type="file" onChange={ImageHandler} />

                        </Form.Item>
                        <Form.Item style={{ marginLeft: 160 }}>
                            <Space size={'large'}>
                                {/* {addDishLoading && <Loader />} */}
                                <Button type='primary' htmlType="submit">Add Blog</Button>
                                <Button>Cancel</Button>
                            </Space>

                        </Form.Item>
                    </Form>

                </Card>
            </div>

        </>
    );
};

export default AddBlogScreen;



