import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import LoginScreen from './screens/login';
import ErrorScreen from './screens/404';
import ListUserScreen from './screens/admin/ListUserScreen';
import AddUserScreen from './screens/admin/AddUserScreen';
import AddDishScreen from './screens/admin/AddDishScreen'
import AddStaffScreen from './screens/admin/AddStaffScreen';
import ViewUserDetailScreen from './screens/admin/UserDetailScreen';
import AddMenuScreen from './screens/admin/AddMenuScreen';
const { Header, Content, Sider } = Layout;


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
  getItem('Dashboard', '1', <PieChartOutlined />),
  getItem('Menu Manager', '2', <DesktopOutlined />),
  getItem('Account Manager', 'sub1', <UserOutlined />, [
    getItem('User Manager', '3'),
    getItem('Staff Manager', '4'),
    getItem('Admin Manager', '5'),
  ]),
  getItem('Dish Manager', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Logout', '9', <FileOutlined />),
];

const App = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      {userInfo &&
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
      }
      <Layout className="site-layout">
        {userInfo &&
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
          </Header>
        }

        <Router>
          <Content
            style={{
              margin: '0 16px',
            }}
          >
            <Routes>
              {/* Account */}
              <Route path='/' element={<LoginScreen />} />
              {/* Menu */}
              <Route path='/admin/addMenu' element={<AddMenuScreen />} />
              {/* Dish */}
              <Route path='/admin/adddish' element={<AddDishScreen />} />
              {/* Staff */}
              <Route path='/admin/addstaff' element={<AddStaffScreen />} />
              {/* User */}
              <Route path='/admin/adduser' element={<AddUserScreen />} />
              <Route path='/admin/userdetail' element={<ViewUserDetailScreen />} />
              <Route path='/admin/userlist' element={<ListUserScreen />} />
              {/* Common */}
              <Route path='/error404' element={<ErrorScreen />} />
            </Routes>
          </Content>
        </Router>
      </Layout>
    </Layout>
  );
};

export default App;