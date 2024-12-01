import { dialog } from 'electron';
import { autoUpdater } from 'electron-updater';

autoUpdater.setFeedURL({
  provider: 'generic',
  url: 'http://localhost:8080/updates',
});

export const updateAction = () => {
  // 업데이트 로그 설정
  autoUpdater.logger = console;

  // 업데이트 이벤트 핸들러
  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...');
  });

  autoUpdater.on('update-available', (info) => {
    // 업데이트 가능 알림
    dialog
      .showMessageBox({
        type: 'info',
        title: '업데이트 가능',
        message: '새로운 버전 이 disponible합니다.',
        detail: JSON.stringify(info),
        buttons: ['지금 업데이트', '나중에'],
      })
      .then((result) => {
        if (result.response === 0) {
          autoUpdater.downloadUpdate();
        }
      });
  });

  autoUpdater.on('update-not-available', () => {
    console.log('Update not available');
  });

  autoUpdater.on('download-progress', (progressObj) => {
    console.log('Download speed:', progressObj.bytesPerSecond);
    console.log('Downloaded:', `${progressObj.percent}%`);
  });

  autoUpdater.on('update-downloaded', () => {
    // 업데이트 설치 확인 대화상자 또는 자동 설치
    autoUpdater.quitAndInstall();
  });

  // 앱 시작 시 업데이트 확인
  autoUpdater.checkForUpdatesAndNotify();
};
