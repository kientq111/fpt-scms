import {
    Space, Table, Breadcrumb, message, Divider, Button, Col, Row, Input, notification, Modal
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


const ListPromoScreen = () => {
    const userLoginInfo = useSelector((state) => state.userLogin);
    const { userInfo } = userLoginInfo;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState()
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [listPromo, setListPromo] = useState([]);
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


    const getListPromo = async (startDate, endDate) => {

        try {
            setLoading(true)
            const res = await axios.get(`/promotion/getListPromotion`, {
                params: {
                    promotionName: '',
                    promotionType: '',
                    promotionStatus: '',
                    promotionFromDateCreated: '2022-08-21',
                    promotionToDateCreated: '2022-12-25',
                    createdBy: '',
                    pageSize: 100,
                    pageIndex: 1,
                },
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            })
            setLoading(false)
            setListPromo(res.data?.data)
            console.log(res.data?.data);
        } catch (error) {
            console.log(error);
        }
    }

    const changePromoStatus = async (id, status) => {
        try {

            const res = await axios.put(`/promotion/changeStatusPromotion`, {}, {
                params: {
                    status: status === 1 ? 0 : 1,
                    id: id,
                },
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            })
            console.log(res.data?.data);
        } catch (error) {
            console.log(error);
        }
    }


    const changeStatusHandle = (id, status) => {
        changePromoStatus(id, status);
        getListPromo()
    }


    const editPromoHandle = (promo) => {
        navigate('/admin/editpromo', {
            state:
            {
                id: promo.id,
                promoName: promo.name,
                description: promo.description,
                promotionPercent: promo.promotionPercent,
                salePrice: promo.salePrice,
                promotionStartDate: promo.promotionStartDate,
                promotionStartDate: promo.promotionStartDate,
                promotionEndDate: promo.promotionEndDate,
                status: promo.status,
                listDish: promo.listDish,
                createdDate: promo.createdDate,
                createdBy: promo.createdBy,
                type: promo.type,
            }
        })
    }

    useEffect(() => {
        getListPromo();
    }, []);

    return (
        <>

            <Breadcrumb style={{ marginTop: 10 }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">List Promotion</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Divider orientation="right">  <Button type="primary" size="middle" ><Link to={'/admin/addpromo'} style={{ textDecoration: 'none' }}>Add Promotion</Link></Button></Divider>


            <StyledTable dataSource={listPromo} className="table-striped-rows">
                <Column title="Promotion Name" dataIndex="name" key="name" {...getColumnSearchProps('name')} />
                <Column title="Description" dataIndex="description" key="description" width={'15%'} />
                <Column title="Promotion Percent" dataIndex="promotionPercent" key="promotionPercent" width={'2%'} render={(_, record) => `${record.promotionPercent}%`} sorter={(a, b) => a.promotionPercent - b.promotionPercent} />
                <Column title="Sale Price" dataIndex="salePrice" key="salePrice" width={'2%'} sorter={(a, b) => a.salePrice - b.salePrice} />
                <Column title="Status" dataIndex="status"
                    filters={[
                        {
                            text: 'Enable',
                            value: 1,
                        },
                        {
                            text: 'Disable',
                            value: 0,
                        },

                    ]}
                    render={(_, record) => record.status === 1 ? <p style={{ color: 'green' }}>Enable<b></b></p> : <p style={{ color: 'red' }}>Disable<b></b></p>}
                    onFilter={(value, record) => record.status === value}
                    key="status"
                />
                <Column title="Start Date" dataIndex="promotionStartDate" key="promotionStartDate" render={(_, record) => (moment(record.promotionStartDate).format('DD/MM/YYYY'))} sorter={(a, b) => moment(a.promotionStartDate).unix() - moment(b.promotionStartDate).unix()} />
                <Column title="End Date" dataIndex="promotionEndDate" key="promotionEndDate" render={(_, record) => (moment(record.promotionEndDate).format('DD/MM/YYYY'))} sorter={(a, b) => moment(a.promotionEndDate).unix() - moment(b.promotionEndDate).unix()} />
                <Column title="Created Time" dataIndex="createdTime" key="createdTime" render={(_, record) => (moment(record.createdDate).format('DD/MM/YYYY'))} sorter={(a, b) => moment(a.createdDate).unix() - moment(b.createdDate).unix()} />
                <Column title="Created By" dataIndex="createdBy" key="createdBy" {...getColumnSearchProps('createdBy')} />
                <Column title="Updated Time" dataIndex="updatedTime" key="updatedTime" render={(_, record) => (moment(record.updatedDate).format('DD/MM/YYYY'))} sorter={(a, b) => moment(a.updatedDate).unix() - moment(b.updatedDate).unix()} />
                <Column title="Updated By" dataIndex="updatedBy" key="updatedBy" {...getColumnSearchProps('updatedBy')} />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <a onClick={() => editPromoHandle(record)}><EditOutlined /></a>
                            <a className='txtLink' onClick={() => changeStatusHandle(record.id, record.status)}>Change Status</a>
                        </Space>
                    )}
                />
            </StyledTable>
        </>
    )
}

export default ListPromoScreen;