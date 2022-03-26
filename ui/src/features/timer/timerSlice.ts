import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { TimerStatus } from './types';

interface TimerState {
  status: TimerStatus;
}

const initialState: TimerState = {
  status: TimerStatus.STOPPED,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<TimerStatus>) => {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = timerSlice.actions;

export const timerSelector = (s: RootState) => s.timer;

export default timerSlice.reducer;
