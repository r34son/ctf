import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Team } from 'common/interfaces';
import { api } from 'app/api';
import { AxiosError } from 'axios';
import { TokenService } from './tokenService';
import { LoginData, LoginResponse, LoginErrorResponse } from './types';

type AuthState =
  | {
      isAuthorized: true;
      team: Team;
    }
  | { isAuthorized: false };

const token = TokenService.getAccessToken();

const initialState: AuthState = token
  ? {
      isAuthorized: true,
      team: TokenService.decode(token),
    }
  : { isAuthorized: false };

export const login = createAsyncThunk(
  'auth/login',
  async (data: LoginData, { rejectWithValue }) =>
    api
      .post<LoginResponse>('/auth/login', data)
      .catch((error: AxiosError<LoginErrorResponse>) =>
        rejectWithValue(error.response),
      ),
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (_state) => {
      TokenService.clearAccessToken();
      return { isAuthorized: false };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (_state, { payload }) => {
      const { team, accessToken } = payload;
      TokenService.setAccessToken(accessToken);
      return { isAuthorized: true, team };
    });
  },
});

export const { logout } = authSlice.actions;

export const authSelector = (s: RootState) => s.auth;

export default authSlice.reducer;
