import {
    Space, Table, Breadcrumb, message, Popconfirm, Form, Button, Input, Divider, Tag, Col, Row
} from 'antd';
import { React, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { changeDishStatus, listDishes } from '../../actions/dishAction';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import moment from 'moment'
import LinesEllipsis from 'react-lines-ellipsis'
import { DeleteOutlined, EditOutlined, UserAddOutlined, EyeOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { LargeLoader } from '../../components/Loader';
const { Column, ColumnGroup } = Table;

const StyledTable = styled((props) => <Table {...props} />)`
  && tbody > tr:hover > td {
    background: rgba(208, 225, 225);
  }
  thead > tr > th {
    background-color: rgba(202, 235, 199);
  }
  `;


const ListDishScreen = () => {

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const indexColumn = 1;

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

    const dispatch = useDispatch();
    const dataDish = useSelector((state) => state.dishList);
    const dishStatusSelector = useSelector((state) => state.dishChangestatus);
    const { success } = dishStatusSelector;
    const { loading, dishes } = dataDish

    useEffect(() => {
        dispatch(listDishes());
        console.log(dataDish);
        console.log(dishStatusSelector)
    }, [success]);


    //Delete Update Form
    const changeStatusHandle = (id, status) => {
        console.log(id, status);
        dispatch(changeDishStatus(id, status));
        message.success('Update Status successful');
    };

    const updateDishHandle = (id, dishName, subCategory, description, createdTime, createdBy) => {
        console.log(id, dishName, subCategory, description);
        navigate('/admin/editdish', {
            state:
            {
                id: id,
                dishName: dishName,
                subCategory: subCategory,
                description: description,
                createdTime: createdTime,
                createdBy: createdBy,
                history: location.pathname
            }
        })
    }

    const dishDetailHandler = (id) => {
        navigate('/admin/dishdetail', {
            state: {
                id: id
            }
        })
    }

    return (
        <>
            <Breadcrumb style={{ marginTop: 10 }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">List dish</a>
                </Breadcrumb.Item>
            </Breadcrumb>

            <Divider orientation="right">  <Button type="primary" size="middle"><Link to={'../admin/adddish'} style={{ textDecoration: "none" }}>Add Dish</Link></Button></Divider>
            {loading === true && <>
                <br></br> <br /> <br />
                <br></br> <br /> <br />
                <Row>
                    <Col span={5}></Col>
                    <Col span={5}></Col>
                    <Col span={5}><LargeLoader /></Col>
                    <Col span={5}></Col>
                </Row></>}
            {loading === false && <StyledTable dataSource={dishes} className="table-striped-rows">
                <Column title="Dish Name" dataIndex="dishName" key="dishName" {...getColumnSearchProps('dishName')} />
                <Column title="Description" dataIndex="description" render={(_, record) => (<LinesEllipsis
                    text={record.description}
                    maxLine='3'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                />)} key="description" />

                <Column title="Sub Category" dataIndex="subCategory" render={(_, record) => record.subCategory.subCategoryName} key="subCategory" />
                <Column title="Dish Status" dataIndex="status" render={(_, record) => (record.status == 1 ? <p style={{ color: 'green' }}>true</p> : <p style={{color:'red'}}>false</p>)}
                    filters={[{
                        text: 'True',
                        value: 1,
                    }, {
                        text: 'False',
                        value: 0,
                    },]} onFilter={(value, record) => record.status === value}
                    key="status" />
                <Column title="Created Time" dataIndex="createdTime" key="createdTime" render={(_, record) => (moment(record.createdTime).format('DD/MM/YYYY'))} />
                <Column title="Created By" dataIndex="createdBy" key="createdBy" render={(_, record) => (record.createdBy == null ? 'null' : record.createdBy)} />
                <Column title="Updated Time" dataIndex="updatedTime" key="updatedTime" render={(_, record) => (moment(record.updatedTime).format('DD/MM/YYYY'))} />
                <Column title="Updated By" dataIndex="updatedBy" key="updatedBy" render={(_, record) => (record.updatedBy == null ? 'null' : record.updatedBy)} />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <a onClick={() => { dishDetailHandler(record.id) }}><EyeOutlined /></a>
                            <a onClick={() => { changeStatusHandle(record.id, record.status) }}>{record.status == 1 ? <Tag color="error">Change Status</Tag> : <Tag color="green">Change Status</Tag>}</a>
                            <a onClick={() => { updateDishHandle(record.id, record.dishName, record.subCategory, record.description, record.createdTime, record.createdBy) }}><EditOutlined style={{ fontSize: 17 }} /></a>
                        </Space>
                    )}
                />
            </StyledTable>}
        </>
    )
}

export default ListDishScreen;