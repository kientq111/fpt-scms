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
    CoffeeOutlined,
    TagOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';


function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}


const itemsAdmin = [
    getItem('Dashboard', '/admin/dashboard', <PieChartOutlined />),
    getItem('Account Manager', '1', <UserOutlined />, [
        // getItem('List User', '/admin/listuser'),
        getItem('Add User', '/admin/adduser'),
        getItem('Add Staff', '/admin/addstaff'),
        getItem('List Staff', '/admin/liststaff'),
        getItem('List User', '/admin/listuser')
    ]),
    getItem('Order Manager', '2', <TagOutlined />, [
        // getItem('List User', '/admin/listuser'),
        getItem('List Order', '/admin/listorder'),
    ]),
    getItem('Menu Manager', '3', <DesktopOutlined />, [
        getItem('Add Menu', '/admin/addmenu'),
        getItem('List Menu', '/admin/listmenu'),
        getItem('Add Dish', '/admin/adddish'),
        getItem('List Dish', '/admin/listdish'),
        getItem('Add Category', '/admin/addcategory'),
        getItem('Add SubCategory', '/admin/addsubcategory'),
        getItem('List Category', '/admin/listcategory'),
        getItem('List Subcategory', '/admin/listsubcategory'),
    ]),
    getItem('Table Manager', '4', <CoffeeOutlined />, [
        getItem('Add Table', '/admin/addtable'),
        getItem('List Table', '/admin/listtable'),
    ]),
    getItem('Blog Manager', '5', <FormOutlined />, [
        getItem('Add Blog', '/admin/addblog'),
        getItem('List Blog', '/admin/listblog'),
    ]),
    getItem("Contact", '/admin/listcontact', <FormOutlined />),
    getItem('Logout', '/', <LogoutOutlined />),
];


const itemsStaff = [
    getItem('Dashboard', '/admin/dashboard', <PieChartOutlined />),
    getItem('Order Manager', '2', <TagOutlined />, [
        getItem('List Order', '/admin/listorder'),
    ]),
    getItem('Menu Manager', '3', <DesktopOutlined />, [
        getItem('Add Menu', '/admin/addmenu'),
        getItem('List Menu', '/admin/listmenu'),
        getItem('Add Dish', '/admin/adddish'),
        getItem('List Dish', '/admin/listdish'),
        getItem('Add Category', '/admin/addcategory'),
        getItem('Add SubCategory', '/admin/addsubcategory'),
        getItem('List Category', '/admin/listcategory'),
        getItem('List Subcategory', '/admin/listsubcategory'),
    ]),
    getItem('Table Manager', '4', <CoffeeOutlined />, [
        getItem('Add Table', '/admin/addtable'),
        getItem('List Table', '/admin/listtable'),
    ]),
    getItem('Blog Manager', '5', <FormOutlined />, [
        getItem('Add Blog', '/admin/addblog'),
        getItem('List Blog', '/admin/listblog'),
    ]),
    getItem("Contact", '/admin/listcontact', <FormOutlined />),
    getItem('Logout', '/', <LogoutOutlined />),
];

const SiderBar = () => {
    let items;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    if (userInfo.role[0].authority === "ROLE_ADMIN") {
        items = itemsAdmin
    } else {
        items = itemsStaff
    }
    const handleSiderClick = (e) => {
        if (e.key === '/') {
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