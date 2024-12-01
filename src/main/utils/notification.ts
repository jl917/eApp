import { Notification } from 'electron';
import { RSBUILD_ENTRY_URL } from '@/common/constant';

export function showNotification() {
  const notification = new Notification({
    title: '업데이트 필요',
    body: RSBUILD_ENTRY_URL,
    silent: true,
  });
  notification.show();
}
