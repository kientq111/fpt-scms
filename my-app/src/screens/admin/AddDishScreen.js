import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Switch, Card, Space
} from 'antd';
import { useState } from 'react';

const { TextArea } = Input;

const AddDishScreen = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);

  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };

  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card
          title="Add Dish"
          bordered={false}
          style={{
            marginTop: 20, marginLeft: 50,
            width: 1000, height: 700
          }}
        >
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            onValuesChange={onFormLayoutChange}
          >
            <Form.Item label="Dish Name">
              <Input />
            </Form.Item>
            <Form.Item label="Menu">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Sub Category">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Description">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item style={{marginLeft:160}}>
              <Space size={'large'}>
                <Button type='primary'>Add Dish</Button>
                <Button>Cancel</Button>
              </Space>

            </Form.Item>
          </Form>

        </Card>
      </div>

    </>
  );
};

export default AddDishScreen;