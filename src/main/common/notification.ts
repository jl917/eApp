import { Notification } from "electron";
import { VITE_ENTRY_URL } from "../constant";

export function showNotification() {
  const notification = new Notification({
    title: "업데이트 필요",
    body: VITE_ENTRY_URL,
  });
  notification.show();
}
