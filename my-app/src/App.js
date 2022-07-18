import { useSelector } from 'react-redux';
import { Layout, Menu, Divider } from 'antd';
import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import LoginScreen from './screens/login';
import ErrorScreen from './screens/404';
import ListUserScreen from './screens/admin/ListUserScreen';
import AddUserScreen from './screens/admin/AddUserScreen';
import AddDishScreen from './screens/admin/AddDishScreen'
import AddStaffScreen from './screens/admin/AddStaffScreen';
import UserDetailScreen from './screens/admin/UserDetailScreen';
import AddMenuScreen from './screens/admin/AddMenuScreen';
import EditUserScreen from './screens/admin/EditUserScreen';
import ListStaffScreen from './screens/admin/ListStaffScreen';
import ListDishScreen from './screens/admin/ListDishScreen';
import AddCateScreen from './screens/admin/AddCategoryScreen';
import ListCategoryScreen from './screens/admin/ListCategoryScreen';
import SiderBar from './components/siderbar';
import EditDishScreen from './screens/admin/EditDishScreen';
import AddBlogScreen from './screens/admin/AddBlogScreen';
import ListSubCategoryScreen from './screens/admin/ListSubCategoryScreen';
import Test from './screens/test';
import AddSubCategoryScreen from './screens/admin/AddSubCategoryScreen';
import EditCategoryScreen from './screens/admin/EditCategoryScreen';
import ListMenuScreen from './screens/admin/ListMenuScreen';
import EditMenuScreen from './screens/admin/EditMenuScreen';
import MenuDetailScreen from './screens/admin/MenuDetailScreen';
import UserDetailP2 from './screens/admin/UserDetailScreenP2';
import DishDetailScreen from './screens/admin/DishDetailScreen';
import AuthorizedFailScreen from './screens/401';
import ListBlogScreen from './screens/admin/ListBlogScreen';
import EditBlogScreen from './screens/admin/EditBlogScreen';
import BlogDetailScreen from './screens/admin/BlogDetailScreen';
import DashboardScreen from './screens/admin/DashboardScreen';
import EditSubCategoryScreen from './screens/admin/EditSubCategory';
import ListTableScreen from './screens/admin/ListTableScreen';
const { Header, Content, Sider } = Layout;





const App = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [collapsed, setCollapsed] = useState(false);

  const items1 = ['1'].map((key) => ({
    key,
    label: `Hello ${userInfo && userInfo.username}`,
  }));

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >

      {userInfo && userInfo !== "Bad credentials" && <Sider Sider collapsible collapsed={collapsed} className="site-layout-background" onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        {/* add onclick to menu */}
        <SiderBar />
      </Sider>}

      <Layout className="site-layout">
        {userInfo && userInfo !== "Bad credentials" && <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >

          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
        </Header>}

        <Content
          className='backgroundLogin'
          style={{
            margin: '0 10px',
          }}
        >
          <Routes>
            {/* Account */}
            <Route path='/' element={<LoginScreen />} />
            {/* Menu */}
            <Route path='/admin/addMenu' element={<AddMenuScreen />} />
            <Route path='/admin/listmenu' element={<ListMenuScreen />} />
            <Route path='/admin/editmenu' element={<EditMenuScreen />} />
            <Route path='/admin/menudetail' element={<MenuDetailScreen />} />
            {/* Dish */}
            <Route path='/admin/adddish' element={<AddDishScreen />} />
            <Route path='/admin/listdish' element={<ListDishScreen />} />
            <Route path='/admin/editdish' element={<EditDishScreen />} />
            <Route path='/admin/dishdetail' element={<DishDetailScreen />} />
            {/* Staff */}
            <Route path='/admin/addstaff' element={<AddStaffScreen />} />
            <Route path='/admin/liststaff' element={<ListStaffScreen />} />
            {/* User */}
            <Route path='/admin/adduser' element={<AddUserScreen />} />
            <Route path='/admin/userdetail' element={<UserDetailScreen />} />
            <Route path='/admin/listuser' element={<ListUserScreen />} />
            <Route path='/admin/edituser' element={<EditUserScreen />} />
            <Route path='/admin/user2' element={<UserDetailP2 />} />
            {/* Category&SubCategory */}
            <Route path='/admin/addcategory' element={<AddCateScreen />} />
            <Route path='/admin/editcategory' element={<EditCategoryScreen />} />
            <Route path='/admin/listcategory' element={<ListCategoryScreen />} />
            <Route path='/admin/listsubcategory' element={<ListSubCategoryScreen />} />
            <Route path='/admin/addsubcategory' element={<AddSubCategoryScreen />} />
            <Route path='/admin/editsubcategory' element={<EditSubCategoryScreen />} />
            {/* Blog */}
            <Route path='/admin/addblog' element={<AddBlogScreen />} />
            <Route path='/admin/listblog' element={<ListBlogScreen />} />
            <Route path='/admin/editblog' element={<EditBlogScreen />} />
            <Route path='/admin/blogdetail' element={<BlogDetailScreen />} />
            {/* Table */}
            <Route path='/admin/listtable' element={<ListTableScreen />} />
            {/* Common */}
            <Route path='/admin/dashboard' element={<DashboardScreen />} />
            <Route path='*' element={<ErrorScreen />} />
            <Route path='/authorizedfail' element={<AuthorizedFailScreen />} />
            <Route path='/test' element={<Test />} />


          </Routes>
        </Content>

      </Layout>
    </Layout >
  );
};

export default App;