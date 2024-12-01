import { Button, Card, Space } from "antd";
import Monitor from "./Monitor";

function Main() {
  console.log(VERSION)
  return (
    <div>
      {VERSION}
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
