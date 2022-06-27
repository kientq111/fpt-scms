import {
  Space, Table, Breadcrumb, message, Popconfirm, Form,
} from 'antd';
import React, { useState, useEffect } from 'react';
import { deleteUser, listUsers } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";

const { Column, ColumnGroup } = Table;


const ListUserScreen = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.userList);
  const deleteSuccess = useSelector((state) => state.userDelete);
  const [userData, setUserData] = useState(data)

  const [form] = Form.useForm();

  const editUser = (id, username, firstname, lastname, dob, email, phone, status, country, city, district, street) => {
    console.log(id);
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
        street: street
      }
    })
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    console.log(data.users)
  }, [dispatch, deleteSuccess]);


  //Delete Update Form
  const confirm = (id) => {
    console.log(id);
    message.success('Delete successful');
    dispatch(deleteUser(id))
  };

  const cancel = (e) => {
    console.log(e);
  };

  return (
    <>
      <Breadcrumb style={{ marginTop: 10 }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">List User</a>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Table dataSource={data.users}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="username" dataIndex="username" key="username" />
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="first_name" key="first_name" />
          <Column title="Last Name" dataIndex="last_name" key="last_name" />
        </ColumnGroup>
        <Column title="date of birth" dataIndex="dob" key="dob" />
        <Column title="email" dataIndex="email" key="email" />
        <Column title="phone number" dataIndex="phone" key="phone" />
        <Column title="status" dataIndex="status" key="status" />
        <ColumnGroup title="Address">
          <Column title="country" dataIndex="address" render={(_, record) => record.address.country} key="country" />
          <Column title="city" dataIndex="address" render={(_, record) => record.address.city} key="city" />
          <Column title="district" dataIndex="address" render={(_, record) => record.address.district} key="district" />
          <Column title="street" dataIndex="address" render={(_, record) => record.address.street} key="street" />
        </ColumnGroup>
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <a onClick={() => editUser(record.id, record.username, record['first_name'], record['last_name'],
                record.dob, record.email, record.phone, record.status, record.address.country, record.address.city, record.address.district, record.address.street)}>Edit</a>
              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={() => confirm(record.id)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <a>Delete</a>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </>

  );
};

export default ListUserScreen;