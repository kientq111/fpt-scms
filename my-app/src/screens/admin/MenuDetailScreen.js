import { Button, Descriptions, PageHeader, Statistic, Tabs } from 'antd';
import { Avatar, Divider, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMenuById } from '../../actions/menuAction';
import moment from 'moment';

const { TabPane } = Tabs;


const Content = ({ children, extra }) => (
    <div className="content">
        <div className="main">{children}</div>
        <div className="extra">{extra}</div>
    </div>
);

const MenuDetailScreen = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const location = useLocation()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const getMenuByIdSelector = useSelector((state) => state.menuGetById);
    const menuLoading = getMenuByIdSelector.loading;
    const menuInfo = getMenuByIdSelector.menu;

    useEffect(() => {
        dispatch(getMenuById(location.state.id));
    }, []);


    const renderContent = (column = 2) => (
        <Descriptions size="small" column={column}>
            <Descriptions.Item label="Created By">{menuLoading === false && menuInfo.createdBy} </Descriptions.Item>
            <Descriptions.Item label="Updated By">
                <a>{menuLoading === false && menuInfo.updatedBy}</a>
            </Descriptions.Item>
            <Descriptions.Item label="Creation Time">{menuLoading === false && (moment(menuInfo.createdTime).format('DD/MM/YYYY'))}</Descriptions.Item>
            <Descriptions.Item label="Updated Time">{menuLoading === false && (moment(menuInfo.updatedTime).format('DD/MM/YYYY'))}</Descriptions.Item>
            <Descriptions.Item label="Description">
                {menuLoading === false && menuInfo.description}
            </Descriptions.Item>
        </Descriptions>
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
                value={menuLoading === false && menuInfo.status === 1 ? "active" : "inactive"}
                style={{
                    marginRight: 32,
                }}
            />
        </div>
    );

    const dishDetailHandler = (id) => {
        navigate('/admin/dishdetail', { state: { id: id } })
    }

    return (

        <>
            <PageHeader
                className="site-page-header-responsive"
                onBack={() => window.history.back()}
                title={menuLoading === false && menuInfo.menuName}

                footer={
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="List dish in menu" key="1" />
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
                {menuLoading === false && <List
                    dataSource={menuInfo.listDish}
                    renderItem={(item) => (
                        <List.Item key={item}>
                            <List.Item.Meta
                                // avatar={<Avatar src={item.picture.large} />}
                                title={<a onClick={() => { dishDetailHandler(item.id) }}>{item.dishName}</a>}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                />}
            </div>
        </>

    )

};

export default MenuDetailScreen;