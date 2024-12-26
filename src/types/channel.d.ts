interface ChannelCommunicationSuccess {
  channel: Channel;
  success: true;
  message: string;
}
interface ChannelCommunicationFaild {
  type: Channel;
  success: false;
  error: string;
}

type Channel =
  | 'version'
  | 'displays'
  | 'openExtWindow'
  | 'closeExtWindow'
  | 'open-ext-window'
  | 'close-ext-window'
  | 'deeplink'
  | 'message';
