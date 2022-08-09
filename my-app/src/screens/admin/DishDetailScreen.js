import { Button, Card, Descriptions, PageHeader, Statistic, Tabs, Table } from 'antd';
import { Avatar, Divider, List, Skeleton, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMenuById } from '../../actions/menuAction';
import moment from 'moment';
import { getDishById } from '../../actions/dishAction';
import styled from 'styled-components';
import Loader from '../../components/Loader';
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

const DishDetailScreen = () => {
    let dataImg;
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

    if (dishLoading === false) {
        dataImg = dishInfo.image
    }

    const renderContent = (column = 2) => (
        <>
            <Image
                width={200}
                src={`data:image/jpeg;base64,${dataImg}`}
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
            <Statistic
                title="Price"
                value={dishLoading === false && dishInfo.price}
                style={{
                    marginRight: 32,
                }}
                suffix={'$'}
            />
            <Statistic
                title="Finished Time"
                value={dishLoading === false && dishInfo.finishedTime}
                style={{
                    marginRight: 32,
                }}
                suffix={'minute'}
            />
        </div>
    );

    const columns = [
        {
            title: 'Menu Name',
            dataIndex: 'menuName',
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

    return (

        <Card>
            <>
                {dishLoading && <Loader />}
                {dishLoading === false && <><PageHeader
                    className="site-page-header-responsive"
                    onBack={() => window.history.back()}
                    title={dishInfo.dishName}

                    footer={
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Menu" key="1" />
                        </Tabs>
                    }
                >
                    <Content extra={extraContent}>{renderContent()}</Content>
                </PageHeader>
                    <div>
                        <StyledTable className="table-striped-rows"
                            columns={columns}
                            dataSource={dishInfo.menu}
                        />
                    </div>
                </>
                }
            </>
        </Card>

    )

};

export default DishDetailScreen;