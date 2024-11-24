import { Button, Card, Space } from "antd";
import Monitor from "./Monitor";

function Main() {
  return (
    <div>
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
