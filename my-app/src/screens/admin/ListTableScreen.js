import {
    Space, Table, Breadcrumb, message, Popconfirm, Form, Button, Input, Divider, Tag, Row, Col, DatePicker, Popover, notification, Modal
} from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import styled from 'styled-components';
import moment from 'moment'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { LargeLoader } from '../../components/Loader';
import Loader from '../../components/Loader';
import { listSubcategory } from '../../actions/categoryAction';
import { changeTableStatus, listTables } from '../../actions/tableAction';
import LinesEllipsis from 'react-lines-ellipsis'
import axios from 'axios';

const { Column, ColumnGroup } = Table;
const { RangePicker } = DatePicker;
const { Search } = Input;


const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 20,
            offset: 0,
        },
        sm: {
            span: 20,
            offset: 8,
        },
    },
};


const StyledTable = styled((props) => <Table {...props} />)`
  && tbody > tr:hover > td {
    background: rgba(208, 225, 225);
  }
  thead > tr > th {
    background-color: rgba(202, 235, 199);
  }
  `;


const openNotificationWithIcon = (type, description) => {
    notification[type]({
        message: 'Notification!',
        description: description
    });
};

const ListTableScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [addLoading, setAddLoading] = useState(false);
    const userLoginInfo = useSelector((state) => state.userLogin);
    const { userInfo } = userLoginInfo;
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
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

    //Get data from API
    const navigate = useNavigate();
    const listTableSelector = useSelector((state) => state.tableList);
    const { loading, tables } = listTableSelector;
    const tableStatusSelector = useSelector((state) => state.tableChangeStatus);
    const tableChangeStatusSuccess = tableStatusSelector.success
    const [form] = Form.useForm();
    const tableEditSelector = useSelector((state) => state.tableEdit);
    const isEditSuccess = tableEditSelector.success;


    //Called when when mounting
    const dispatch = useDispatch();
    useEffect(() => {
        if (isEditSuccess === true) {
            openNotificationWithIcon("success", "Update Table Successful!")
        }
        dispatch(listTables());
    }, [tableChangeStatusSuccess]);



    // Delete Update Form
    const confirm = (id) => {
        console.log(id);
        message.success('Delete successful');

    };

    const cancel = (e) => {
        console.log(e);
    };



    const changeTableStatusHandle = (id, previousStatus, statusChange) => {

        if ((previousStatus === 1 && statusChange === 8) || (previousStatus === 8 && statusChange === 1)) {
            openNotificationWithIcon("error", "Can not Book a Table Unavailable or Unavailable a Table Booked!")
            return
        }

        if (previousStatus === 8 && statusChange === 4) {
            openNotificationWithIcon("error", "Can not cancel a Table Unavailable!")
            return
        }
        console.log("Change")
        openNotificationWithIcon("success", "Change Status Table Successful!")
        dispatch(changeTableStatus(id, statusChange))
    }

    const editTableHandle = (table) => {
        navigate('/admin/edittable', {
            state: {
                id: table.id,
                tableNumber: table.tableNumber,
                description: table.description,
                type: table.type,
                status: table.status,
                createdBy: table.createdBy,
                createdDate: table.createdDate,
            }
        })
    }

    const addTable = async (values) => {
        try {

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.accessToken}`,
                },
            }
            const status = 0;
            const type = 0;
            const description = values.description;
            console.log({ description })

            const canteenId = 1;
            const { data } = await axios.post(`/table/addOrUpdate`, { description, canteenId, status, type, }, config)
            dispatch(listTables());
            setIsModalVisible(false);
            openNotificationWithIcon("success", "ADD TABLE SUCCESS!")

        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            console.log(message);
        }
    }

    return (
        <>
            <Breadcrumb style={{ marginTop: 10 }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">List Table</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Divider orientation="right">  <Button type="primary" size="middle" onClick={showModal}>Add Table</Button></Divider>

            {loading === true && <>
                <br></br> <br /> <br />
                <br></br> <br /> <br />
                <Row>
                    <Col span={5}></Col>
                    <Col span={5}></Col>
                    <Col span={5}><LargeLoader /></Col>
                    <Col span={5}></Col>
                </Row></>}
            {/* <div>
                <Row>
                    <Col span={6}>col-6</Col>
                    <Col span={6}>col-6</Col>
                    <Col span={6}> <RangePicker /></Col>
                    <Col span={6}><Search placeholder="input search text" enterButton="Search" loading /></Col>
                </Row>
            </div> */}
            {loading === false && <StyledTable dataSource={tables?.reverse() || []} className="table-striped-rows" >
                <Column title="Table Number " dataIndex="tableNumber" key="tableNumber" {...getColumnSearchProps('tableNumber')}

                />
                <Column title="Description" dataIndex="description" key="description" width={'20%'} render={(_, record) => (<LinesEllipsis
                    text={record.description}
                    maxLine='1'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                />)} />
                <Column title="Status" dataIndex="status" key="status"

                    render={(_, record) => (record.status === 1 ? (<p style={{ color: 'green' }}>Booked</p>) : record.status === 2 ? (<p style={{ color: 'blue' }}>Free</p>) : record.status === 4 ? (<p style={{ color: 'red' }}>Cancel</p>) : (<p style={{ color: 'gray' }}>Unavailable</p>))}
                    filters={[
                        {
                            text: 'Table Booked',
                            value: 1,
                        },
                        {
                            text: 'Table Free',
                            value: 2,
                        },
                        {
                            text: 'Table Unavailable',
                            value: 8,
                        },
                    ]}
                    onFilter={(value, record) => record.status === value}
                />
                <Column title="Created Date" dataIndex="createdDate" render={(_, record) => (moment(record.createdDate).format('DD/MM/YYYY'))} key="createdDate" sorter={(a, b) => moment(a.createdDate).unix() - moment(b.createdDate).unix()} />
                <Column title="Created By" dataIndex="createdBy" key="createdBy"  {...getColumnSearchProps("createdBy")} />
                <Column title="Updated Date" dataIndex="updatedDate" render={(_, record) => (moment(record.updatedDate).format('DD/MM/YYYY'))} key="updatedTime" sorter={(a, b) => moment(a.updatedDate).unix() - moment(b.updatedDate).unix()} />
                <Column title="Updated By" dataIndex="updatedBy" {...getColumnSearchProps("updatedBy")} key="updatedBy" />


                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <a onClick={() => editTableHandle(record)}>
                                <EditOutlined style={{ fontSize: 17 }} />
                            </a>
                            <Popover content={<div>
                                <Space
                                    direction="vertical"
                                    size="small"
                                    style={{
                                        display: 'flex',
                                    }}
                                >
                                    {record.status !== 1 &&
                                        <Popconfirm
                                            title="Are you sure to change this status?"
                                            onConfirm={() => changeTableStatusHandle(record.id, record.status, 1)}
                                            onCancel={() => console.log(record.id)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <a className='txtLink'>Table Booked</a>

                                        </Popconfirm>
                                    }
                                    {record.status !== 2 && <Popconfirm
                                        title="Are you sure to change this status?"
                                        onConfirm={() => changeTableStatusHandle(record.id, record.status, 2)}
                                        onCancel={() => console.log(record.id)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <a className='txtLink'>Table Free</a>

                                    </Popconfirm>}
                                    {record.status !== 8 && <Popconfirm
                                        title="Are you sure to change this status?"
                                        onConfirm={() => changeTableStatusHandle(record.id, record.status, 8)}
                                        onCancel={() => console.log(record.id)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <a className='txtLink' >Table Unavailable</a>

                                    </Popconfirm>}

                                </Space>
                            </div>} title="Change Status" trigger="click">
                                <a style={{ color: 'blue' }}>Change Status</a>
                            </Popover>
                        </Space>
                    )}
                />
            </StyledTable>}


            <Modal title="ADD TABLE" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={'30%'}>
                <Form
                    onFinish={addTable}
                >
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input code here!',
                                whitespace: true
                            },
                        ]}
                    >
                        <Input.TextArea showCount maxLength={1000} style={{ height: 200 }} />
                    </Form.Item>
                    <Form.Item  {...tailFormItemLayout}
                    >
                        <Space size={'middle'}>
                            <Button type="primary" htmlType="submit" size='middle' >
                                ADD TABLE
                            </Button>
                            {addLoading && <Loader />}
                        </Space>


                    </Form.Item>
                    <h1></h1>
                </Form>

            </Modal>
        </>

    );
};

export default ListTableScreen;