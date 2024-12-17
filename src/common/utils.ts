export const mode = process.env.MODE;
export const isDev = mode === 'dev';

export const supportChannels = [
  'version',
  'displays',
  'open-ext-window',
  'close-ext-window',
  'deeplink',
  'no-channel',
];
