import {
    Space, Table, Breadcrumb, message, Divider, Button, Col, Row, Input, notification, Modal, Popconfirm
} from 'antd';
import { React, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { changeCategoryStatus, listCategory } from '../../actions/categoryAction';
import { LargeLoader } from '../../components/Loader';
import moment from 'moment'
import styled from 'styled-components';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
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


const ListCategoryScreen = () => {
    const dispatch = useDispatch();
    const dataCategory = useSelector((state) => state.categoryList);
    const categoryChangeStatusSelector = useSelector((state) => state.categoryChangeStatus);
    const editCategorySelector = useSelector((state) => state.categoryEdit);
    const editCategorySuccess = editCategorySelector.categoryInfo;
    const { success } = categoryChangeStatusSelector;
    const { loading, categoryInfo } = dataCategory
    const navigate = useNavigate();
    const [userDetailModal, setUserDetailModal] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
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




    useEffect(() => {
        if (editCategorySuccess) {
            if (editCategorySuccess.success === true) {
                openNotificationWithIcon('success', 'UPDATE CATEGORY SUCCESSFUL');
            }
        }

        dispatch(listCategory());
    }, [success]);

    const editCategoryHandle = (id, categoryName, description, createdBy, createdTime) => {
        navigate('/admin/editcategory', {
            state:
            {
                id: id,
                categoryName: categoryName,
                description: description,
                createdTime: createdTime,
                createdBy: createdBy,
            }
        })
    }

    const changeCategoryStatusHandle = (id, status) => {
        openNotificationWithIcon('success', 'CATEGORY CHANGE STATUS SUCCESSFUL');
        dispatch(changeCategoryStatus(id, status))
    }

    const showModal = (record) => {
        setUserDetailModal({
            categoryName: record.categoryName,
            description: record.description,
            createdTime: record.createdTime,
            createdBy: record.createdBy,
            updatedBy: record.updatedBy,
            updatedTime: record.updatedTime,
            subcategory: record.subcategory
        })
        setIsModalVisible(true);
    };

    const dataSource = userDetailModal.subcategory;


    const columns = [
        {
            title: 'SubCategory Name',
            dataIndex: 'subCategoryName',
            key: 'subCategoryName',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                return record.status === 1 ? <p style={{ color: 'green' }}>Enable</p> : <p style={{ color: 'red' }}>Disable</p>; // just for decoration
            }
        },
    ];

    const handleOk = () => {
        setIsModalVisible(false);
    };
    return (
        <>

            <Breadcrumb style={{ marginTop: 10 }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">List category</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Divider orientation="right">  <Button type="primary" size="middle" ><Link to={'/admin/addcategory'} style={{ textDecoration: 'none' }}>Add Category</Link></Button></Divider>
            {loading === true && <>
                <br></br> <br /> <br />
                <br></br> <br /> <br />
                <Row>
                    <Col span={5}></Col>
                    <Col span={5}></Col>
                    <Col span={5}><LargeLoader /></Col>
                    <Col span={5}></Col>
                </Row></>}
            {loading === false && <StyledTable dataSource={categoryInfo.reverse()} className="table-striped-rows">
                <Column title="categoryName" dataIndex="categoryName" key="categoryName" {...getColumnSearchProps('categoryName')} />
                <Column title="description" dataIndex="description" key="description" width={'15%'} render={(_, record) => record.description.length > 50 ? `${record.description.substring(0, 40)}...` : record.description} />
                <Column title="Total Subcategory" dataIndex="subcategory" render={(_, record) => record.subcategory.length} key="sub" sorter={(a, b) => a.subcategory.length - b.subcategory.length} />
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
                <Column title="Created Time" dataIndex="createdTime" key="createdTime" render={(_, record) => (moment(record.createdTime).format('DD/MM/YYYY'))} sorter={(a, b) => moment(a.createdTime).unix() - moment(b.createdTime).unix()} />
                <Column title="Created By" dataIndex="createdBy" key="createdBy" {...getColumnSearchProps('createdBy')} />

                <Column title="Updated Time" dataIndex="updatedTime" key="updatedTime" render={(_, record) => (moment(record.updatedTime).format('DD/MM/YYYY'))} sorter={(a, b) => moment(a.updatedTime).unix() - moment(b.updatedTime).unix()} />
                <Column title="Updated By" dataIndex="updatedBy" key="updatedBy" {...getColumnSearchProps('updatedBy')} />

                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <a onClick={() => showModal(record)}><EyeOutlined /></a>
                            <Popconfirm
                                title="Are you sure to change this status?"
                                onConfirm={() => changeCategoryStatusHandle(record.id, record.status)}
                                onCancel={() => console.log(record.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <a style={{ color: 'blue' }}>Change Status</a>

                            </Popconfirm>
                            <a onClick={() => editCategoryHandle(record.id, record.categoryName, record.description, record.createdBy, record.createdTime)}><EditOutlined /></a>
                        </Space>
                    )}
                />
            </StyledTable>}


            <>
                <Modal title="Category Detail" visible={isModalVisible} onOk={handleOk} onCancel={handleOk} width={'50%'}>
                    <p><b>Category Name:</b> {userDetailModal.categoryName}</p>
                    <p><b>Created Time:</b> {moment(userDetailModal.created_time).format('DD/MM/YYYY')}</p>
                    <p><b>Updated Time:</b> {moment(userDetailModal.updatedTime).format('DD/MM/YYYY')}</p>
                    <p><b>Description:</b> {userDetailModal.description}</p>
                    <h5>SubCategory Table</h5>
                    <Table dataSource={dataSource} columns={columns} />;
                </Modal>
            </>
        </>
    )
}

export default ListCategoryScreen;