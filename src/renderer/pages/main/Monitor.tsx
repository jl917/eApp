import { Button, Card, List, Space } from "antd";
import { useEffect, useState } from "react";

function Monitor() {
  const [displays, setDisplays] = useState<DisplayInfo[]>([]);
  const getInfo = () => {
    window.electron.sendMessage("req-displays");
  };

  const onOpenExtMonitor = () => {
    window.electron.sendMessage("req-open-ext-window");
  };

  const onCloseExtMonitor = () => {
    window.electron.sendMessage("req-close-ext-window");
  };

  useEffect(() => {
    window.electron.receiveMessage("res-displays", (message: DisplayInfo[]) => {
      setDisplays(message);
      console.log("Received reply from main process:", message);
    });
  }, []);

  return (
    <Card title="모니터">
      <Space>
        <Button onClick={getInfo}>모니터 정보 가져오기</Button>
        <Button onClick={onOpenExtMonitor}>확장모니터 열기</Button>
        <Button onClick={onCloseExtMonitor}>확장모니터 닫기</Button>
      </Space>

      <List
        itemLayout="horizontal"
        dataSource={displays}
        renderItem={(item, index) => (
          <List.Item title={item.name}>
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
                  <div>주모니터: {item.isPrimary ? "Y" : "N"}</div>
                </>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
}

export default Monitor;
