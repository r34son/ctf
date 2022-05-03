import { Middleware } from '@reduxjs/toolkit';
import { api } from 'app/api';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from 'common/interfaces/socket';
import { TokenService } from 'features/auth/tokenService';
import { addTask, removeTask } from 'features/tasks/tasksSlice';
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
  socket.on('task:remove', (taskId) => dispatch(removeTask(taskId)));

  return (next) => (action) => next(action);
};
