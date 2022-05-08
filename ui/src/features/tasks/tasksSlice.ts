import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'app/api';
import { RootState } from 'app/store';
import { Task } from 'common/interfaces';

type TasksState = {
  loading: boolean;
  data: Task[];
  openedTaskId: Task['id'] | null;
};

const initialState: TasksState = {
  loading: false,
  data: [],
  openedTaskId: null,
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
    removeTask: (state, action: PayloadAction<Task['id']>) => {
      state.data.splice(
        state.data.findIndex((task) => task.id === action.payload),
        1,
      );
    },
    openTask: (state, action: PayloadAction<Task['id']>) => {
      state.openedTaskId = action.payload;
    },
    closeTask: (state) => {
      state.openedTaskId = null;
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

export const { addTask, removeTask, openTask, closeTask } = tasksSlice.actions;

export const tasksSelector = (s: RootState) => s.tasks;
export const openedTaskSelector = (s: RootState) =>
  s.tasks.data.find((t) => t.id === s.tasks.openedTaskId);

export default tasksSlice.reducer;
