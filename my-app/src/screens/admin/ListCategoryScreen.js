import {
    Space, Table, Breadcrumb, message, Popconfirm, Form, Divider, Button, Col, Row
} from 'antd';
import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { changeCategoryStatus, listCategory } from '../../actions/categoryAction';
import { LargeLoader } from '../../components/Loader';
import moment from 'moment'
import styled from 'styled-components';
const { Column, ColumnGroup } = Table;

const StyledTable = styled((props) => <Table {...props} />)`
&& tbody > tr:hover > td {
  background: rgba(208, 225, 225);
}
thead > tr > th {
  background-color: rgba(202, 235, 199);
}
`;

const ListCategoryScreen = () => {
    const dispatch = useDispatch();
    const dataCategory = useSelector((state) => state.categoryList);
    const categoryChangeStatusSelector = useSelector((state) => state.categoryChangeStatus);
    const {success} = categoryChangeStatusSelector;
    const { loading, categoryInfo } = dataCategory
    const navigate = useNavigate();

    useEffect(() => {
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
        message.success("change Category status success")
        dispatch(changeCategoryStatus(id, status))
    }
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
            {loading === false && <StyledTable dataSource={categoryInfo} className="table-striped-rows">
                <Column title="id" dataIndex="id" key="id" />
                <Column title="categoryName" dataIndex="categoryName" key="categoryName" />
                <Column title="description" dataIndex="description" key="description" />
                <Column title="Status" dataIndex="status"
                    filters={[
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
                    key="status"
                />
                <Column title="Created Time" dataIndex="createdTime" key="createdTime" render={(_, record) => (moment(record.createdTime).format('DD/MM/YYYY'))} />
                <Column title="Created By" dataIndex="createdBy" key="createdBy" />

                <Column title="Updated Time" dataIndex="updatedTime" key="updatedTime" render={(_, record) => (moment(record.updatedTime).format('DD/MM/YYYY'))} />
                <Column title="Updated By" dataIndex="updatedBy" key="updatedBy" />

                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <a onClick={() => changeCategoryStatusHandle(record.id, record.status)} style={{ color: 'blue' }}>Change Status</a>
                            <a onClick={() => editCategoryHandle(record.id, record.categoryName, record.description, record.createdBy, record.createdTime)}>Edit</a>
                        </Space>
                    )}
                />
            </StyledTable>}

        </>
    )
}

export default ListCategoryScreen;