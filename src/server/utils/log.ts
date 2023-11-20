import dayjs from 'dayjs';
import { type EventHandlerRequest, H3Event } from 'h3';

export const logger = (type: 'error' | 'warn' | 'info' | 'assert') => {
  return (event: H3Event<EventHandlerRequest>, message: any) => {
    const logType = `[${type.toUpperCase()}]`;

    const logTime = `[${dayjs().toISOString()}]`;

    const logMethod = `[METHOD|${event.method}]`;
    ('');

    const logPath = `[PATH|${event.path}]`;

    const ip = getRequestIP(event, { xForwardedFor: true });
    const logIp = `[IP|${ip}]`;

    const { user } = event.context;
    const logUser = user ? `[USER|${user.username}]` : '';

    const logMessage =
      typeof message === 'string'
        ? `: ${message}`
        : '\n---START LOG---\n' +
          JSON.stringify(message, undefined, 2) +
          '\n----END LOG----';

    const logs = [
      logType,
      logTime,
      logMethod,
      logPath,
      logIp,
      logUser,
      logMessage,
    ];

    const content = logs.join('');

    console[type](content);
  };
};

export const logError = logger('error');
export const logWarn = logger('warn');
export const logInfo = logger('info');
export const logAssert = logger('assert');
