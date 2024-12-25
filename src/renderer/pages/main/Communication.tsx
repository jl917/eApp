import { Button, Card, Space } from 'antd';

function Communication() {
  const onClick1 = async () => {
    const response = await window.api.sendMessage('typeA', { text: 'hello' });
    console.log(response);
  };

  const onClick2 = async () => {
    const response = await window.api.sendMessage('typeB', { text: 'world' });
    console.log(response);
  };

  const onClick3 = async () => {
    const response = await window.api.sendMessage('typeC', { text: 'error' });
    console.log(response);
  };

  return (
    <Card title="통신">
      <Space>
        <Button onClick={onClick1}>typeA</Button>
        <Button onClick={onClick2}>typeB</Button>
        <Button onClick={onClick3}>typeC</Button>
      </Space>
    </Card>
  );
}

export default Communication;
