import * as Sentry from '@sentry/electron/main';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line prefer-destructuring
const RSBUILD_SENTRY_DSN = import.meta.env.RSBUILD_SENTRY_DSN;
const environment = process.env.MODE;

export const initSentry = () => {
  if (environment === 'production' || environment === 'beta')
    Sentry.init({
      dsn: RSBUILD_SENTRY_DSN,
      environment,
    });
};
