import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import LoginScreen from './screens/login';
import RegisterScreen from './screens/register';
import ErrorScreen from './screens/404';
import ListUserScreen from './screens/admin/ListUserScreen';
import AddUserScreen from './screens/admin/AddUserScreen';
import AddDishScreen from './screens/admin/AddDishScreen'
import AddStaffScreen from './screens/admin/AddStaffScreen';
import ViewUserDetailScreen from './screens/admin/UserDetailScreen';
import AddMenuScreen from './screens/admin/AddMenuScreen';
const { Header, Content, Footer, Sider } = Layout;


function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
        </Header>

        <Router>
          <Content
            style={{
              margin: '0 16px',
            }}
          >
            <Routes>
              <Route path='/' element={<LoginScreen />} />
              <Route path='/register' element={<RegisterScreen />} />
              <Route path='/error404' element={<ErrorScreen />} />
              <Route path='/admin/userlist' element={<ListUserScreen />} />
              <Route path='/admin/adduser' element={<AddUserScreen />} />
              <Route path='/admin/adddish' element={<AddDishScreen />} />
              <Route path='/admin/addstaff' element={<AddStaffScreen />} />
              <Route path='/admin/userdetail' element={<ViewUserDetailScreen />} />
              <Route path='/admin/addMenu' element={<AddMenuScreen />} />
            </Routes>
          </Content>
        </Router>
      </Layout>
    </Layout>
  );
};

export default App;