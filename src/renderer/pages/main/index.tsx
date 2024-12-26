import { Space } from 'antd';
import Version from './Version';
import Monitor from './Monitor';
import Message from './Message';
import Communication from './Communication';
import Monitor2 from './Monitor2';

function Main() {
  return (
    <Space direction="vertical">
      <Version />
      <Space direction="vertical" style={{ width: 1000 }}>
        <Monitor />
      </Space>
      <Message />
      <Communication />
      <Space direction="vertical" style={{ width: 1000 }}>
        <Monitor2 />
      </Space>
    </Space>
  );
}

export default Main;
