import { Space, Table, Breadcrumb, message, Popconfirm } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from "axios";
const { Column, ColumnGroup } = Table;


const baseURL = "https://reqres.in/api/users?page=1";

const confirm = (e) => {
  console.log(e);
  message.success('Delete successful');
};

const cancel = (e) => {
  console.log(e);
};

const ListUserScreen = () => {
  const [data1, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {

      try {
        const { data: response } = await axios.get(baseURL);
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, []);

  console.log(data1.data);

  return (
    <Table dataSource={data1.data}>
      <Column title="ID" dataIndex="id" key="id" />
      <ColumnGroup title="Name">
        <Column title="First Name" dataIndex="first_name" key="first_name" />
        <Column title="Last Name" dataIndex="last_name" key="last_name" />
      </ColumnGroup>
      <Column title="email" dataIndex="email" key="email" />
      <Column
        title="Action"
        key="action"
        render={(_, record) => (
          <Space size="middle">
            <a>Edit {record.lastName}</a>
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
  );
};

export default ListUserScreen;