import {
    Space, Table, Breadcrumb, message, Divider, Button, Col, Row, Input, notification, Modal, Popconfirm
} from 'antd';
import { React, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from "react-router-dom";
import moment from 'moment'
import styled from 'styled-components';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import Highlighter from 'react-highlight-words';
const { Column, ColumnGroup } = Table;

const StyledTable = styled((props) => <Table {...props} />)`
&& tbody > tr:hover > td {
  background: rgba(208, 225, 225);
}
thead > tr > th {
  background-color: rgba(202, 235, 199);
}
`;

const openNotificationWithIcon = (type, message) => {
    notification[type]({
        message: message
    });
};


const ListCouponScreen = () => {
    const userLoginInfo = useSelector((state) => state.userLogin);
    const { userInfo } = userLoginInfo;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState()
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [listCoupon, setListCoupon] = useState([]);

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


    const getListCoupon = async (startDate, endDate) => {

        try {
            setLoading(true)
            const res = await axios.get(`/coupon/getListCoupon`, {
                params: {
                    type: '',
                    status: '',
                    fromStartDate: '',
                    toEndDate: '',
                    createdBy: '',
                    pageIndex: 1,
                    pageSize: 100,
                },
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            })
            setLoading(false)

            setListCoupon(res?.data?.data)
        } catch (error) {
            console.log(error);
        }
    }

    const changeCouponStatus = async (id, status) => {
        try {

            const res = await axios.put(`/coupon/changeStatusCoupon`, {}, {
                params: {
                    status: status === 1 ? 0 : 1,
                    id: id,
                },
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            })
            getListCoupon()
        } catch (error) {
            console.log(error);
        }
    }

    const editCouponHandle = (coupon) => {
        navigate('/admin/editcoupon', {
            state: coupon
        })
    }

    const changeStatusHandle = (id, status) => {
        changeCouponStatus(id, status);
    }

    useEffect(() => {
        getListCoupon();
    }, []);


    return (
        <>

            <Breadcrumb style={{ marginTop: 10 }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">List Coupon</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Divider orientation="right">  <Button type="primary" size="middle" ><Link to={'/admin/addcoupon'} style={{ textDecoration: 'none' }}>Add Coupon</Link></Button></Divider>


            <StyledTable dataSource={listCoupon.reverse()} className="table-striped-rows"
                scroll={{
                    x: '200vw',
                }}
            >
                <Column title="Coupon Code" dataIndex="couponCode" key="couponCode" {...getColumnSearchProps('couponCode')} />
                <Column title="Description" dataIndex="description" key="description" render={(_, record) => record.description.length > 50 ? `${record.description.substring(0, 40)}...` : record.description} />
                <Column title="Status" dataIndex="status"
                    filters={[
                        {
                            text: 'Active',
                            value: 1,
                        },
                        {
                            text: 'Expire',
                            value: 0,
                        },

                    ]}
                    render={(_, record) => record.status === 1 ? <p style={{ color: 'green' }}>Active<b></b></p> : <p style={{ color: 'red' }}>Expire<b></b></p>}
                    onFilter={(value, record) => record.status === value}
                    key="status"
                />
                <Column title="Apply with Promotion" dataIndex="usePromotion"
                    filters={[
                        {
                            text: 'Yes',
                            value: true,
                        },
                        {
                            text: 'No',
                            value: false,
                        },

                    ]}
                    render={(_, record) => record.usePromotion === true ? <p style={{ color: 'green' }}>Yes<b></b></p> : <p style={{ color: 'red' }}>No<b></b></p>}
                    onFilter={(value, record) => record.usePromotion === value}
                    key="promotion"
                />
                <Column title="Discount Percent" dataIndex="percentDiscount" key="percentDiscount" render={(_, record) => `${record.percentDiscount === null ? '0' : record.percentDiscount}%`} sorter={(a, b) => a.percentDiscount - b.percentDiscount} align={'center'} />
                <Column title="Max Discount Money" dataIndex="maxDiscountMoney" key="maxDiscountMoney" render={(_, record) => `${record.maxDiscountMoney === null ? '0' : record.maxDiscountMoney}`} sorter={(a, b) => a.maxDiscountMoney - b.maxDiscountMoney} align={'center'}

                />
                <Column title="Discount Money" dataIndex="discountMoney" key="discountMoney" render={(_, record) => `${record.discountMoney === null ? '0' : record.discountMoney}`} sorter={(a, b) => a.discountMoney - b.discountMoney} align={'center'} />
                <Column title="Min Value Order" dataIndex="minValueOrder" key="minValueOrder" render={(_, record) => `${record.minValueOrder === null ? '0' : record.minValueOrder}`} sorter={(a, b) => a.minValueOrder - b.minValueOrder} align={'center'} />

                {/* <Column title="Min Quantity Product" dataIndex="minQuantityProduct" key="minQuantityProduct" render={(_, record) => `${record.minQuantityProduct === null ? '0' : record.minQuantityProduct}`} sorter={(a, b) => a.minQuantityProduct - b.minQuantityProduct} align={'center'} /> */}
                <Column title="Number Of Coupon" dataIndex="numberOfCoupon" key="numberOfCoupon" render={(_, record) => `${record.numberOfCoupon}`} sorter={(a, b) => a.numberOfCoupon - b.numberOfCoupon} align={'center'} />
                <Column title="Number Of Customer Use" dataIndex="numberOfCustomerUse" key="numberOfCustomerUse" render={(_, record) => `${record.numberOfCustomerUse}`} sorter={(a, b) => a.numberOfCustomerUse - b.numberOfCustomerUse} align={'center'} />
                <Column title="Coupon From Date" dataIndex="couponFromDate" key="couponFromDate" render={(_, record) => (moment(record.couponFromDate).format('DD/MM/YYYY hh:mm'))} sorter={(a, b) => moment(a.couponFromDate).unix() - moment(b.couponFromDate).unix()} />
                <Column title="Coupon To Date" dataIndex="couponToDate" key="couponToDate" render={(_, record) => (moment(record.couponToDate).format('DD/MM/YYYY hh:mm'))} sorter={(a, b) => moment(a.couponToDate).unix() - moment(b.couponToDate).unix()} />
                <Column
                    title="Action"
                    key="action"
                    fixed={"right"}
                    render={(_, record) => (
                        <Space size="middle">
                            <a onClick={() => editCouponHandle(record)}><EditOutlined /></a>
                            <Popconfirm
                                title="Are you sure to change this status?"
                                onConfirm={() => changeStatusHandle(record.id, record.status)}
                                onCancel={() => console.log(record.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <a style={{ color: 'blue' }}>Change Status</a>

                            </Popconfirm>
                        </Space>
                    )}
                />
            </StyledTable>
        </>
    )
}

export default ListCouponScreen;