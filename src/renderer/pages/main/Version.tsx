import { Card, Space, Statistic } from "antd";
import { useEffect, useState } from "react";
import { receiveMessage, sendMessage } from "@/renderer/utils/bridge";

function Version() {
  const [MAIN_VERSION, setMainVersion] = useState<string | null>(null);
  console.log(WEB_VERSION);

  useEffect(() => {
    sendMessage("version");
    receiveMessage("version", (version: string) => {
      setMainVersion(version);
    });
  }, []);

  return (
    <Card title="버전">
      <Space>
        <Statistic
          title="main"
          value={MAIN_VERSION}
          style={{ marginRight: 50 }}
        />
        <Statistic
          title="web"
          value={WEB_VERSION}
        />
      </Space>
    </Card>
  );
}

export default Version;
