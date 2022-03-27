import { api } from 'app/api';
import {
  setDate,
  setStatus,
  subscribeEvents,
  unsubscribeEvents,
} from 'features/timer/timerSlice';
import { TimerStatus } from 'features/timer/types';
import { Middleware } from '@reduxjs/toolkit';

export const timerSSEMiddleware: Middleware = ({ dispatch }) => {
  let sse: EventSource | undefined;

  return (next) => (action) => {
    if (subscribeEvents.match(action)) {
      sse = new EventSource(`${api.defaults.baseURL}/timer/events`);
      sse.addEventListener('init', (e) => {
        const { status, endDate } = JSON.parse((e as MessageEvent).data);
        dispatch(setDate(+endDate));
        dispatch(setStatus(status));
      });

      sse.addEventListener('start', (e) => {
        dispatch(setDate(+(e as MessageEvent<string>).data));
        dispatch(setStatus(TimerStatus.RUNNING));
      });

      sse.addEventListener('stop', () => {
        dispatch(setDate(undefined));
        dispatch(setStatus(TimerStatus.STOPPED));
      });

      sse.addEventListener('pause', () =>
        dispatch(setStatus(TimerStatus.PAUSED)),
      );

      sse.addEventListener('resume', (e) => {
        dispatch(setDate(+(e as MessageEvent<string>).data));
        dispatch(setStatus(TimerStatus.RUNNING));
      });
    }

    if (unsubscribeEvents.match(action)) {
      sse?.close();
    }

    next(action);
  };
};
