import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

type AppState = {
  isMenuOpened: boolean;
};

const initialState: AppState = {
  isMenuOpened: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpened = !state.isMenuOpened;
    },
  },
});

export const { toggleMenu } = appSlice.actions;

export const appSelector = (s: RootState) => s.app;

export default appSlice.reducer;
