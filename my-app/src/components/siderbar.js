import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


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
    getItem('Dashboard', '/admin/listuser', <PieChartOutlined />),
    // getItem('Menu Manager', '/admin/listuser', <DesktopOutlined />),
    getItem('Account Manager', '', <UserOutlined />, [
        // getItem('List User', '/admin/listuser'),
        getItem('Add User', '/admin/adduser'),
        getItem('List Staff', '/admin/liststaff')
    ]),
    // getItem('Dish Manager', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    // getItem('Logout', '9', <FileOutlined />),
];

const SiderBar = () => {
    const navigate = useNavigate();
    const handleSiderClick = (e) => {
        console.log(e.key);
        navigate(e.key)
    }
    return (
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleSiderClick} />
    )



}


export default SiderBar;