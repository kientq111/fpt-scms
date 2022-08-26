import {
    Space, Table, Breadcrumb, message, Popconfirm, Form, Button, Input, Divider, Tag, Row, Col, notification, Modal
} from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import styled from 'styled-components';
import moment from 'moment'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Loader, LargeLoader } from '../../components/Loader';
import { changeCategoryStatus, changeSubCategoryStatus, listSubcategory } from '../../actions/categoryAction';
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



const ListSubCategoryScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const navigate = useNavigate();
    const subCategoryData = useSelector((state) => state.subcategoryList);
    const subCategoryEditSelector = useSelector((state) => state.subCategoryEdit);
    const isSubCategoryEditSuccess = subCategoryEditSelector.success
    const changeSubCategoryStatusSelector = useSelector((state) => state.subCategoryChangeStatus);
    const { success } = changeSubCategoryStatusSelector;
    const { loading, subcategoryInfo } = subCategoryData;
    const [form] = Form.useForm();
    const [userDetailModal, setUserDetailModal] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);

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



    const showModal = (record) => {
        setUserDetailModal({
            subCategoryName: record.subCategoryName,
            description: record.description,
            createdTime: record.createdTime,
            createdBy: record.createdBy,
            updatedBy: record.updatedBy,
            updatedTime: record.updatedTime,
            categoryName: record.category.categoryName
        })
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    //Called when when mounting
    const dispatch = useDispatch();
    useEffect(() => {
        if (isSubCategoryEditSuccess === true) {
            openNotificationWithIcon('success', 'SUBCATEGORY UPDATE SUCCESSFUL');
        }
        dispatch(listSubcategory());
    }, [success]);

    const editSubCategoryHandle = (id, name, description, createdTime, createdBy, category, status) => {
        console.log(id, name, description, createdTime, createdBy, category);
        navigate('/admin/editsubcategory', {
            state: {
                id: id,
                subCategoryName: name,
                description: description,
                createdBy: createdBy,
                createdTime: createdTime,
                category: category,
                status: status
            }
        })
    }

    const changeSubCategoryStatusHandle = (id, status) => {
        dispatch(changeSubCategoryStatus(id, status));
        openNotificationWithIcon('success', 'SUBCATEGORY CHANGE STATUS SUCCESSFUL');
    }

    return (
        <>
            <Breadcrumb style={{ marginTop: 10 }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">List SubCategory</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Divider orientation="right">  <Button type="primary" size="middle" ><Link to={'/admin/addsubcategory'} style={{ textDecoration: 'none' }}>Add SubCategory</Link></Button></Divider>

            {loading === true && <>
                <br></br> <br /> <br />
                <br></br> <br /> <br />
                <Row>
                    <Col span={5}></Col>
                    <Col span={5}></Col>
                    <Col span={5}><LargeLoader /></Col>
                    <Col span={5}></Col>
                </Row></>}

            {loading === false && <StyledTable dataSource={subcategoryInfo} className="table-striped-rows" >
                <Column title="SubCategory Name" dataIndex="subCategoryName" key="subCategoryName" {...getColumnSearchProps('subCategoryName')} />
                <Column title="Description" dataIndex="description" key="description" width={'15%'} render={(_, record) => record.description.length > 50 ? `${record.description.substring(0, 40)}...` : record.description}/>
                <Column title="Status" dataIndex="status" key="status"
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
                />
                <Column title="Created Time" dataIndex="createdTime" render={(_, record) => (moment(record.createdTime).format('DD/MM/YYYY'))} key="createdTime" sorter={(a, b) => moment(a.createdTime).unix() - moment(b.createdTime).unix()} />
                <Column title="Created By" dataIndex="createdBy" key="createdBy"  {...getColumnSearchProps('createdBy')} />
                <Column title="Updated Time" dataIndex="updatedTime" render={(_, record) => (moment(record.updatedTime).format('DD/MM/YYYY'))} key="updatedTime" sorter={(a, b) => moment(a.updatedTime).unix() - moment(b.updatedTime).unix()} />
                <Column title="Updated By" dataIndex="updatedBy" key="updatedBy"  {...getColumnSearchProps('updatedBy')} />
                <Column title="Category" dataIndex={["category", "categoryName"]} {...getColumnSearchProps(["category", "categoryName"])} key="category" />

                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <a onClick={() => showModal(record)}><EyeOutlined /></a>
                            <a onClick={() => editSubCategoryHandle(record.id, record.subCategoryName, record.description, record.createdTime, record.createdBy, record.category, record.status)}>
                                <EditOutlined style={{ fontSize: 17 }} />
                            </a>
                            <a onClick={() => changeSubCategoryStatusHandle(record.id, record.status)} style={{ color: 'blue' }}>Change Status</a>
                        </Space>
                    )}
                />
            </StyledTable>}


            <>
                <Modal title="SubCategory Detail" visible={isModalVisible} onOk={handleOk} onCancel={handleOk} width={'50%'}>
                    <p><b>Subcategory Name:</b> {userDetailModal.subCategoryName}</p>
                    <p><b>Created Time:</b> {moment(userDetailModal.created_time).format('DD/MM/YYYY')}</p>
                    <p><b>Updated Time:</b> {moment(userDetailModal.updatedTime).format('DD/MM/YYYY')}</p>
                    <p><b>Description:</b> {userDetailModal.description}</p>
                    <p><b>Category Name:</b> {userDetailModal.categoryName}</p>

                </Modal>
            </>

        </>

    );
};

export default ListSubCategoryScreen;