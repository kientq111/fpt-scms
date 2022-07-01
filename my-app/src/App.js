// import {
//   DesktopOutlined,
//   FileOutlined,
//   PieChartOutlined,
//   TeamOutlined,
//   UserOutlined,
// } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Layout, Menu, Divider  } from 'antd';
import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import LoginScreen from './screens/login';
import ErrorScreen from './screens/404';
import ListUserScreen from './screens/admin/ListUserScreen';
import AddUserScreen from './screens/admin/AddUserScreen';
import AddDishScreen from './screens/admin/AddDishScreen'
import AddStaffScreen from './screens/admin/AddStaffScreen';
import ViewUserDetailScreen from './screens/admin/UserDetailScreen';
import AddMenuScreen from './screens/admin/AddMenuScreen';
import EditUserScreen from './screens/admin/EditUserScreen';
import ListStaffScreen from './screens/admin/ListStaffScreen';
import ListDishScreen from './screens/admin/ListDishScreen';
import AddCateScreen from './screens/admin/AddCategoryScreen';
import ListCategoryScreen from './screens/admin/ListCategoryScreen';
import SiderBar from './components/siderbar';
const { Header, Content, Sider } = Layout;


// function getItem(label, key, icon, children) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }

const items1 = ['1'].map((key) => ({
  key,
  label: `Hello Admin`,
}));

// const items = [
//   getItem('Dashboard', '1', <PieChartOutlined />),
//   getItem('Menu Manager', '', <DesktopOutlined />),
//   getItem('Account Manager', '', <UserOutlined />, [
//     getItem('List User', '/admin/listuser'),
//     getItem('Add User', '/admin/adduser'),
//     getItem('List Staff', '/admin/liststaff')
//   ]),
//   getItem('Dish Manager', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//   getItem('Logout', '9', <FileOutlined />),
// ];

const App = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [collapsed, setCollapsed] = useState(false);

  // const handleSiderClick = (e) => {
  //   console.log(e.key);
  // }
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >

      {userInfo && <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        {/* add onclick to menu */}
        <SiderBar />
      </Sider>}


      <Layout className="site-layout">
        {userInfo && <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
      
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
        </Header>}

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
            <Route path='/admin/listdish' element={<ListDishScreen />} />
            {/* Staff */}
            <Route path='/admin/addstaff' element={<AddStaffScreen />} />
            <Route path='/admin/liststaff' element={<ListStaffScreen />} />
            {/* User */}
            <Route path='/admin/adduser' element={<AddUserScreen />} />
            <Route path='/admin/userdetail' element={<ViewUserDetailScreen />} />
            <Route path='/admin/listuser' element={<ListUserScreen />} />
            <Route path='/admin/edituser' element={<EditUserScreen />} />
            {/* Category&SubCategory */}
            <Route path='/admin/addcategory' element={<AddCateScreen />} />
            <Route path='/admin/listcategory' element={<ListCategoryScreen />} />
            {/* Common */}
            <Route path='*' element={<ErrorScreen />} />
          </Routes>
        </Content>

      </Layout>
    </Layout>
  );
};

export default App;