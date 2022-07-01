import {
    Space, Table, Breadcrumb, message, Popconfirm, Form,
} from 'antd';
import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { listCategory } from '../../actions/categoryAction';
const { Column, ColumnGroup } = Table;

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


            <Table dataSource={categoryInfo}>
                <Column title="id" dataIndex="id" key="id" />
                <Column title="categoryName" dataIndex="categoryName" key="categoryName" />
                <Column title="description" dataIndex="description" key="description" />
                <Column title="status" dataIndex="status" key="status" />

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
            </Table>
        </>
    )
}

export default ListCategoryScreen;