import { configureStore } from '@reduxjs/toolkit';
import auth from 'features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.config', 'payload.request'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
