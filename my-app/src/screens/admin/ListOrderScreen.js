import {
    Space, Table, Breadcrumb, message, Popconfirm, Form, Divider, Button, Col, Row, Input, Modal, Badge, Descriptions, Popover, DatePicker, Statistic, notification
} from 'antd';
import { React, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { LargeLoader } from '../../components/Loader';
import moment from 'moment'
import Highlighter from 'react-highlight-words';
import styled from 'styled-components';
import { changeOrderStatus, getOrderByID, listOrders } from '../../actions/orderAction';
import LinesEllipsis from 'react-lines-ellipsis'
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import get from "lodash.get"
import isequal from "lodash.isequal"

const { Countdown } = Statistic;
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
    const [visible, setVisible] = useState(false);
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const dispatch = useDispatch();
    const dataOrder = useSelector((state) => state.orderList);
    const orderChangeStatusSelector = useSelector((state) => state.orderChangeStatus);
    const orderDishGetByIdSelector = useSelector((state) => state.orderGetById);
    const orderDetailLoading = orderDishGetByIdSelector.loading
    const orderDetailData = orderDishGetByIdSelector.orderDetail
    const { success } = orderChangeStatusSelector;
    const { loading, orders } = dataOrder
    let countDish = 0;
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
    const navigate = useNavigate();



    useEffect(() => {
        let currentDate = new Date();
        let tomorrowDate = currentDate.setDate(currentDate.getDate() + 1);
        let today = currentDate.setDate(currentDate.getDate() - 1);
        dispatch(listOrders(moment(today).format('YYYY-MM-DD'), moment(tomorrowDate).format('YYYY-MM-DD')));
        //Get Tomorrow Date
    }, [success]);

    const showModal = (order) => {
        console.log('hee');
        dispatch(getOrderByID(order.orderId))
        setOrderDetailModal(order);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        flag = true;
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        console.log('Cancel');
        flag = true;
    };

    const hide = () => {
        setVisible(false);
    };

    const handleVisibleChange = (newVisible) => {
        setVisible(newVisible);
    };
    //Handle Search Prop
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };




    const changeOrderStatusHandle = (id, status) => {
        dispatch(changeOrderStatus(id, status))
        message.success(`Order change id: ${id} to status: ${status === 1 ? 'Pending' : status === 2 ? 'Success' : 'Cancel'}`)
    }
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
    const { RangePicker } = DatePicker;
    const refreshListOrder = () => {
        let currentDate = new Date();
        let tomorrowDate = currentDate.setDate(currentDate.getDate() + 1);
        let today = currentDate.setDate(currentDate.getDate() - 1);
        dispatch(listOrders(moment(today).format('YYYY-MM-DD'), moment(tomorrowDate).format('YYYY-MM-DD')));
    }
    const dateOnchangeHandle = (value) => {
        if (value === null) {
            return
        }
        console.log(moment(value[0]).format('YYYY-MM-DD'))
        console.log(moment(value[1]).format('YYYY-MM-DD'))
        const startDate = moment(value[0]).format('YYYY-MM-DD');
        const endDate = moment(value[1]).format('YYYY-MM-DD')

        dispatch(listOrders(startDate, endDate));
    }



    const dishFinishHandle = () => {
        let newDish = countDish + 1;
        countDish = newDish;
        console.log(countDish)
        //if all dish finish then changed status of order detail
        console.log(isModalVisible)
        console.log('flag', flag);
        if (countDish === ordDetailData.length && flag === false) {
            openNotificationWithIcon('success');
        }
    }

    let doneDish;
    const onDoneHandle = (id) => {
        doneDish = id
        console.log(doneDish);
        console.log("huhu");
        console.log(id);
    }

    const ordDetailData = [
        {
            "id": 412,
            "orderId": 517,
            "quantity": 6,
            "price": 17000.0,
            "createdDate": "2022-07-31T16:38:34.000+00:00",
            "createdBy": "admin",
            "updatedDate": "2022-07-31T16:38:34.000+00:00",
            "updatedBy": "admin",
            "isEnabled": false,
            "isDeleted": false,
            "orderDishNumber": 0,
            "dishTimeFinished": 0.3,
            "dishItem": {
                "id": 22,
                "dishName": "Phở Hà Nội Đặc Biệt",
                "subCategory": {
                    "id": 8,
                    "subCategoryName": "Cake",
                    "category": {
                        "id": 3,
                        "categoryName": "Drink",
                    },
                    price: "18000",
                },
            }
        },
        {
            "id": 112,
            "orderId": 517,
            "quantity": 6,
            "price": 17000.0,
            "createdDate": "2022-07-31T16:38:34.000+00:00",
            "createdBy": "admin",
            "updatedDate": "2022-07-31T16:38:34.000+00:00",
            "updatedBy": "admin",
            "isEnabled": false,
            "isDeleted": false,
            "orderDishNumber": 0,
            "dishTimeFinished": 0.2,
            "dishItem": {
                "id": 44,
                "dishName": "Cơm Canteen",
                "subCategory": {
                    "id": 8,
                    "subCategoryName": "Cake",
                    "category": {
                        "id": 3,
                        "categoryName": "Drink",
                    },
                    price: "18000",
                },
            }
        },
        {
            "id": 311,
            "orderId": 517,
            "quantity": 6,
            "price": 17000.0,
            "createdDate": "2022-07-31T16:38:34.000+00:00",
            "createdBy": "admin",
            "updatedDate": "2022-07-31T16:38:34.000+00:00",
            "updatedBy": "admin",
            "isEnabled": false,
            "isDeleted": false,
            "orderDishNumber": 0,
            "dishTimeFinished": 0.12,
            "dishItem": {
                "id": 123,
                "dishName": "CocaCola",
                "subCategory": {
                    "id": 8,
                    "subCategoryName": "Cake",
                    "category": {
                        "id": 3,
                        "categoryName": "Drink",
                    },
                    price: "18000",
                },
            }
        }
    ]

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
                let coundown = record.dishItem.finishedTime * 60;
                if (doneDish === record.id) {
                    coundown = 0;
                }
                return <Countdown value={Date.now() + coundown * 1000} onFinish={dishFinishHandle} />; // just for decoration
            }
        },

        {
            title: 'Action',
            key: 'action',
            render: (text, record) => {
                return <Button onClick={() => onDoneHandle(record.id)}>Mask As Done</Button>
            }
        },



    ];

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


    if (orderDetailLoading === false) {
        listDishOrder = orderDetailData;
    }



    return (
        <>
            <Breadcrumb style={{ marginTop: 10 }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">List Order</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Divider orientation="right">  <Button type="" size="middle" onClick={refreshListOrder}>Refresh</Button></Divider>

            {loading === true && <>
                <br></br> <br /> <br />
                <br></br> <br /> <br />
                <Row>
                    <Col span={5}></Col>
                    <Col span={5}></Col>
                    <Col span={5}><LargeLoader /></Col>
                    <Col span={5}></Col>
                </Row></>}

            {loading === false &&
                <>
                    <div>
                        <Row>
                            <Col span={8}></Col>
                            <Col span={8}></Col>
                            <Col span={8}> <RangePicker onChange={(value) => dateOnchangeHandle(value)} /></Col>
                        </Row>
                    </div>
                    <StyledTable dataSource={orders} className="table-striped-rows">
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
                        <Column title="User's Order"  dataIndex={["user", "first_name"]} {...getColumnSearchProps(["user", "first_name"],)} key="createdBy" />
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
                                    <Popover content={<div>
                                        <Space
                                            direction="vertical"
                                            size="small"
                                            style={{
                                                display: 'flex',
                                            }}
                                        >
                                            <a className='txtLink' onClick={() => { changeOrderStatusHandle(record.orderId, 2) }}>Change to OrderSuccess</a>
                                            <a className='txtLink' onClick={() => { changeOrderStatusHandle(record.orderId, 1) }}>Change to OrderPending</a>
                                            <a className='txtLink' onClick={() => { changeOrderStatusHandle(record.orderId, 4) }}>Change to OrderCancel</a>
                                        </Space>
                                    </div>} title="Change Status" trigger="click">
                                        <a style={{ color: 'blue' }}>Change Status</a>
                                    </Popover>
                                </Space>
                            )}
                        />
                    </StyledTable>
                </>
            }

            <Modal title="Detail Order" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Ok" width={'70%'}>
                {orderDetailModal.status !== 2 && orderDetailModal.status !== 4 &&
                    <>
                        <Row style={{ marginBottom: 10 }}>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                            <Col span={6}></Col>
                            <Col span={6}>
                                <Button type='primary' style={{ marginRight: 20 }}>Done Order</Button>
                                <Button type='danger'>Cancel Order</Button>
                            </Col>
                        </Row>
                    </>
                }

                <Descriptions title="" layout="vertical" bordered>
                    <Descriptions.Item label="Order Number" style={{ width: "20%" }}><b>{orderDetailModal.orderNumber}</b></Descriptions.Item>
                    <Descriptions.Item label="Total Money"><b>{orderDetailModal.total}</b></Descriptions.Item>
                    {/* <Descriptions.Item label="Order By" span={2}>
                        <b>{orderDetailModal.user.first_name} {orderDetailModal.user.last_name}</b>
                    </Descriptions.Item>
                    <Descriptions.Item label="User Phone Number"><b><i>{orderDetailModal.user.phone}</i></b></Descriptions.Item> */}
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
                {orderDetailModal.status === 4 &&
                    <>
                        <Row style={{ marginBottom: 10 }}>
                            <Col span={10}></Col>
                            <Col span={10}><h3 style={{ color: 'red' }}>Order Cancel</h3></Col>
                            <Col span={10}></Col>
                        </Row>
                    </>
                }
                {orderDetailModal.status === 2 && <>
                    <Row style={{ marginBottom: 10 }}>
                        <Col span={8}></Col>
                        <Col span={8}><h3 style={{ color: 'green' }}>Order Success</h3></Col>
                        <Col span={8}></Col>
                    </Row>
                </>}
                {/* {orderDetailModal.status !== 4 && orderDetailModal.status !== 2 && <Table columns={columns} dataSource={orderDetailData} />} */}
                { <Table columns={columns} dataSource={orderDetailData} />}
                <h2></h2>
                <h4> <Col span={12}>List Table Booked
                </Col></h4>
                <Table columns={columnsTable} dataSource={orderDetailModal.bookTable.listTable} />

            </Modal>
        </>
    )
}

export default ListOrderScreen;