import { Button, Card, message, Space } from 'antd';
import { sendMessage } from '@/renderer/utils/bridge';

function Message() {
  const getMessage = () => {
    message.info('일반 message');
  };

  const getSystemMessage = () => {
    sendMessage('message', {
      type: 'notification',
      config: { title: 'string', body: 'hello world' },
    });
  };

  const getSystemDialog = () => {
    sendMessage('message', {
      type: 'dialog',
      config: {
        type: 'info',
        buttons: ['OK', 'Cancel'],
        defaultId: 0,
        title: 'Sample Dialog',
        message: 'This is a sample dialog box.',
      },
    });
  };

  return (
    <Card title="메시지">
      <Space>
        <Button onClick={getMessage}>일반 메시지</Button>
        <Button onClick={getSystemMessage}>시스템 알림 메시지</Button>
        <Button onClick={getSystemDialog}>시스템 dialog 메시지</Button>
      </Space>
    </Card>
  );
}

export default Message;
