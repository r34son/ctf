import { Middleware } from '@reduxjs/toolkit';
import { api } from 'app/api';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from 'common/interfaces/socket';
import { TokenService } from 'features/auth/tokenService';
import { addTask } from 'features/tasks/tasksSlice';
import { io, Socket } from 'socket.io-client';

export const socketMiddleware: Middleware = ({ dispatch }) => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    `${api.defaults.baseURL}`,
    {
      auth: {
        token: TokenService.getAccessToken(),
      },
    },
  );

  socket.on('connect', () => console.log(socket.id));

  socket.on('connect_error', (err) => console.log(err.message));

  socket.on('task:add', (task) => dispatch(addTask(task)));

  return (next) => (action) => {
    // if (subscribeEvents.match(action)) {
    //   sse = new EventSource(`${api.defaults.baseURL}/timer/events`);
    //   sse.addEventListener('init', (e) => {
    //     const { status, endDate } = JSON.parse((e as MessageEvent).data);
    //     dispatch(setDate(+endDate));
    //     dispatch(setStatus(status));
    //   });

    //   sse.addEventListener('start', (e) => {
    //     dispatch(setDate(+(e as MessageEvent<string>).data));
    //     dispatch(setStatus(TimerStatus.RUNNING));
    //   });

    //   sse.addEventListener('stop', () => {
    //     dispatch(setDate(undefined));
    //     dispatch(setStatus(TimerStatus.STOPPED));
    //   });

    //   sse.addEventListener('pause', () =>
    //     dispatch(setStatus(TimerStatus.PAUSED)),
    //   );

    //   sse.addEventListener('resume', (e) => {
    //     dispatch(setDate(+(e as MessageEvent<string>).data));
    //     dispatch(setStatus(TimerStatus.RUNNING));
    //   });
    // }

    // if (unsubscribeEvents.match(action)) {
    //   sse?.close();
    // }

    next(action);
  };
};
