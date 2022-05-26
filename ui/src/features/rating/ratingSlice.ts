import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from 'app/api';
import { RootState } from 'app/store';
import { Rating } from 'common/interfaces';

type RatingState = {
  loading: boolean;
  data: Rating[];
};

const initialState: RatingState = {
  loading: false,
  data: [],
};

export const getRating = createAsyncThunk('rating/get', async () =>
  api.get<Rating[]>('/task/rating'),
);

// TODO: use EntityAdapter https://redux-toolkit.js.org/api/createEntityAdapter
export const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {
    // updateRating: (state, action: PayloadAction<Task>) => {
    //   const taskIndex = state.data.findIndex(
    //     (task) => task.id === action.payload.id,
    //   );
    //   if (taskIndex)
    //     state.data[taskIndex] = { ...state.data[taskIndex], ...action.payload };
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getRating.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
    builder.addCase(getRating.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRating.rejected, (state) => {
      state.loading = false;
    });
  },
});

// export const { updateRating } = ratingSlice.actions;

export const ratingSelector = (s: RootState) => s.rating;

export default ratingSlice.reducer;
