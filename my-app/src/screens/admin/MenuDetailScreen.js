import { Button, Descriptions, PageHeader, Statistic, Tabs, Table, Card } from 'antd';
import { Avatar, Divider, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMenuById } from '../../actions/menuAction';
import styled from 'styled-components';
import moment from 'moment';

const { TabPane } = Tabs;


const Content = ({ children, extra }) => (
    <div className="content">
        <div className="main">{children}</div>
        <div className="extra">{extra}</div>
    </div>
);

const StyledTable = styled((props) => <Table {...props} />)`
  && tbody > tr:hover > td {
    background: rgba(208, 225, 225);
  }
  thead > tr > th {
    background-color: rgba(202, 235, 199);
  }
  `;

const MenuDetailScreen = () => {
    const [loading, setLoading] = useState(false);
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
                value={menuLoading === false && menuInfo.status === 1 ? "Active" : "DeActive"}
                style={{
                    marginRight: 32,
                }}
            />
        </div>
    );

    const dishDetailHandler = (id) => {
        navigate('/admin/dishdetail', { state: { id: id } })
    }

    const columns = [
        {
            title: 'Dish Name',
            dataIndex: 'dishName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text) => <a>{text === 1 ? <p style={{ color: 'green' }}>True</p> : <p style={{ color: 'red' }}>False</p>}</a>,
        },
    ];


    const onRowTableHandler = (id) => {
        console.log(id);
    }

    return (
        <div style={{ marginTop: 20 }}>
            <Card >
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

                <div>
                    {menuLoading === false && <StyledTable className="table-striped-rows" 
                        onRow={(values) => ({
                            onClick: () => dishDetailHandler(values.id),
                        })}
                        columns={columns}
                        dataSource={menuInfo.listDish}
                    />}

                </div>
            </Card>

            {/* {menuLoading === false && <List
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
                />} */}


        </div>

    )

};

export default MenuDetailScreen;