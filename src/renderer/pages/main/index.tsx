import { Space } from 'antd';
import Version from './Version';
import Monitor from './Monitor';

function Main() {
  return (
    <Space direction="vertical">
      <Version />
      <Space direction="vertical" style={{ width: 1000 }}>
        <Monitor />
      </Space>
    </Space>
  );
}

export default Main;
