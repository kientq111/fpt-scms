import {
    Space, Table, Breadcrumb, message, Popconfirm, Form,
} from 'antd';
import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { listDishes } from '../../actions/dishAction';
const { Column, ColumnGroup } = Table;

const ListDishScreen = () => {



    const dispatch = useDispatch();
    const dataDish = useSelector((state) => state.dishList);
    const { loading, dishes } = dataDish

    useEffect(() => {
        dispatch(listDishes());
        console.log(dataDish);
        console.log(dishes)
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
                    <a href="">List dish</a>
                </Breadcrumb.Item>
            </Breadcrumb>


            <Table dataSource={dishes}>
                <Column title="dishID" dataIndex="id" key="id" />
                <Column title="dishName" dataIndex="dishName" key="dishName" />
                <Column title="menuID" dataIndex="menu" render={(_, record) => record.menu.id} key="menuID" />
                <Column title="menuName" dataIndex="menu" render={(_, record) => record.menu.menuName} key="menu" />
                <Column title="subCategoryID" dataIndex="subCategory" render={(_, record) => record.subCategory.id} key="subCategoryID" />
                <Column title="subCategory" dataIndex="subCategory" render={(_, record) => record.subCategory.subCategoryName} key="subCategory" />
                <Column title="dish status" dataIndex="status" key="status" />

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

export default ListDishScreen;