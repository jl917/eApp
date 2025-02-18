import { Space } from 'antd';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import Version from './Version';
import Message from './Message';
import Monitor from './Monitor';
import { displaysAtom } from '@/renderer/store';
import SystemInfo from './SystemInfo';

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
      <button onClick={() => window.localStorage.setItem("bgcolor", "red")}>set localstorage</button>
      <button onClick={() => alert(window.localStorage.getItem("bgcolor"))}>set localstorage</button>
      <Version />
      <Message />
      <Space direction="vertical" style={{ width: 1000 }}>
        <Monitor />
      </Space>
      <SystemInfo />
    </Space>
  );
}

export default Main;
