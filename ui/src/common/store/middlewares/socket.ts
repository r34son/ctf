import { Middleware } from '@reduxjs/toolkit';
import { api } from 'app/api';
import { AppDispatch, RootState } from 'app/store';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from 'common/interfaces/socket';
import { TokenService } from 'features/auth/tokenService';
import { getRating } from 'features/rating/ratingSlice';
import {
  addTask,
  getTasks,
  removeTask,
  updateTask,
} from 'features/tasks/tasksSlice';
import { io, Socket } from 'socket.io-client';

export const socketMiddleware: Middleware = ({ dispatch, getState }) => {
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
  socket.on('task:update', (task) => dispatch(updateTask(task)));
  socket.on('task:solve', ({ teamId }) => {
    const { auth } = getState() as RootState;
    (dispatch as AppDispatch)(getRating());

    if (auth.isAuthorized && teamId === getState().auth.team.id)
      (dispatch as AppDispatch)(getTasks());
  });

  return (next) => (action) => next(action);
};
