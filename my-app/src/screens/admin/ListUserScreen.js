import {
  Space, Table, Breadcrumb, message, Popconfirm, Form, Button, Input, Divider, Tag, Row, Col, Modal, InputNumber
} from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { changeUserStatus, deleteUser, listUsers, verifyAccount } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import styled from 'styled-components';
import moment from 'moment'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { LargeLoader } from '../../components/Loader';
import LinesEllipsis from 'react-lines-ellipsis'
import { userConstants } from '../../constants/Constants';
import Loader from '../../components/Loader';
import axios from 'axios';
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
  const changeUserStatusSelector = useSelector((state) => state.userChangeStatus);
  const updateSuccess = updateSelector.success
  const isChangeStatusSuccess = changeUserStatusSelector.success
  const { success } = deleteSuccess;
  const [userData, setUserData] = useState(data)
  const { loading } = data;
  const userLogin = useSelector((state) => state.userLogin)
  const userLoginInfoToken = userLogin.userInfo.accessToken
  const verifyStatusSelector = useSelector((state) => state.accountVerify)
  const verifyStatusLoading = verifyStatusSelector.loading
  const verifyStatusData = verifyStatusSelector.verifyStatus
  const [pagination, setPagination] = useState({
    pageSize: 9,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [form] = Form.useForm();
  const location = useLocation();
  const editUser = (id, username, firstname, lastname, dob, email, phone, status, country, city, district, street, gender) => {

    navigate('/admin/edituser', {
      state:
      {
        id: id,
        username: username,
        firstname: firstname,
        lastname: lastname,
        dob: dob,
        gender: gender,
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
      message.success('Update Successful');
    }
    if (isChangeStatusSuccess === true) {
      message.success('Change Status Successful');
      dispatch({
        type: userConstants.USER_CHANGE_STATUS_RESET,
      })
    }
    dispatch(listUsers());
  }, [success, isChangeStatusSuccess]);



  // Delete Update Form
  const confirm = (id) => {
    console.log(id);
    message.success('Delete successful');
    dispatch(deleteUser(id))
  };

  const cancel = (e) => {
    console.log(e);
  };


  const userDetailHandler = (id, username, firstname, lastname, dob, email, phone, status, country, city, district, street, gender) => {
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
        history: location.pathname,
        gender: gender,
      }
    })
  }

  const changeUserStatusHandle = (username, status) => {
    console.log(username, status);
    dispatch(changeUserStatus(username, status));
  }
  //Verify Block
  const verifyAccountHandle = (first_Name, last_Name, rawEmail, status) => {
    if (status == true) {
      console.log(status);
      message.info('Email Has Verify!')
      return
    }
    let firstName, lastName, email
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userLoginInfoToken}`,
      },
    }

    if (rawEmail !== undefined) {
      let tempObj = {
        firstName: first_Name,
        lastName: last_Name,
        email: rawEmail
      }
      sessionStorage.setItem("verifySended", JSON.stringify(tempObj));
    }
    let getSessionObj = sessionStorage.getItem("verifySended");
    const objSended = JSON.parse(getSessionObj)
    firstName = objSended.firstName
    lastName = objSended.lastName
    email = objSended.email
    console.log(firstName, lastName, email);
    axios.post(`/verifyAccountSignUpOrUpdate`, { firstName, lastName, email }, config)
      .then(res => {
        message.info(`Sending`)
      })
      .catch(error => console.log(error));
    showModal();
  }

  const verifyCodeHandle = (values) => {
    let getSessionObj = sessionStorage.getItem("verifySended");
    const objSended = JSON.parse(getSessionObj)
    dispatch(verifyAccount(objSended.email, values.code))
  }

  useEffect(() => {
    if (verifyStatusLoading === false) {
      if (verifyStatusData.success === false) {
        message.error('VERIFY CODE INCORRECT');
        dispatch({
          type: userConstants.VERIFY_CODE_RESET,
        })

      } else {
        message.success('VERIFY CODE SUCCESS');
        setIsModalVisible(false);
        dispatch(listUsers());
      }

    }
  }, [verifyStatusData]);


  //End Of Verify
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
          pagination={pagination}
        >
          <Column title="UserName" dataIndex="username" key="username" {...getColumnSearchProps('username')} fixed={"left"} />
          <Column title="First Name" dataIndex="first_name" key="first_name" {...getColumnSearchProps('first_name')} />
          <Column title="Last Name" dataIndex="last_name" key="last_name"  {...getColumnSearchProps('last_name')} />
          <Column title="Date of Birth" dataIndex="dob" render={(_, record) => (moment(record.dob).format('DD/MM/YYYY'))} key="dob" sorter={(a, b) => moment(a.dob).unix() - moment(b.dob).unix()} />
          <Column title="Email" dataIndex="email" key="email" {...getColumnSearchProps('email')} />
          <Column title="Phone Number" dataIndex="phone" key="phone"  {...getColumnSearchProps('phone')} />
          <Column title="Gender" dataIndex="gender" key="gender" filters={[{
            text: 'Male',
            value: 'Male',
          }, {
            text: 'Female',
            value: 'Female',
          },]} onFilter={(value, record) => record.gender.indexOf(value) === 0} />


          <Column title="Status" dataIndex="status" render={(_, record) => (record.status == 1 ? <p style={{ color: 'green' }}>UnBlock</p> : <p style={{ color: 'red' }}>Block</p>)}
            filters={[{
              text: 'Unblock',
              value: 1,
            }, {
              text: 'Block',
              value: 0,
            },]} onFilter={(value, record) => record.status.indexOf(value) === 0}
            key="status" />
          <Column title="Email Active" dataIndex="is_active" render={(_, record) => (record.is_active == true ? <p style={{ color: 'green' }}>Active</p> : <p style={{ color: 'red' }}>Inactive</p>)}
            filters={[{
              text: 'active',
              value: true,
            }, {
              text: 'inactive',
              value: false,
            },]} onFilter={(value, record) => record.is_active === value}
            key="is_active" />
          <Column title="Country" dataIndex="address" render={(_, record) => record.address.country} key="country" />
          <Column title="City" dataIndex="address" render={(_, record) => record.address.city} key="city" />
          <Column title="District" dataIndex="address" render={(_, record) => record.address.district} key="district" />
          <Column title="Street" dataIndex="address" render={(_, record) => <LinesEllipsis
            text={record.address.street}
            maxLine='1'
            ellipsis='...'
            trimRight
            basedOn='letters'
          />} key="street" />
          <Column title="Created By" dataIndex="create_by" {...getColumnSearchProps('create_by')} key="create_by" />
          <Column title="Created Time" dataIndex="create_date" render={(_, record) => (moment(record.create_date).format('DD/MM/YYYY'))} key="create_date" sorter={(a, b) => moment(a.create_date).unix() - moment(b.create_date).unix()} />
          <Column title="Updated By" dataIndex="updated_by" {...getColumnSearchProps('updated_by')} key="updated_by" />
          <Column title="Updated Time" dataIndex="updated_date" render={(_, record) => (moment(record.updated_date).format('DD/MM/YYYY'))} key="updated_date" sorter={(a, b) => moment(a.updated_date).unix() - moment(b.updated_date).unix()} />

          <Column
            title="Action" width={'8%'}
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <a><EyeOutlined onClick={() => userDetailHandler(record.id, record.username, record['first_name'], record['last_name'],
                  record.dob, record.email, record.phone, record.status, record.address.country, record.address.city, record.address.district, record.address.street, record.gender)} /></a>
                <a onClick={() => editUser(record.id, record.username, record['first_name'], record['last_name'],
                  record.dob, record.email, record.phone, record.status, record.address.country, record.address.city, record.address.district, record.address.street, record.gender)}><EditOutlined style={{ fontSize: 17 }} /></a>
                <Popconfirm
                  title="Are you sure to delete this task?"
                  onConfirm={() => confirm(record.id)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <a><DeleteOutlined style={{ fontSize: 17 }} /></a>
                </Popconfirm>
                <a onClick={() => changeUserStatusHandle(record.username, record.status)} className='txtLink'>{record.status == 1 ? "Block" : "Unblock"}</a>
                <a onClick={() => verifyAccountHandle(record.first_name, record.last_name, record.email, record.is_active)} className='txtLink'>{record.is_active == true ? <a style={{ color: 'green' }}>Verified</a> : <a style={{ color: 'blue' }}>Verify Email</a>}</a>
              </Space>
            )}
            fixed={"right"}
          />
        </StyledTable>}

      {/* Verify Modal */}
      <Modal title="Verify Form" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          onFinish={verifyCodeHandle}
        >
          <Form.Item
            label="Verify Code"
            name="code"
            rules={[
              {
                required: true,
                message: 'Please input code here!',
              },
            ]}
          >
            <Input min={0} max={9999} defaultValue={0} style={{ width: '30%' }} />
          </Form.Item>
          <Form.Item
          >
            <Space size={'middle'}>
              <Button type="primary" htmlType="submit" size='middle' >
                Verify
              </Button>
              {verifyStatusLoading && <Loader />}
            </Space>


          </Form.Item>
          <h1></h1>
        </Form>
        <a className='txtLink' onClick={() => verifyAccountHandle()}>re-send verify code</a>
      </Modal>
    </>

  );
};

export default ListUserScreen;