// import { MessageBoxOptions, NotificationConstructorOptions } from 'electron';

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
  | 'crash'
  | 'version'
  | 'displays'
  | 'openExtWindow'
  | 'closeExtWindow'
  | 'deeplink'
  | 'message'
  | 'systemInfo';

interface ChannelDisplay {
  id: number;
  name: string;
  bounds: Electron.Rectangle;
  isPrimary: boolean;
}

type TriggerResponse =
  | {
      type: 'displays';
      data: ChannelDisplay[];
    }
  | {
      type: 'version';
      data: string;
    }
  | {
      type: 'message';
      data: any;
    }
  | undefined;
