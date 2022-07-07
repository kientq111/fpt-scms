import {
    Space, Table, Breadcrumb, message, Popconfirm, Form, Divider, Button
} from 'antd';
import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { listCategory } from '../../actions/categoryAction';
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
    const { loading, categoryInfo } = dataCategory

    useEffect(() => {
        dispatch(listCategory());
        console.log(categoryInfo);
    }, []);


    //Delete Update Form
    const confirm = (id) => {
        console.log(id);
        message.success('Delete successful');
    };

    const cancel = (e) => {
        console.log(e);
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
            <StyledTable dataSource={categoryInfo} className="table-striped-rows">
                <Column title="id" dataIndex="id" key="id" />
                <Column title="categoryName" dataIndex="categoryName" key="categoryName" />
                <Column title="description" dataIndex="description" key="description" />
                <Column title="Created Time" dataIndex="createdTime" key="createdTime" render={(_, record) => (moment(record.createdTime).format('DD/MM/YYYY'))} />
                <Column title="Created By" dataIndex="createdBy" key="createdBy" />

                <Column title="Updated Time" dataIndex="updatedTime" key="updatedTime" render={(_, record) => (moment(record.updatedTime).format('DD/MM/YYYY'))} />
                <Column title="Updated By" dataIndex="updatedBy" key="updatedBy" />

                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <a>Edit</a>
                            <Popconfirm
                                title="Are you sure to delete this task?"
                                onConfirm={() => confirm()}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <a>Delete</a>
                            </Popconfirm>
                        </Space>
                    )}
                />
            </StyledTable>
        </>
    )
}

export default ListCategoryScreen;