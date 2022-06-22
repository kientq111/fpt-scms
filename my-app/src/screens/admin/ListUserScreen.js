import { Space, Table, Breadcrumb, message, Popconfirm } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { listUsers } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
const { Column, ColumnGroup } = Table;


//Delete Update Form
const confirm = (e) => {
  console.log(e);
  
  message.success('Delete successful');
};

const cancel = (e) => {
  console.log(e);
};

const ListUserScreen = () => {
  const [userData, setUserData] = useState([])
  const data = useSelector((state) => state.userList);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    console.log(data.users)
  }, []); 

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
      <ColumnGroup title="Name">
        <Column title="First Name" dataIndex="first_name" key="first_name" />
        <Column title="Last Name" dataIndex="last_name" key="last_name" />
      </ColumnGroup>
      <Column title="dob" dataIndex="dob" key="dob" />
      <Column title="email" dataIndex="email" key="email" />
      <Column title="phone number" dataIndex="phone" key="phone" />
      <Column title="status" dataIndex="status" key="status" />
      <Column
        title="Action"
        key="action"
        render={(_, record) => (
          <Space size="middle">
            <a>Edit {record.last_Name}</a>
            <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <a href="#">Delete</a>
              </Popconfirm>
          </Space>
        )}
      />
    </Table>
    </>

  );
};

export default ListUserScreen;