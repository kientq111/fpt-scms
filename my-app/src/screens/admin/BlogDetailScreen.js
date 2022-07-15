import { PageHeader, Card, Row, Col } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogDetail } from '../../actions/blogAction';

const htmlString = `<p p style = "text-align: center;"> <strong>Content Blog n&agrave;y mặn như nước biển</strong></p> `

const BlogDetailScreen = () => {
    const dispatch = useDispatch();
    const detailBlogSelector = useSelector((state) => state.blogDetail);
    const { loading, blog } = detailBlogSelector;
    let blogTitle = '';
    let blogContent = '';



    useEffect(() => {
        dispatch(getBlogDetail(1));
    }, []);

    if (loading === false) {
        blogTitle = blog.name
        blogContent = blog.content
    }

    return (
        <Card style={{ height: 1000, marginTop: 10 }}>
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title="Blog Detail"
            />
            {loading === false && <div style={{ marginLeft: 50   }}>
                <Row style={{ marginTop: 40 }}>
                    <Col span={8}></Col>
                    <Col span={8}><h2>{blogTitle}</h2></Col>
                    <Col span={8}></Col>
                </Row>
                <div dangerouslySetInnerHTML={{ __html: blogContent }} style={{marginRight:350, marginTop:30}}>
                </div>
            </div>}
        </Card>
    )
};

export default BlogDetailScreen;