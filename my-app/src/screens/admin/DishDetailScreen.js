import { Button, Descriptions, PageHeader, Statistic, Tabs } from 'antd';
import { Avatar, Divider, List, Skeleton, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMenuById } from '../../actions/menuAction';
import moment from 'moment';
import { getDishById } from '../../actions/dishAction';

const { TabPane } = Tabs;


const Content = ({ children, extra }) => (
    <div className="content">
        <div className="main">{children}</div>
        <div className="extra">{extra}</div>
    </div>
);

const DishDetailScreen = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const location = useLocation()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const getDishByIdSelector = useSelector((state) => state.dishGetById);
    const dishLoading = getDishByIdSelector.loading;
    const dishInfo = getDishByIdSelector.dish;

    useEffect(() => {
        dispatch(getDishById(location.state.id));
    }, []);


    const renderContent = (column = 2) => (
        <>
            <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <Descriptions size="small" column={column}>
                <Descriptions.Item label="Created By">{dishLoading === false && dishInfo.createdBy} </Descriptions.Item>
                <Descriptions.Item label="Updated By">
                    <a>{dishLoading === false && dishInfo.updatedBy}</a>
                </Descriptions.Item>
                <Descriptions.Item label="Creation Time">{dishLoading === false && (moment(dishInfo.createdTime).format('DD/MM/YYYY'))}</Descriptions.Item>
                <Descriptions.Item label="Updated Time">{dishLoading === false && (moment(dishInfo.updatedTime).format('DD/MM/YYYY'))}</Descriptions.Item>
                <Descriptions.Item label="Description">
                    {dishLoading === false && dishInfo.description}
                </Descriptions.Item>
            </Descriptions>
        </>

    );

    const extraContent = (
        <div
            style={{
                display: 'flex',
                width: 'max-content',
                justifyContent: 'flex-end',
            }}
        >
            <Statistic
                title="Status"
                value={dishLoading === false && dishInfo.status === 1 ? "active" : "inactive"}
                style={{
                    marginRight: 32,
                }}
            />
            <Statistic
                title="SubCategory"
                value={dishLoading === false && dishInfo.subCategory.subCategoryName}
                style={{
                    marginRight: 32,
                }}
            />
            <Statistic
                title="Category"
                value={dishLoading === false && dishInfo.subCategory.category.categoryName}
                style={{
                    marginRight: 32,
                }}
            />
        </div>
    );

    return (

        <>
            <PageHeader
                className="site-page-header-responsive"
                onBack={() => window.history.back()}
                title={dishLoading === false && dishInfo.dishName}

                footer={
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Menu" key="1" />
                    </Tabs>
                }
            >
                <Content extra={extraContent}>{renderContent()}</Content>
            </PageHeader>

            <div
                id="scrollableDiv"
                style={{
                    height: 400,
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
            >
                {dishLoading === false && <List
                    dataSource={dishInfo.menu}
                    renderItem={(item) => (
                        <List.Item key={item}>
                            <List.Item.Meta
                                // avatar={<Avatar src={item.picture.large} />}
                                title={<a href="https://ant.design">{item.menuName}</a>}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                />}
            </div>
        </>

    )

};

export default DishDetailScreen;