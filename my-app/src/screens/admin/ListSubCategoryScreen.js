import {
    Space, Table, Breadcrumb, message, Popconfirm, Form, Button, Input, Divider, Tag, Row, Col
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

const { Column, ColumnGroup } = Table;

const StyledTable = styled((props) => <Table {...props} />)`
  && tbody > tr:hover > td {
    background: rgba(208, 225, 225);
  }
  thead > tr > th {
    background-color: rgba(202, 235, 199);
  }
  `;

const ListSubCategoryScreen = () => {
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

    //Get data from API
    const navigate = useNavigate();
    const subCategoryData = useSelector((state) => state.subcategoryList);
    const changeSubCategoryStatusSelector = useSelector((state) => state.subCategoryChangeStatus);
    const { success } = changeSubCategoryStatusSelector;
    const { loading, subcategoryInfo } = subCategoryData;
    const [form] = Form.useForm();



    //Called when when mounting
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listSubcategory());
    }, [success]);



    // Delete Update Form
    const confirm = (id) => {
        console.log(id);
        message.success('Delete successful');

    };

    const cancel = (e) => {
        console.log(e);
    };

    const editSubCategoryHandle = (id, name, description, createdTime, createdBy, category) => {
        console.log(id, name, description, createdTime, createdBy, category);
        navigate('/admin/editsubcategory', {
            state: {
                id: id,
                subCategoryName: name,
                description: description,
                createdBy: createdBy,
                createdTime: createdTime,
                category: category
            }
        })
    }

    const changeSubCategoryStatusHandle = (id, status) => {
        dispatch(changeSubCategoryStatus(id, status));
        message.success("Change SubCategory Status Successful")
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
                <Column title="Description" dataIndex="description" key="description" />
                <Column title="Status" dataIndex="status" key="status" filters={[
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
                />
                <Column title="Created Time" dataIndex="createdTime" render={(_, record) => (moment(record.createdTime).format('DD/MM/YYYY'))} key="createdTime" />
                <Column title="Created By" dataIndex="createdBy" key="createdBy" />
                <Column title="Updated Time" dataIndex="updatedTime" render={(_, record) => (moment(record.updatedTime).format('DD/MM/YYYY'))} key="updatedTime" />
                <Column title="Updated By" dataIndex="updatedBy" key="updatedBy" />
                <Column title="Category" dataIndex="category" render={(_, record) => record.category.categoryName} key="category" />

                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <a onClick={() => editSubCategoryHandle(record.id, record.subCategoryName, record.description, record.createdTime, record.createdBy, record.category)}>
                                <EditOutlined style={{ fontSize: 17 }} />
                            </a>

                            <a onClick={() => changeSubCategoryStatusHandle(record.id, record.status)} style={{ color: 'blue' }}>Change Status</a>


                        </Space>
                    )}
                />
            </StyledTable>}

        </>

    );
};

export default ListSubCategoryScreen;