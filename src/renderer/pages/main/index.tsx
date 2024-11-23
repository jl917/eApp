import { useEffect } from "react";

function Main() {
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
    window.electron.receiveMessage("res-displays", (message) => {
      console.log("Received reply from main process:", message);
    });
  }, []);

  return (
    <div>
      <h3>Main</h3>
      <button onClick={getInfo}>모니터 정보 가져오기</button>
      <button onClick={onOpenExtMonitor}>확장모니터 열기</button>
      <button onClick={onCloseExtMonitor}>확장모니터 닫기</button>
    </div>
  );
}

export default Main;
