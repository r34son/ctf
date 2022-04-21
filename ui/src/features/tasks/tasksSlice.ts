import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'app/api';
import { RootState } from 'app/store';
import { Task } from 'common/interfaces';

type TasksState = {
  loading: boolean;
  data: Task[];
};

const initialState: TasksState = {
  loading: false,
  data: [],
};

export const getTasks = createAsyncThunk('tasks/get', async () =>
  api.get<Task[]>('/task'),
);

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.data.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.data.splice(
        state.data.findIndex((task) => task.id === action.payload),
        1,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
    builder.addCase(getTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTasks.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { addTask, removeTask } = tasksSlice.actions;

export const tasksSelector = (s: RootState) => s.tasks;

export default tasksSlice.reducer;
