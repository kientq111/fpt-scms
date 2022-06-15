import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import LoginScreen from './screens/login';
import RegisterScreen from './screens/register';
import ErrorScreen from './screens/404';
import ListUserScreen from './screens/admin/ListUserScreen';
import AddUserScreen from './screens/admin/AddUserScreen';
import AddDishScreen from './screens/admin/AddDishScreen';
import TestIMG from './screens/admin/test';
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

const adminLoggerIn = (collapsed, setCollapsed) => (
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
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
          </Breadcrumb>
          <Routes>
            <Route path='/' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/error404' element={<ErrorScreen />} />
            <Route path='/admin/userlist' element={<ListUserScreen />} />
            <Route path='/admin/addaccount' element={<AddUserScreen />} />
            <Route path='/admin/adddish' element={<AddDishScreen />} />
            <Route path='/admin/test' element={<TestIMG/>} />

          </Routes>
        </Content>
      </Router>

      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  </Layout>
);

const userLoggerIn = () => (
<div className="App">
      <Layout>
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={new Array(6).fill(null).map((_, index) => {
              const key = index + 1;
              return {
                key,
                label: `nav ${key}`,
              };
            })}
          />
        </Header>
        <Router>
          <Content>
            <Routes>
              <Route path='/' element={<LoginScreen />} />
              <Route path='/register' element={<RegisterScreen />} />
              <Route path='/error404' element={<ErrorScreen />} />
              <Route path='/adduser' element={<AddUserScreen />} />
              
            </Routes>
          </Content>
        </Router>
        <Footer>Footer</Footer>
      </Layout>
    </div>
);

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const authorization = 'admin';
  return (
   authorization === 'admin' ? adminLoggerIn(collapsed, setCollapsed) : userLoggerIn()
  );
};

export default App;