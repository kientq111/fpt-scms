import { Button, Card, Descriptions, PageHeader, Statistic, Tabs, Table, Popconfirm, message, Image } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMenuById } from '../../actions/menuAction';
import moment from 'moment';
import { getDishById } from '../../actions/dishAction';
import styled from 'styled-components';
import Loader from '../../components/Loader';
import axios from 'axios';
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
    const userLoginInfo = useSelector((state) => state.userLogin);
    const { userInfo } = userLoginInfo;
    const location = useLocation()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const getDishByIdSelector = useSelector((state) => state.dishGetById);
    const dishLoading = getDishByIdSelector.loading;
    const dishInfo = getDishByIdSelector.dish;
    const [listComment, setListComment] = useState([])

    const getListComment = async (id) => {
        try {
            const res = await axios.get(`/comment/getListCommentByDishId`, {
                params: {
                    dishId: id,
                    page: 1,
                    pageSize: 100,
                },
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            })

            if (res?.data?.success === false) {
                return
            }
            setListComment(res.data?.data)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteComment = async (id) => {
        try {
            const res = await axios.delete(`/comment/removeComment/${id}`, {
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            })
            console.log(res.data)
            if (res?.data?.success === true) {
                getListComment(location.state.id)
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        dispatch(getDishById(location.state.id));
        getListComment(location.state.id);
    }, []);

    if (dishLoading === false) {
        dataImg = dishInfo.image
    }

    const renderContent = (column = 2) => (
        <>
            <Image
                width={200}
                src={`${dataImg}`}
            />
            <Descriptions size="small" column={column}>
                <Descriptions.Item label="Created By">{dishLoading === false && dishInfo.createdBy} </Descriptions.Item>
                <Descriptions.Item label="Updated By">
                    <a>{dishLoading === false && dishInfo.updatedBy}</a>
                </Descriptions.Item>
                <Descriptions.Item label="Creation Time">{dishLoading === false && (moment(dishInfo.createdTime).format('DD/MM/YYYY'))}</Descriptions.Item>
                <Descriptions.Item label="Updated Time">{dishLoading === false && (moment(dishInfo.updatedTime).format('DD/MM/YYYY'))}</Descriptions.Item>
                <Descriptions.Item label="Status">
                    {dishLoading === false && dishInfo.status === 1 ? <p style={{ color: 'green' }}><b>Active</b></p> : <p style={{ color: 'green' }}><b>Inactive</b></p>}
                </Descriptions.Item>
                <Descriptions.Item label="SubCategory">
                    {dishLoading === false && dishInfo.subCategory.subCategoryName}
                </Descriptions.Item>
                <Descriptions.Item label="Category">
                    {dishLoading === false && dishInfo.subCategory.category.categoryName}
                </Descriptions.Item>
                <Descriptions.Item label="Description">
                    {dishLoading === false && dishInfo.description}
                </Descriptions.Item>
            </Descriptions>
        </>
    );

    // Delete Update Form
    const confirm = (id) => {
        console.log(id);
        deleteComment(id);
    };

    const cancel = (e) => {
        console.log(e);
    };


    const extraContent = (
        <div
            style={{
                display: 'flex',
                width: 'max-content',
                justifyContent: 'flex-end',
            }}
        >
            <Statistic
                title="Price"
                value={dishLoading === false && dishInfo.price}
                style={{
                    marginRight: 32,
                }}
                suffix={'vnd'}
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
            title: 'User Name',
            dataIndex: 'created_by',
        },
        {
            title: 'Comment',
            dataIndex: 'content',
        },
        {
            title: 'Time Comment',
            dataIndex: 'created_time',
            render: (_, record) => moment(record.created_time).format('DD/MM/YYYY hh:mm:ss')
        },
        {
            title: 'Time Edit Comment',
            dataIndex: 'updated_time',
            render: (_, record) => moment(record.updated_time).format('DD/MM/YYYY hh:mm:ss')
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title="Are you sure to delete this task?"
                    onConfirm={() => confirm(record.id)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <a><DeleteOutlined style={{ fontSize: 17 }} /></a>
                </Popconfirm>
            ),
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
                            <TabPane tab="List User Comment" key="1" />
                        </Tabs>
                    }
                >
                    <Content extra={extraContent}>{renderContent()}</Content>
                </PageHeader>
                    <div>
                        <StyledTable className="table-striped-rows"
                            columns={columns}
                            dataSource={listComment}
                        />
                    </div>
                </>
                }
            </>
        </Card>

    )

};

export default DishDetailScreen;