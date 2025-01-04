import { Space } from 'antd';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import Version from './Version';
import Message from './Message';
import Monitor from './Monitor';
import { displaysAtom } from '@/renderer/store';

function Main() {
  const [, setDisplays] = useAtom(displaysAtom);
  useEffect(() => {
    window?.api.triggerMessage((response: TriggerResponse) => {
      if (response.type === 'displays') {
        setDisplays(response.data);
      }
    });
  }, []);

  return (
    <Space direction="vertical">
      <Version />
      <Message />
      <Space direction="vertical" style={{ width: 1000 }}>
        <Monitor />
      </Space>
    </Space>
  );
}

export default Main;
