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
import { changeBlogStatus, deleteBlog, listBlog } from '../../actions/blogAction';
const { Column, ColumnGroup } = Table;

const StyledTable = styled((props) => <Table {...props} />)`
  && tbody > tr:hover > td {
    background: rgba(208, 225, 225);
  }
  thead > tr > th {
    background-color: rgba(202, 235, 199);
  }
  `;


const ListBlogScreen = () => {

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
    const dataBlog = useSelector((state) => state.blogList);
    const dataBlogStatus = useSelector((state) => state.blogChangeStatus);
    const dataBlogDelete = useSelector((state) => state.blogDelete);
    const { loading, blogs } = dataBlog
    const changeStatusSuccess = dataBlogStatus.success;
    const deleteBlogSuccess = dataBlogDelete.success;

    useEffect(() => {
        dispatch(listBlog());
    }, [changeStatusSuccess, deleteBlogSuccess]);

    // const dishDetailHandler = (id) => {
    //     navigate('/admin/dishdetail', {
    //         state: {
    //             id: id
    //         }
    //     })
    // }

    const deleteBlogHandle = (id) => {
        dispatch(deleteBlog(id))
        message.success('delete success')
    }

    const cancel = (e) => {
        console.log(e);
    };


    const editBlogHandle = (id, name, content, image, createdBy, createdTime) => {
        console.log(id, name, content, createdBy, createdTime);
        navigate('/admin/editblog', {
            state: {
                id: id,
                name: name,
                content: content,
                image: image
            }
        })
    }

    const changeBlogStatusHandle = (id, status) => {
        dispatch(changeBlogStatus(id, status))
        message.success('change status success!')
        console.log(id, status);
    }

    const blogDetailHandle = (id) => {
        navigate('/admin/blogdetail', {
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
                    <a href="">List Blog</a>
                </Breadcrumb.Item>
            </Breadcrumb>

            <Divider orientation="right">  <Button type="primary" size="middle"><Link to={'../admin/addblog'} style={{ textDecoration: "none" }}>Add Blog</Link></Button></Divider>
            {loading === true && <>
                <br></br> <br /> <br />
                <br></br> <br /> <br />
                <Row>
                    <Col span={5}></Col>
                    <Col span={5}></Col>
                    <Col span={5}><LargeLoader /></Col>
                    <Col span={5}></Col>
                </Row></>}
            {loading === false && <StyledTable dataSource={blogs} className="table-striped-rows">
                <Column title="Blog Name" dataIndex="name" key="name" {...getColumnSearchProps('dishName')} />
                <Column title="Content" dataIndex="content" key="content"
                    render={(_, record) => (<LinesEllipsis
                        text={record.content}
                        maxLine='1'
                        ellipsis='...'
                        trimRight
                        basedOn='letters'
                    />)} />
                <Column title="Status" dataIndex="status" key="status"
                    render={(_, record) => (record.status == 1 ? <p style={{ color: 'green' }}>true</p> : <p style={{ color: 'red' }}>false</p>)}
                    filters={[{
                        text: 'True',
                        value: '1',
                    }, {
                        text: 'False',
                        value: '0',
                    },]} onFilter={(value, record) => record.status.indexOf(value) === 0}
                />
                <Column title="Created Time" dataIndex="created_time" key="created_time" render={(_, record) => (moment(record.created_time).format('DD/MM/YYYY'))} />
                <Column title="Created Time" dataIndex="created_by" key="created_by" />
                <Column title="Updated Time" dataIndex="updated_time" key="updated_time" render={(_, record) => (moment(record.updated_time).format('DD/MM/YYYY'))} />
                <Column title="Updated By" dataIndex="updated_by" key="updated_by" />

                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">

                            <a onClick={() => { blogDetailHandle(record.id) }}><EyeOutlined /></a>
                            <Popconfirm
                                title="Are you sure to delete this task?"
                                onConfirm={() => deleteBlogHandle(record.id)}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <a><DeleteOutlined style={{ fontSize: 17 }} /></a>
                            </Popconfirm>
                            <a onClick={() => changeBlogStatusHandle(record.id, record.status)}>{record.status == 1 ? <Tag color="error">Change Status</Tag> : <Tag color="green">Change Status</Tag>}</a>
                            <a onClick={() => editBlogHandle(record.id, record.name, record.content, record.image, record.created_by, record.created_time)}><EditOutlined style={{ fontSize: 17 }} /></a>
                        </Space>
                    )}
                />
            </StyledTable>}
        </>
    )
}

export default ListBlogScreen;