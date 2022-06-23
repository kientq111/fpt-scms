import {
  Space, Table, Breadcrumb, message, Popconfirm, Modal, Form,
  Input,
  Row,
  Col, Button
} from 'antd';
import React, { useState, useEffect } from 'react';
import { deleteUser, listUsers } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
const { Column, ColumnGroup } = Table;





const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const onFinish = (values) => {
  console.log('Received values of form: ', values);
};



const ListUserScreen = () => {

  const data = useSelector((state) => state.userList);
  const deleteSuccess = useSelector((state) => state.userDelete);
  const [userData, setUserData] = useState(data)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


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
              <a onClick={showModal}>Edit</a>
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
      {/* Modal show info to edit user */}
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Row>
          <Col flex="1 1 200px">
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
            >
              <Form.Item
                name="email"
                label="E-mail"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="first_name"
                label="First Name"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="user_name"
                label="User Name"
              >
                <Input />
              </Form.Item>

              <Form.Item name="date-picker" label="Date of Birth"  >
                <Input />
              </Form.Item>


              <Form.Item
                name="phone"
                label="Phone Number"
              >
                <Input />

              </Form.Item>

              <Form.Item
                name="address"
                label="address"
              >
                <Input />

              </Form.Item>
              <Form.Item {...tailFormItemLayout}>

              </Form.Item>
            </Form></Col>
          <Col flex="0 1 500px"></Col>
        </Row>
      </Modal>
    </>

  );
};

export default ListUserScreen;