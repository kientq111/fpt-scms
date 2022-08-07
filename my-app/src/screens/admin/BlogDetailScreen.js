import { PageHeader, Card, Row, Col, Divider } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogDetail } from '../../actions/blogAction';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import Loader from '../../components/Loader';

const BlogDetailScreen = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const detailBlogSelector = useSelector((state) => state.blogDetail);
    const { loading, blog } = detailBlogSelector;
    let blogTitle = '';
    let blogContent = '';
    let blogDate = '';
    let blogImg = '';

    useEffect(() => {
        dispatch(getBlogDetail(location.state.id));
    }, []);

    if (loading === false) {
        blogTitle = blog.name
        blogContent = blog.content
        blogDate = moment(blog.created_time).format('DD/MM/YYYY')
        blogImg = blog.image
    }

    return (
        <Card style={{ height: 'auto', marginTop: 10, backgroundColor: "rgba(238,238,238,0.8)" }}>
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title="Blog Detail"
            />
            <Row>
                <Col span={3}></Col>
                <Col span={18}>
                    <Card style={{ height: 'auto' }}>
                        <>
                            {loading && <Loader />}
                            {loading === false && <div style={{ marginLeft: 20, marginTop: 20 }}>
                                <h2>{blogTitle}</h2>
                                <Divider orientation="right" plain>
                                    {blogDate}
                                </Divider>
                                <div><img src={`${blogImg}`} alt="" width={'60%'} height={'50%'} /></div>
                                <div dangerouslySetInnerHTML={{ __html: blogContent }} style={{ marginRight: 350, marginTop: 30 }}>
                                </div>
                                <div style={{ height:200}}></div>
                            </div>}
                        </>
                    </Card></Col>
                <Col span={3}></Col>
            </Row>



        </Card>
    )
};

export default BlogDetailScreen;