import { Button, Card, message, Space } from 'antd';

function Message() {
  const getMessage = () => {
    message.info('일반 message');
  };

  const getSystemMessage = async () => {
    const response = await window.api.sendMessage('message', {
      type: 'notification',
      config: { title: 'string', body: 'hello world' },
    });
    console.log(response);
  };

  const getSystemDialog = async () => {
    const response = await window.api.sendMessage('message', {
      type: 'dialog',
      config: {
        type: 'info',
        buttons: ['OK', 'Cancel'],
        defaultId: 0,
        title: 'Sample Dialog',
        message: 'This is a sample dialog box.',
      },
    });
    console.log(response);
  };

  const noChannel = async () => {
    // eslint-disable-next-line
    // @ts-ignore
    const response = await window.api.sendMessage('type1');
    console.log(response);
  };

  return (
    <Card title="메시지">
      <Space>
        <Button onClick={getMessage}>일반 메시지</Button>
        <Button onClick={getSystemMessage}>시스템 알림 메시지</Button>
        <Button onClick={getSystemDialog}>시스템 dialog 메시지</Button>
        <Button onClick={noChannel}>없는 채널로 전송</Button>
      </Space>
    </Card>
  );
}

export default Message;
