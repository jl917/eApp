import { Space } from 'antd';
import Version from './Version';
import Monitor from './Monitor';
import Message from './Message';
import Communication from './Communication';

function Main() {
  return (
    <Space direction="vertical">
      <Version />
      <Space direction="vertical" style={{ width: 1000 }}>
        <Monitor />
      </Space>
      <Message />
      <Communication />
    </Space>
  );
}

export default Main;
