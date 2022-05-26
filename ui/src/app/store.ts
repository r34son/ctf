import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from 'common/store/middlewares/socket';
import auth from 'features/auth/authSlice';
import rating from 'features/rating/ratingSlice';
import tasks from 'features/tasks/tasksSlice';
import { timerSSEMiddleware } from 'features/timer/sseMiddleware';
import timer from 'features/timer/timerSlice';
import app from './appSlice';

// TODO: на логаут ресетить стор к первоначальному значению
export const store = configureStore({
  reducer: {
    app,
    auth,
    timer,
    tasks,
    rating,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.config', 'payload.request'],
      },
    }).concat([socketMiddleware, timerSSEMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
