// import { dialog } from 'electron';
// import { autoUpdater } from 'electron-updater';
// import { sendToSentry } from '../utils/sentry';
import { updateElectronApp, UpdateSourceType } from 'update-electron-app';
import { RSBUILD_MODE } from '@/common/constant';

// autoUpdater.setFeedURL({
//   provider: 'generic',
//   url: 'http://localhost:8080/updates',
// });

export const updateAction = () => {
  updateElectronApp({
    updateSource: {
      type: UpdateSourceType.StaticStorage,
      baseUrl: `https://eapp-beta.s3.ap-northeast-2.amazonaws.com/${RSBUILD_MODE}/${process.platform}/${process.arch}`, // 교체 필요
    },
  });
  // updateElectronApp();
  // // 업데이트 로그 설정
  // autoUpdater.logger = console;

  // // 업데이트 이벤트 핸들러
  // autoUpdater.on('checking-for-update', () => {
  //   console.log('Checking for update...');
  //   sendToSentry('info', 'Checking for update...');
  // });

  // autoUpdater.on('update-available', (info) => {
  //   // 업데이트 가능 알림
  //   dialog
  //     .showMessageBox({
  //       type: 'info',
  //       title: '업데이트 가능',
  //       message: '새로운 버전 이 disponible합니다.',
  //       detail: JSON.stringify(info),
  //       buttons: ['지금 업데이트', '나중에'],
  //     })
  //     .then((result) => {
  //       if (result.response === 0) {
  //         sendToSentry('info', '업데이트 다운로드');
  //         autoUpdater.downloadUpdate();
  //       }
  //     });
  // });

  // autoUpdater.on('update-not-available', () => {
  //   console.log('Update not available');
  // });

  // autoUpdater.on('download-progress', (progressObj) => {
  //   console.log('Download speed:', progressObj.bytesPerSecond);
  //   console.log('Downloaded:', `${progressObj.percent}%`);
  // });

  // autoUpdater.on('update-downloaded', () => {
  //   sendToSentry('info', '업데이트 완료');
  //   // 업데이트 설치 확인 대화상자 또는 자동 설치
  //   autoUpdater.quitAndInstall();
  // });

  // autoUpdater.forceDevUpdateConfig = true;
  // // 앱 시작 시 업데이트 확인
  // autoUpdater.checkForUpdatesAndNotify();
};
