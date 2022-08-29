import {
    Space, Table, Breadcrumb, message, Popconfirm, Form, Button, Input, Divider, Tag, Row, Col, notification
} from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { changeMenuStatus, listMenus } from '../../actions/menuAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import styled from 'styled-components';
import moment from 'moment'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Loader, LargeLoader } from '../../components/Loader';
import get from "lodash.get"
import isequal from "lodash.isequal"

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


const ListMenuScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

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


    const navigate = useNavigate();
    const menuListSelector = useSelector((state) => state.menuList);
    const updateMenuSelector = useSelector((state) => state.menuEdit);

    const updateMenuSuccess = updateMenuSelector.menus
    const updateMenuLoading = updateMenuSelector.loading
    const changeMenuStatusSelector = useSelector((state) => state.menuChangeStatus);
    const { success } = changeMenuStatusSelector;
    const { loading, menus } = menuListSelector;
    const [form] = Form.useForm();
    const location = useLocation();

    const dispatch = useDispatch();


    useEffect(() => {
        if (updateMenuLoading === false) {
            if (updateMenuSuccess.success === true) {
                openNotificationWithIcon('success', 'UPDATE MENU SUCCESSFUL');
            }
        }
        dispatch(listMenus());
    }, [changeMenuStatusSelector]);


    // Delete Update Form
    const confirm = (id) => {
        console.log(id);
        message.success('Delete successful');
    };

    const cancel = (e) => {
        console.log(e);
    };

    const changeStatusHandle = (id, status) => {
        if (status === 1) {
            openNotificationWithIcon('error', 'IN THE LIST MENU SHOULD HAS ONLY LEAST ONE MENU ACTIVE');
            return
        }
        console.log(id, status);
        openNotificationWithIcon('success', 'CHANGE MENU STATUS SUCCESSFUL');
        dispatch(changeMenuStatus(id, status));
    };

    const menuDetailHandler = (id) => {
        navigate('/admin/menudetail', {
            state: {
                id: id
            }
        })
    }

    const editMenuHandle = (id, menuName, description, status, createdBy, createdTime) => {
        navigate('/admin/editmenu', {
            state: {
                id: id,
                menuName: menuName,
                description: description,
                status: status,
                createdBy: createdBy,
                createdTime: createdTime
            }
        })
    }

    return (
        <>
            <Breadcrumb style={{ marginTop: 10 }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">List Menus</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Divider orientation="right">  <Button type="primary" size="middle" ><Link to={'/admin/addmenu'} style={{ textDecoration: 'none' }}>Add Menu</Link></Button></Divider>

            {loading === true && <>
                <br></br> <br /> <br />
                <br></br> <br /> <br />
                <Row>
                    <Col span={5}></Col>
                    <Col span={5}></Col>
                    <Col span={5}><LargeLoader /></Col>
                    <Col span={5}></Col>
                </Row></>}

            {loading === false && <StyledTable dataSource={menus} className="table-striped-rows" >
                <Column title="Menu Name" dataIndex="menuName" key="menuName" {...getColumnSearchProps('menuName')} />
                <Column title="Description" dataIndex="description" key="description" render={(_, record) => record.description.length > 50 ? `${record.description.substring(0, 40)}...` : record.description} />
                <Column title="Menu Status" dataIndex="status" render={(_, record) => (record.status == 1 ? <p style={{ color: "green" }}>Enable</p> : <p style={{ color: "red" }}>Disable</p>)}
                    filters={[{
                        text: 'Enable',
                        value: 1,
                    }, {
                        text: 'Disable',
                        value: 0,
                    },]} onFilter={(value, record) => record.status === value}
                    key="status" />
                <Column title="Created Time" dataIndex="createdTime" key="createdTime" render={(_, record) => (moment(record.createdTime).format('DD/MM/YYYY'))} sorter={(a, b) => moment(a.createdTime).unix() - moment(b.createdTime).unix()} />
                <Column title="Created By" dataIndex="createdBy" key="createdBy" {...getColumnSearchProps('createdBy')} />

                <Column title="Updated Time" dataIndex="updatedTime" key="updatedTime" render={(_, record) => (moment(record.updatedTime).format('DD/MM/YYYY'))} sorter={(a, b) => moment(a.updatedTime).unix() - moment(b.updatedTime).unix()} />
                <Column title="Updated By" dataIndex="updatedBy" key="updatedBy" {...getColumnSearchProps('updatedBy')} />

                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <a onClick={() => { changeStatusHandle(record.id, record.status) }}>{record.status == 1 ? <Tag color="error">Change Status</Tag> : <Tag color="green">Change Status</Tag>}</a>
                            <a onClick={() => { menuDetailHandler(record.id) }}><EyeOutlined /></a>
                            <a onClick={() => { editMenuHandle(record.id, record.menuName, record.description, record.status, record.createdBy, record.createdTime) }}><EditOutlined style={{ fontSize: 17 }} /></a>
                        </Space>
                    )}
                />
            </StyledTable>}

        </>

    );
};

export default ListMenuScreen;