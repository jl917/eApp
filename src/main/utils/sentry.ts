import { CaptureContext } from '@sentry/core';
import { captureException, captureMessage } from '@sentry/node';

export const sendToSentry = (type: CaptureContext | 'error', data: any) => {
  if (type === 'error') {
    captureException(new Error(data));
  } else {
    captureMessage(data, type);
  }
};
