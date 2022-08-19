import {
    Space, Table, Breadcrumb, message, Popconfirm, Form, Button, Input, Divider, Tag, Row, Col, DatePicker, Modal
} from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import styled from 'styled-components';
import LinesEllipsis from 'react-lines-ellipsis'
import moment from 'moment'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { LargeLoader } from '../../components/Loader';
import { deleteFeedBack, listFeedBack } from '../../actions/feedbackAction';
const { Column } = Table;



const StyledTable = styled((props) => <Table {...props} />)`
  && tbody > tr:hover > td {
    background: rgba(208, 225, 225);
  }
  thead > tr > th {
    background-color: rgba(202, 235, 199);
  }
  `;

const ListFeedBackScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    //Get data from API
    const navigate = useNavigate();
    const listFeedBackSelector = useSelector((state) => state.feedbackList);
    const { loading, feedbacks } = listFeedBackSelector;
    const feedbackDeleteSelector = useSelector((state) => state.feedbackDelete);
    const { success } = feedbackDeleteSelector;
    const [form] = Form.useForm();
    const [userDetailModal, setUserDetailModal] = useState({});

    //Called when when mounting
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listFeedBack());
    }, [success]);


    // Delete Update Form
    const confirm = (id) => {
        console.log(id);
        dispatch(deleteFeedBack(id))
        message.success('Delete successful');
    };

    const cancel = (e) => {
        console.log("Cancel");
    };

    //Handle from UI
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

    const showModal = (username, content, phone, email, created_time) => {
        setUserDetailModal({
            username: username,
            content: content,
            phone: phone,
            email: email,
            created_time: created_time,
        })
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Breadcrumb style={{ marginTop: 10 }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">List Contact</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Divider orientation="right"> </Divider>

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
            {loading === false && <StyledTable dataSource={feedbacks} className="table-striped-rows" >
                <Column title="Sender" dataIndex="firstName" key="firstName" {...getColumnSearchProps('firstName')}
                />
                <Column title="Description" dataIndex="description" key="description"
                    width={'15%'}
                    render={(_, record) => (<LinesEllipsis
                        text={record.description}
                        maxLine='1'
                        ellipsis='...'
                        trimRight
                        basedOn='letters'
                    />)} />
                <Column title="Phone Number" dataIndex="phoneNumber" key="phoneNumber" {...getColumnSearchProps('phoneNumber')} />
                <Column title="Email" dataIndex="email" key="email"
                    {...getColumnSearchProps('email')}
                />
                <Column title="Created Date" dataIndex="createdDate" render={(_, record) => (moment(record.createdDate).format('DD/MM/YYYY'))} key="createdDate" sorter={(a, b) => moment(a.createdDate).unix() - moment(b.createdDate).unix()} />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <a><EyeOutlined style={{ fontSize: 17 }} onClick={() => showModal(record.firstName, record.description, record.phoneNumber, record.email, record.createdDate)} /></a>
                            {/* <Popconfirm
                                title="Are you sure to delete this task?"
                                onConfirm={() => confirm(record.id)}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <a><DeleteOutlined style={{ fontSize: 17 }} /></a>
                            </Popconfirm> */}
                        </Space>
                    )}
                />
            </StyledTable>}

            {/* Modal show detail feedback */}
            <>
                <Modal title="Contact Detail" visible={isModalVisible} onOk={handleOk} onCancel={handleOk} width={'50%'}>
                    <p><b>Sender:</b> {userDetailModal.username}</p>
                    <p><b>Phone:</b> {userDetailModal.phone}</p>
                    <p><b>Email:</b> {userDetailModal.email}</p>
                    <p><b>Time:</b> {moment(userDetailModal.created_time).format('DD/MM/YYYY')}</p>
                    <p><b>Content:</b> {userDetailModal.content}</p>
                </Modal>
            </>
        </>

    );
};

export default ListFeedBackScreen;