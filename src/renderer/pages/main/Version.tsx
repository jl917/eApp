import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { Card, Space, Statistic } from 'antd';
import { versionAtom } from '@/renderer/store';

function Version() {
  const [MAIN_VERSION, setVersion] = useAtom(versionAtom);
  useEffect(() => {
    (async () => {
      const response = await window.api.sendMessage('version');
      setVersion(response.data);
    })();
  }, []);
  return (
    <Card title="버전">
      <Space>
        <Statistic
          title="main"
          value={MAIN_VERSION}
          style={{ marginRight: 50 }}
        />
        <Statistic title="web" value={WEB_VERSION} />
      </Space>
    </Card>
  );
}

export default Version;
