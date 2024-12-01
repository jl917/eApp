import { Button, Card, Space } from "antd";
import Monitor from "./Monitor";
import { useEffect, useState } from "react";

function Main() {
  const [MAIN_VERSION, setMainVersion] = useState<string | null>(null);
  console.log(WEB_VERSION);
  console.log("hello2");

  useEffect(() => {
    window?.electron?.sendMessage("version");
    window?.electron?.receiveMessage("version", (version: string) => {
      setMainVersion(version);
    });
  }, []);

  return (
    <div>
      <Space direction="vertical">
        <h3>main: {MAIN_VERSION}</h3>
        <h3>web: {WEB_VERSION}</h3>
      </Space>
      <Space
        direction="vertical"
        style={{ width: 1000 }}
      >
        <Monitor />
      </Space>
    </div>
  );
}

export default Main;
