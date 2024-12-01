export const sendMessage = (channel: Channel, data?: any) => {
  window?.electron?.sendMessage(channel, data);
};

export const receiveMessage = (
  channel: Channel,
  cb: (...rest: any) => void
) => {
  window?.electron?.receiveMessage(channel, cb);
};
