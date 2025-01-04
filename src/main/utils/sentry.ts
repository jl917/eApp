import { captureException, captureMessage } from '@sentry/node';

export const sendToSentry = (type: 'info' | 'warning' | 'error', data: any) => {
  if (type === 'error') {
    captureException(new Error(data));
  } else {
    captureMessage(data, type);
  }
  throw new Error(data);
};
