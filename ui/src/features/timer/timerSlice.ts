import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { TimerStatus } from './types';

interface TimerState {
  date?: number;
  status: TimerStatus;
}

const initialState: TimerState = {
  status: TimerStatus.STOPPED,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    subscribeEvents: () => {},
    unsubscribeEvents: () => {},
    setDate: (state, action: PayloadAction<number | undefined>) => {
      state.date = action.payload;
    },
    setStatus: (state, action: PayloadAction<TimerStatus>) => {
      state.status = action.payload;
    },
  },
});

export const { subscribeEvents, unsubscribeEvents, setDate, setStatus } =
  timerSlice.actions;

export const timerSelector = (s: RootState) => s.timer;

export default timerSlice.reducer;
