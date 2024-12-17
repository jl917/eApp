import { Button, Card, Space } from 'antd';
import { useEffect } from 'react';
import { receiveMessage, safeSend } from '@/renderer/utils/bridge';

function Communication() {
  const onClick = () => {
    safeSend('no-channel', 'hello');
  };

  useEffect(() => {
    receiveMessage('no-channel', (data: any) => {
      console.log(data);
    });
  }, []);

  return (
    <Card title="통신">
      <Space>
        <Button onClick={onClick}>메시지 전송</Button>
      </Space>
    </Card>
  );
}

export default Communication;
