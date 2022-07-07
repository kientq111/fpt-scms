import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 25,
    }}
    spin
  />
);

const largeAntIcon = (
  <LoadingOutlined
    style={{
      fontSize: 100,
    }}
    spin
  />
);

const Loader = () => <Spin indicator={antIcon} />;
export const LargeLoader = () => <Spin indicator={largeAntIcon} />;

export default Loader;