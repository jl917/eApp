import { Button, Card, List, Space } from 'antd';
import { useEffect, useState } from 'react';

function Monitor() {
  // const [displays, setDisplays] = useState<DisplayInfo[]>([]);
  // const getInfo = () => {
  //   window?.electron?.sendMessage('displays');
  // };

  const onOpenExtMonitor = async () => {
    const response = await window.api.sendMessage('openExtWindow');
    console.log(typeof response);
  };

  const onCloseExtMonitor = async () => {
    const response = await window.api.sendMessage('closeExtWindow');
    console.log(response);
  };

  return (
    <Card title="모니터">
      <Space>
        {/* <Button onClick={getInfo}>모니터 정보 가져오기</Button> */}
        <Button onClick={onOpenExtMonitor}>확장모니터 열기</Button>
        <Button onClick={onCloseExtMonitor}>확장모니터 닫기</Button>
      </Space>

      {/* <List
        itemLayout="horizontal"
        dataSource={displays}
        renderItem={(item, index) => (
          <List.Item title={item.name} key={index}>
            <List.Item.Meta
              title={item.name}
              description={
                <>
                  <div>id: {item.id}</div>
                  <div>
                    해상도: {item.bounds.width} x {item.bounds.height}
                  </div>
                  <div>
                    위치: {item.bounds.x}, {item.bounds.y}
                  </div>
                  <div>주모니터: {item.isPrimary ? 'Y' : 'N'}</div>
                </>
              }
            />
          </List.Item>
        )}
      /> */}
    </Card>
  );
}

export default Monitor;
