import {
    Space, Table, Breadcrumb, message, Popconfirm, Form, Divider, Button, Col, Row, Input, Modal, Badge, Descriptions, Popover
} from 'antd';
import { React, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { changeCategoryStatus } from '../../actions/categoryAction';
import { LargeLoader } from '../../components/Loader';
import moment from 'moment'
import Highlighter from 'react-highlight-words';
import styled from 'styled-components';
import { listOrders } from '../../actions/orderAction';
import LinesEllipsis from 'react-lines-ellipsis'
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
const { Column } = Table;

const StyledTable = styled((props) => <Table {...props} />)`
&& tbody > tr:hover > td {
  background: rgba(208, 225, 225);
}
thead > tr > th {
  background-color: rgba(202, 235, 199);
}
`;

const ListOrderScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const dispatch = useDispatch();
    const dataOrder = useSelector((state) => state.orderList);
    const categoryChangeStatusSelector = useSelector((state) => state.categoryChangeStatus);
    const { success } = categoryChangeStatusSelector;
    const { loading, orders } = dataOrder
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
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(listOrders());
    }, [success]);

    const showModal = (order) => {
        setIsModalVisible(true);
        setOrderDetailModal(order);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
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
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
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
    const content = (
        <div>
            <p>Content</p>
            <p>Content</p>
        </div>
    );

    const changeCategoryStatusHandle = (id, status) => {
        message.success("change Category status success")
    }
    return (
        <>

            <Breadcrumb style={{ marginTop: 10 }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">List Order</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Divider orientation="right">  <Button type="" size="middle" disabled><Link to={''} style={{ textDecoration: 'none' }}>Add Order</Link></Button></Divider>
            {loading === true && <>
                <br></br> <br /> <br />
                <br></br> <br /> <br />
                <Row>
                    <Col span={5}></Col>
                    <Col span={5}></Col>
                    <Col span={5}><LargeLoader /></Col>
                    <Col span={5}></Col>
                </Row></>}
            {loading === false && <StyledTable dataSource={orders} className="table-striped-rows">
                <Column title="Order Number" dataIndex="orderNumber" key="orderNumber" {...getColumnSearchProps('orderNumber')} />
                <Column title="description" dataIndex="description" key="description" width={'20%'}
                    render={(_, record) => (<LinesEllipsis
                        text={record.description}
                        maxLine='1'
                        ellipsis='...'
                        trimRight
                        basedOn='letters'
                    />)}
                />
                <Column title="Status" dataIndex="status"
                    filters={[
                        {
                            text: '1',
                            value: 1,
                        },
                        {
                            text: '2',
                            value: 2,
                        },
                        {
                            text: '3',
                            value: 3,
                        },
                    ]}
                    onFilter={(value, record) => record.status === value}
                    key="status"
                />
                <Column title="Total Price" dataIndex="total" key="total" sorter={(a, b) => a.total - b.total} />
                <Column title="User's Order" dataIndex="createdBy" render={(_, record) => `${record.user.first_name} ${record.user.last_name}`} key="createdBy" />
                <Column title="Order Created Time" dataIndex="createdTimme" render={(_, record) => (moment(record.createdTimme).format('LLLL'))} key="created_time" />
                <Column title="Table Booked" dataIndex="bookTable"
                    render={(_, record) => record.bookTable.listTable.map(e => (
                        e.tableNumber + ', '
                    )
                    )
                    }
                    key="createdBy" />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <a ><EyeOutlined onClick={() => showModal(record)} /></a>
                            <Popconfirm
                                title="Are you sure to delete this task?"
                          
                                okText="Yes"
                                cancelText="No"
                            >
                                <a style={{ color: 'blue' }}>Change Status</a>
                            </Popconfirm>
                        </Space>
                    )}
                />
            </StyledTable>}


            {/* Modal show detail order */}
            <Modal title="Detail Order" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Changed Status" width={'50%'}>
                <Descriptions title="Order Info" layout="vertical" bordered>
                    <Descriptions.Item label="Order Number"><b>{orderDetailModal.orderNumber}</b></Descriptions.Item>
                    <Descriptions.Item label="Total Money"><b>{orderDetailModal.total}</b></Descriptions.Item>
                    <Descriptions.Item label="Order By" span={2}>
                        <b>{orderDetailModal.user.first_name} {orderDetailModal.user.last_name}</b>
                    </Descriptions.Item>
                    <Descriptions.Item label="User Phone Number"><b><i>{orderDetailModal.user.phone}</i></b></Descriptions.Item>
                    <Descriptions.Item label="Order Started Time"><b>{moment(orderDetailModal.createdTimme).format('LLLL')}</b></Descriptions.Item>
                    <Descriptions.Item label="Order Status" span={3}>
                        <Badge status={orderDetailModal.status === 1 ? "processing" : "success"} text={orderDetailModal.status === 1 ? "Order Pending" : "Order Success"} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Table Booked"><b>{orderDetailModal.bookTable.listTable.map(e => (e.tableNumber + ', '))}</b></Descriptions.Item>
                    <Descriptions.Item label="Estimate Time">{orderDetailModal.bookTable.estimateReceiveTime === undefined ? "null" : orderDetailModal.bookTable.estimateReceiveTime}</Descriptions.Item>
                    <Descriptions.Item label="Table Status">
                        <Badge status={orderDetailModal.bookTable.status === 1 ? "success" : "processing"} text={orderDetailModal.bookTable.status === 1 ? "Table Booked" : "Table Free"} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Description">
                        {orderDetailModal.description}
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        </>
    )
}

export default ListOrderScreen;