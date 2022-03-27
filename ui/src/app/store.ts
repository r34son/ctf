import { configureStore } from '@reduxjs/toolkit';
import auth from 'features/auth/authSlice';
import timer from 'features/timer/timerSlice';
import { timerSSEMiddleware } from 'features/timer/sseMiddleware';

export const store = configureStore({
  reducer: {
    auth,
    timer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.config', 'payload.request'],
      },
    }).concat(timerSSEMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
