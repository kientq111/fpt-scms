import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    LogoutOutlined,
    FormOutlined,
    CoffeeOutlined
} from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';


function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items1 = ['1'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

const items = [
    getItem('Dashboard', '/admin/dashboard', <PieChartOutlined />),
    getItem('Account Manager', '', <UserOutlined />, [
        // getItem('List User', '/admin/listuser'),
        getItem('Add User', '/admin/adduser'),
        getItem('Add Staff', '/admin/addstaff'),
        getItem('List Staff', '/admin/liststaff'),
        getItem('List User', '/admin/listuser')
    ]),
    getItem('Menu Manager', '', <DesktopOutlined />, [
        getItem('Add Menu', '/admin/addmenu'),
        getItem('List Menu', '/admin/listmenu'),
        getItem('Add Dish', '/admin/adddish'),
        getItem('List Dish', '/admin/listdish'),
        getItem('Add Category', '/admin/addcategory'),
        getItem('Add SubCategory', '/admin/addsubcategory'),
        getItem('List Category', '/admin/listcategory'),
        getItem('List Subcategory', '/admin/listsubcategory'),
    ]),
    getItem('Table Manager', '', <CoffeeOutlined />, [
    
        getItem('List Table', '/admin/listtable'),
    ]),
    getItem('Blog Manager', '', <FormOutlined />, [
        getItem('Add Blog', '/admin/addblog'),
        getItem('List Blog', '/admin/listblog'),
    ]),
    getItem('Logout', '/', <LogoutOutlined />),
];

const SiderBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSiderClick = (e) => {
        if (e.key == '/') {
            dispatch(logout());
        }
        console.log(e.key);
        navigate(e.key)
    }
    return (
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleSiderClick} />
    )



}


export default SiderBar;