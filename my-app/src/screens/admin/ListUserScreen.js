import {
  Space, Table, Breadcrumb, message, Popconfirm, Form, Button, Input, Divider, Tag, Row, Col
} from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { deleteUser, listUsers } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import styled from 'styled-components';
import moment from 'moment'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Loader, LargeLoader } from '../../components/Loader';
import LinesEllipsis from 'react-lines-ellipsis'
const { Column, ColumnGroup } = Table;

const StyledTable = styled((props) => <Table {...props} />)`
  && tbody > tr:hover > td {
    background: rgba(208, 225, 225);
  }
  thead > tr > th {
    background-color: rgba(202, 235, 199);
  }
  `;

const ListUserScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });


  const navigate = useNavigate();
  const data = useSelector((state) => state.userList);
  const deleteSuccess = useSelector((state) => state.userDelete);
  const updateSelector = useSelector((state) => state.userUpdate);
  const updateSuccess = updateSelector.success
  const { success } = deleteSuccess;
  const [userData, setUserData] = useState(data)
  const { loading } = data;
  const [form] = Form.useForm();
  const location = useLocation();
  const editUser = (id, username, firstname, lastname, dob, email, phone, status, country, city, district, street) => {

    navigate('/admin/edituser', {
      state:
      {
        id: id,
        username: username,
        firstname: firstname,
        lastname: lastname,
        dob: dob,
        email: email,
        phone: phone,
        status: status,
        country: country,
        city: city,
        district: district,
        street: street,
        history: location.pathname
      }
    })
  }

  const dispatch = useDispatch();
  useEffect(() => {
    if (updateSuccess === true) {
      message.success('Update successful');
    }
    dispatch(listUsers());
  }, [success]);



  // Delete Update Form
  const confirm = (id) => {
    console.log(id);
    message.success('Delete successful');
    dispatch(deleteUser(id))
  };

  const cancel = (e) => {
    console.log(e);
  };


  const userDetailHandler = (id, username, firstname, lastname, dob, email, phone, status, country, city, district, street) => {
    console.log(id);
    navigate('/admin/userdetail', {
      state:
      {
        id: id,
        username: username,
        firstname: firstname,
        lastname: lastname,
        dob: dob,
        email: email,
        phone: phone,
        status: status,
        country: country,
        city: city,
        district: district,
        street: street,
        history: location.pathname
      }
    })
  }


  return (
    <>
      <Breadcrumb style={{ marginTop: 10 }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">List Users</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Divider orientation="right">  <Button type="primary" size="middle" ><Link to={'/admin/adduser'} style={{ textDecoration: 'none' }}>Add User</Link></Button></Divider>

      {loading === true && <>
        <br></br> <br /> <br />
        <br></br> <br /> <br />
        <Row>
          <Col span={5}></Col>
          <Col span={5}></Col>
          <Col span={5}><LargeLoader /></Col>
          <Col span={5}></Col>
        </Row></>}

      {loading === false &&
        <StyledTable dataSource={data.users} className="table-striped-rows"
          scroll={{
            x: '200vw',
          }}
        >
          <Column title="UserName" dataIndex="username" key="username" {...getColumnSearchProps('username')} fixed={"left"} />
          <Column title="First Name" dataIndex="first_name" key="first_name" />
          <Column title="Last Name" dataIndex="last_name" key="last_name" />
          <Column title="Date of Birth" dataIndex="dob" render={(_, record) => (moment(record.dob).format('DD/MM/YYYY'))} key="dob" />
          <Column title="Email" dataIndex="email" key="email" {...getColumnSearchProps('email')} />
          <Column title="Phone Number" dataIndex="phone" key="phone" />
          <Column title="Gender" dataIndex="gender" key="gender" filters={[{
            text: 'Male',
            value: 'Male',
          }, {
            text: 'Female',
            value: 'Female',
          },]} onFilter={(value, record) => record.gender.indexOf(value) === 0} />


          <Column title="Status" dataIndex="status" render={(_, record) => (record.status == 1 ? <p style={{ color: 'green' }}>true</p> : <p style={{ color: 'red' }}>false</p>)}
            filters={[{
              text: 'True',
              value: 1,
            }, {
              text: 'False',
              value: 0,
            },]} onFilter={(value, record) => record.status.indexOf(value) === 0}
            key="status" />
          <Column title="is_active" dataIndex="is_active" render={(_, record) => (record.is_active == true ? <p style={{ color: 'green' }}>Active</p> : <p style={{ color: 'red' }}>Inactive</p>)}
            filters={[{
              text: 'active',
              value: true,
            }, {
              text: 'inactive',
              value: false,
            },]} onFilter={(value, record) => record.is_active === value}
            key="is_active" />
          <Column title="country" dataIndex="address" render={(_, record) => record.address.country} key="country" />
          <Column title="city" dataIndex="address" render={(_, record) => record.address.city} key="city" />
          <Column title="district" dataIndex="address" render={(_, record) => record.address.district} key="district" />
          <Column title="street" dataIndex="address" render={(_, record) => <LinesEllipsis
            text={record.address.street}
            maxLine='1'
            ellipsis='...'
            trimRight
            basedOn='letters'
          />} key="street" />
          <Column title="Created By" dataIndex="create_by" key="create_by" />
          <Column title="Created Time" dataIndex="create_date" render={(_, record) => (moment(record.create_date).format('DD/MM/YYYY'))} key="create_date" />
          <Column title="Updated By" updated_by="updated_by" render={(_, record) => record.updated_by === null ? "Null" : record.updated_by} key="updated_by" />
          <Column title="Updated Time" dataIndex="updated_date" render={(_, record) => (moment(record.updated_date).format('DD/MM/YYYY'))} key="updated_date" />

          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <a><EyeOutlined onClick={() => userDetailHandler(record.id, record.username, record['first_name'], record['last_name'],
                  record.dob, record.email, record.phone, record.status, record.address.country, record.address.city, record.address.district, record.address.street)} /></a>
                <a onClick={() => editUser(record.id, record.username, record['first_name'], record['last_name'],
                  record.dob, record.email, record.phone, record.status, record.address.country, record.address.city, record.address.district, record.address.street)}><EditOutlined style={{ fontSize: 17 }} /></a>
                <Popconfirm
                  title="Are you sure to delete this task?"
                  onConfirm={() => confirm(record.id)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <a><DeleteOutlined style={{ fontSize: 17 }} /></a>
                </Popconfirm>

              </Space>
            )}
            fixed={"right"}
          />
        </StyledTable>}

    </>

  );
};

export default ListUserScreen;