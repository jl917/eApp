import { CaptureContext } from '@sentry/core';
import Sentry from '@sentry/node';

export const sendToSentry = (type: CaptureContext | 'error', data: any) => {
  if (type === 'error') {
    Sentry.captureException(new Error(data));
  } else {
    Sentry.captureMessage(data, type);
  }
};
