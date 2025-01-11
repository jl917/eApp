import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { Card, Tabs, TabsProps } from 'antd';
import { systemInfoAtom } from '@/renderer/store';

function SystemInfo() {
  const [systemInfo, setSystemInfo] = useAtom(systemInfoAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await window.api.sendMessage('systemInfo');
      setIsLoading(false);
      setSystemInfo(response.data);
    })();
  }, []);

  const items: TabsProps['items'] = Object.entries(systemInfo).map(
    ([key, value]) => ({
      key,
      label: key,
      children: <pre>{JSON.stringify(value, null, 2)}</pre>,
    })
  );

  return (
    <Card title="시스템 정보" loading={isLoading}>
      <Tabs defaultActiveKey="1" items={items} style={{ maxWidth: 950 }} />
    </Card>
  );
}

export default SystemInfo;
