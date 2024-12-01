import { receiveMessage, sendMessage } from "@/main/utils/bridge";

export const getMainVersion = () => {
  receiveMessage("version", () => {
    sendMessage("version", MAIN_VERSION);
  });
};
