import {
    Space, Table, Breadcrumb, message, Popconfirm, Form, Divider, Button, Col, Row, Input, Modal, Badge, Descriptions, Popover, DatePicker, Statistic, notification
} from 'antd';
import { React, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import Loader, { LargeLoader } from '../../components/Loader';
import moment from 'moment'
import Highlighter from 'react-highlight-words';
import styled from 'styled-components';
import { changeOrderStatus, getOrderByID, listOrders } from '../../actions/orderAction';
import LinesEllipsis from 'react-lines-ellipsis'
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import get from "lodash.get"
import isequal from "lodash.isequal"
import axios from 'axios';
import { isArray } from 'lodash';
import Countdown from 'react-countdown'
import { base_url } from '../../api/api';

const { Column } = Table;

const StyledTable = styled((props) => <Table {...props} />)`
&& tbody > tr:hover > td {
  background: rgba(208, 225, 225);
}
thead > tr > th {
  background-color: rgba(202, 235, 199);
}
`;

const openNotificationWithIcon = (type) => {
    notification[type]({
        message: 'Change Order Status Success',
    });
};

const ListOrderScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const dispatch = useDispatch();

    const orderChangeStatusSelector = useSelector((state) => state.orderChangeStatus);
    const userLoginInfo = useSelector((state) => state.userLogin);
    const { userInfo } = userLoginInfo;
    const [listOrd, setListOrd] = useState([]);
    const { success } = orderChangeStatusSelector;
    const [loading, setLoading] = useState();
    const { RangePicker } = DatePicker;
    const [listDish, setListDish] = useState();
    var flag = false;
    const [orderDetailModal, setOrderDetailModal] = useState({
        orderNumber: "",
        description: "",
        status: "",
        total: "",
        createdTimme: "",
        user: {
            first_name: "",
            last_name: "",
            phone: "",
            status: "",
            gender: ""
        },
        bookTable: {
            listTable: [
                {
                    tableNumber: "",
                },
            ],
            status: "",
            estimateReceiveTime: ""
        }
    });
    let listDishOrder;

    const handleOk = () => {
        setIsModalVisible(false);
        flag = true;
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        flag = true;
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            get(record, dataIndex).toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            isequal(searchedColumn, dataIndex) ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const showModal = (order) => {
        getOrderDetailData(order.orderId, order.status)
        setOrderDetailModal(order);
        flag = false;
        setIsModalVisible(true);
    };

    const changeStatusAndReloadOrderDetail = (orderId, status) => {
        changeOrderStatusHandle(orderId, 0, status)
        getOrderDetailById(orderId);
    }

    const getOrderDetailById = async (orderId) => {
        try {

            const res = await axios.get(`${base_url}/order/getOrderDishById/${orderId}`, {
                params: {
                },
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            })

            setOrderDetailModal(res.data?.data)

        } catch (error) {
            console.log(error);
        }
    }

    const getOrder = async (startDate, endDate) => {

        try {

            const res = await axios.get(`${base_url}/order/getListOrderDish`, {
                params: {
                    orderNumber: '',
                    userId: '',
                    status: '',
                    bookId: '',
                    startDate: startDate ? startDate : '',
                    endDate: endDate ? endDate : '',
                    createdBy: '',
                    orderId: '',
                    pageSize: 100,
                    pageIndex: 1,
                },
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            })
            setListOrd(res.data?.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getOrderDetailData = async (id, orderStatus) => {
        try {
            setLoading(true)
            const res = await axios.get(`${base_url}/orderDetail/getListOrderDetailByOrderId`, {
                params: {
                    orderId: id,
                    fromDate: '',
                    toDate: '',
                    createdBy: '',
                    pageIndex: 1,
                    pageSize: 100,
                },
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            })
            console.log(res.data?.data);
            if (orderStatus === 1) {
                if (res.data?.data?.every(item => item.status === 1)) {
                    changeStatusAndReloadOrderDetail(id, 2)
                }
            }

            setListDish(res.data?.data)
            setLoading(false)
            return res.data?.data

        } catch (error) {
        }
    }

    const getDishItemById = (id, orders) => {
        let foundItem;
        for (const item of orders) {
            if (item.orderId === id) {
                foundItem = item;
                break;
            }
        }
        return foundItem;
    }

    const refreshListOrder = () => {
        let currentDate = new Date();
        let rawToday = new Date();
        let tomorrowDate = currentDate.setDate(currentDate.getDate() + 1);
        let today = currentDate.setDate(rawToday.getDate() - 1);
        console.log(moment(today).format('YYYY-MM-DD HH:mm:ss'))
        console.log(moment(tomorrowDate).format('YYYY-MM-DD HH:mm:ss'))
        getOrder(moment(today).format('YYYY-MM-DD HH:mm:ss'), moment(tomorrowDate).format('YYYY-MM-DD HH:mm:ss'))
    }
    const dateOnchangeHandle = (value) => {
        if (value === null) {
            return
        }
        const startDate = moment(value[0]).format('YYYY-MM-DD hh:mm:ss');
        const endDate = moment(value[1]).format('YYYY-MM-DD hh:mm:ss')
        getOrder(startDate, endDate)
        // dispatch(listOrders(startDate, endDate));
    }

    const changeOrderStatusHandle = (id, prevStatus, status) => {
        // console.log({ status });
        if (prevStatus === 2) {
            message.info("Can't not change status of Order Done")
            return
        }

        if (prevStatus === 4) {
            message.info("Can't not change status of Order Cancel")
            return
        }
        dispatch(changeOrderStatus(id, status))
        message.success(`Change Status Successful!`)
    }

    const onDoneHandle = (dishId) => {
        console.log(dishId);
        setListOrd(prevOrders => {
            let updatedOrders = prevOrders?.map(order => ({
                ...order,
                dishItem: order?.dishItem?.map(dish => {
                    if (dish?.id === dishId) {
                        return {
                            ...dish,
                            dishTimeFinished: 0
                        }
                    } else {
                        return dish
                    }
                })
            }))

            return updatedOrders;
        }
        )
    }

    const columns = [
        {
            title: 'Dish Name',
            dataIndex: 'dishName',
            key: '',
            render: (text, record) => {
                return `${record.dishItem.dishName}`; // just for decoration
            },


        },

        {
            title: 'SubCategory',
            dataIndex: 'subCategory',
            key: 'sub',
            render: (text, record) => {
                return `${record.dishItem.subCategory.subCategoryName}`; // just for decoration
            }
        },

        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => {
                return `${record.price}`; // just for decoration
            },
            sorter: (a, b) => a.price - b.price
        },

        {
            title: 'Quantity',
            dataIndex: 'Quantity',
            key: 'Quantiy',
            render: (text, record) => {
                return `${record.quantity}`; // just for decoration
            },
            sorter: (a, b) => a.quantity - b.quantity
        },
        { title: "Order Dish Number", dataIndex: "orderDishNumber", key: "orderDishNumber", sorter: (a, b) => a.orderDishNumber - b.orderDishNumber },

        {
            title: 'Estimate Time',
            dataIndex: 'dishTimeFinished',
            key: 'count',
            render: (text, record) => {
                let countdown = record.dishTimeFinished
                // parseInt(moment(detail.createdDate).format('x')) + (detail.dishTimeFinished * 60 * 1000)
                // if (doneDish === record.id) {
                //     countdown = 0;
                // }
                return <Countdown
                    date={parseInt(moment().format('x')) + (parseInt(countdown) * 1000)} renderer={countdownRederer}
                />;
                // onComplete={() => dishFinishHandle(orderDetailModal.orderId, orderDetailModal.status)} />;  
            }
        },

    ];


    const countdownRederer = ({ hours, minutes, seconds, completed }) => {
        if (orderDetailModal.status === 2 || orderDetailModal.status === 4 || orderDetailModal.status === 32) {
            return '0'
        }

        if (completed) {
            return <span>Done</span>
        }

        return <span>{('0' + minutes).slice('-2')}:{('0' + seconds).slice('-2')}</span>;
    }

    let countDish = 0;
    const dishFinishHandle = (orderId, status) => {
        let newDish = countDish + 1;
        countDish = newDish;
        //if all dish finish then changed status of order detail
        console.log({ countDish })
        console.log(listDish.length)
        console.log({ status });
        if (countDish == listDish.length && status == 1 && flag === false) {
            openNotificationWithIcon('success');
            changeStatusAndReloadOrderDetail(orderId, 2);
        }
    }

    const columnsDoneOrCancel = [
        {
            title: 'Dish Name',
            dataIndex: 'dishName',
            key: '',
            render: (text, record) => {
                return `${record.dishItem.dishName}`; // just for decoration
            },


        },

        {
            title: 'SubCategory',
            dataIndex: 'subCategory',
            key: 'sub',
            render: (text, record) => {
                return `${record.dishItem.subCategory.subCategoryName}`; // just for decoration
            }
        },

        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => {
                return `${record.price}`; // just for decoration
            },
            sorter: (a, b) => a.price - b.price
        },

        {
            title: 'Quantity',
            dataIndex: 'Quantity',
            key: 'Quantiy',
            render: (text, record) => {
                return `${record.quantity}`; // just for decoration
            },
            sorter: (a, b) => a.quantity - b.quantity
        },
        { title: "Order Dish Number", dataIndex: "orderDishNumber", key: "orderDishNumber", sorter: (a, b) => a.orderDishNumber - b.orderDishNumber },
    ];


    useEffect(() => {

        let currentDate = new Date();
        let rawToday = new Date();
        let tomorrowDate = currentDate.setDate(currentDate.getDate() + 1);
        let today = currentDate.setDate(rawToday.getDate() - 1);
        console.log(moment(today).format('YYYY-MM-DD HH:mm:ss'))
        console.log(moment(tomorrowDate).format('YYYY-MM-DD HH:mm:ss'))
        getOrder(moment(today).format('YYYY-MM-DD HH:mm:ss'), moment(tomorrowDate).format('YYYY-MM-DD HH:mm:ss'))
        // getOrder()

    }, [success]);


    const columnsTable = [
        {
            title: 'tableNumber',
            dataIndex: 'tableNumber',
            sorter: {
                compare: (a, b) => a.tableNumber - b.tableNumber,
                multiple: 3,
            },
        },
        {
            title: 'description',
            dataIndex: 'description',

        }
    ];


    return (
        <>
            <Breadcrumb style={{ marginTop: 10 }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">List Order</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Divider orientation="right">  <Button type="" size="middle" onClick={refreshListOrder}>Refresh</Button></Divider>

            {/* {loading === true && <>
                <br></br> <br /> <br />
                <br></br> <br /> <br />
                <Row>
                    <Col span={5}></Col>
                    <Col span={5}></Col>
                    <Col span={5}><LargeLoader /></Col>
                    <Col span={5}></Col>
                </Row></>} */}

            {/* {loading === false && */}
            <>
                <div>
                    <Row>
                        <Col span={4}></Col>
                        <Col span={4}></Col>
                        <Col span={4}></Col>
                        <Col style={{ marginBottom: 5 }} span={4}> <RangePicker onChange={(value) => dateOnchangeHandle(value)} /></Col>
                        <Col span={4}></Col>
                        <Col span={4}></Col>

                    </Row>
                </div>
                <StyledTable dataSource={listOrd || []} className="table-striped-rows">
                    <Column title="Order Number" dataIndex="orderNumber" key="orderNumber" {...getColumnSearchProps('orderNumber')} />
                    <Column title="Description" dataIndex="description" key="description" width={'20%'}
                        render={(_, record) => (<LinesEllipsis
                            text={record.description}
                            maxLine='1'
                            ellipsis='...'
                            trimRight
                            basedOn='letters'
                        />)}
                    />
                    <Column title="Order Status" dataIndex="status"
                        filters={[
                            {
                                text: 'Order Pending',
                                value: 1,
                            },
                            {
                                text: 'Order Success',
                                value: 2,
                            },
                            {
                                text: 'Order Cancel',
                                value: 4,
                            },
                        ]}
                        onFilter={(value, record) => record.status === value}
                        render={(_, record) => (record.status === 1 ? (<p style={{ color: 'blue' }}>Pending</p>) : record.status === 2 ? (<p style={{ color: 'green' }}>Success</p>) : (<p style={{ color: 'red' }}>Cancel</p>))}
                        key="status"
                    />
                    <Column title="Total Price" dataIndex="total" key="total" sorter={(a, b) => a.total - b.total} />
                    <Column title="User's Order" dataIndex={["user", "first_name"]} {...getColumnSearchProps(["user", "first_name"],)} key="createdBy" />
                    <Column title="Order Created Time" dataIndex="createdTimme" render={(_, record) => (moment(record.createdTimme).format('LLLL'))} key="created_time" sorter={(a, b) => moment(a.createdTimme).unix() - moment(b.createdTimme).unix()} />
                    <Column title="Total Table Booked" dataIndex="bookTable"
                        render={(_, record) => record.bookTable.listTable.length
                        }
                        key="createdBy"
                        sorter={(a, b) => a.bookTable.listTable.length - b.bookTable.listTable.length}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(_, record) => (

                            <Space size="middle">
                                <a ><EyeOutlined onClick={() => showModal(record)} /></a>
                                {record.status === 1 ? <Popover content={<div>
                                    <Space
                                        direction="vertical"
                                        size="small"
                                        style={{
                                            display: 'flex',
                                        }}
                                    >
                                        {record.status !== 2 &&
                                            <Popconfirm
                                                title="Are you sure to change this status?"
                                                onConfirm={() => changeOrderStatusHandle(record.orderId, record.status, 2)}
                                                onCancel={() => console.log(record.id)}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <a className='txtLink' >Done Order</a>

                                            </Popconfirm>
                                        }


                                        {record.status !== 1 && <Popconfirm
                                            title="Are you sure to change this status?"
                                            onConfirm={() => changeOrderStatusHandle(record.orderId, record.status, 1)}
                                            onCancel={() => console.log(record.id)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <a className='txtLink'>Order Pending</a>

                                        </Popconfirm>
                                        }

                                        {record.status !== 4 && <Popconfirm
                                            title="Are you sure to change this status?"
                                            onConfirm={() => changeOrderStatusHandle(record.orderId, record.status, 4)}
                                            onCancel={() => console.log(record.id)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <a className='txtLink'>Order Cancel</a>

                                        </Popconfirm>}


                                    </Space>
                                </div>} title="Change Status" trigger="click">
                                    <a style={{ color: 'blue' }}>Change Status</a>
                                </Popover>
                                    : 'No Action'
                                }

                            </Space>

                        )

                        }
                    />
                </StyledTable>
            </>
            {/* } */}

            <Modal title="Detail Order" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Ok" width={'70%'}>

                <>
                    <Row style={{ marginBottom: 10 }}>
                        <Col span={6}></Col>
                        <Col span={6}></Col>
                        <Col span={6}></Col>
                        <Col span={6}>
                            {orderDetailModal.status === 1 &&
                                <>

                                    <Popconfirm
                                        title="Are you sure to change this status?"
                                        onConfirm={() => changeStatusAndReloadOrderDetail(orderDetailModal.orderId, 2)}
                                        onCancel={() => console.log(orderDetailModal.orderId)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button type='primary' style={{ marginRight: 20 }} >Done Order</Button>
                                    </Popconfirm>

                                    <Popconfirm
                                        title="Are you sure to change this status?"
                                        onConfirm={() => changeStatusAndReloadOrderDetail(orderDetailModal.orderId, 4)}
                                        onCancel={() => console.log(orderDetailModal.orderId)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button type='danger' > Cancel Order</Button>
                                    </Popconfirm>
                                </>
                            }
                        </Col>
                    </Row>
                </>

                <Descriptions title="" layout="vertical" bordered>
                    <Descriptions.Item label="Order Number" style={{ width: "20%" }}><b>{orderDetailModal.orderNumber}</b></Descriptions.Item>
                    <Descriptions.Item label="Total Money"><b>{orderDetailModal.total}</b></Descriptions.Item>
                    <Descriptions.Item label="Order By" span={2}>
                        <b>{orderDetailModal.user?.first_name} {orderDetailModal?.user.last_name}</b>
                    </Descriptions.Item>
                    <Descriptions.Item label="User Phone Number"><b><i>{orderDetailModal?.user.phone}</i></b></Descriptions.Item>
                    <Descriptions.Item label="Order Started Time"><b>{moment(orderDetailModal.createdTimme).format('LLLL')}</b></Descriptions.Item>
                    <Descriptions.Item label="Order Status" span={3}>
                        <Badge status={orderDetailModal.status === 1 ? "processing" : orderDetailModal.status === 2 ? "success" : "error"} text={orderDetailModal.status === 1 ? "Order Pending" : orderDetailModal.status === 2 ? "Order Success" : "Order Cancel"} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Description">
                        {orderDetailModal.description}
                    </Descriptions.Item>
                </Descriptions>
                <h2></h2>
                <h4>List Dish Order</h4>
                {(orderDetailModal.status === 4 || orderDetailModal.status === 2) &&
                    <>
                        <Row style={{ marginBottom: 10 }}>
                            <Col span={10}></Col>
                            {orderDetailModal.status === 4 ? <Col span={10}><h3 style={{ color: 'red' }}>Order Cancel</h3></Col> : <Col span={10}><h3 style={{ color: 'green' }}>Order Success</h3></Col>}
                            <Col span={10}></Col>
                        </Row>
                    </>
                }

                {loading === true && <Loader />}
                {/* <Table columns={columns} dataSource={listDish} /> */}
                {loading === false && <Table columns={columns} dataSource={listDish} />}
                <h2></h2>
                <h4> <Col span={12}>List Table Booked
                </Col></h4>
                <Table columns={columnsTable} dataSource={orderDetailModal.bookTable.listTable} />

            </Modal>
        </>
    )
}

export default ListOrderScreen;