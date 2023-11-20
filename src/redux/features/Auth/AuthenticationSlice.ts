import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "@/conf";
import axios from "axios";
import { UserType } from "@/types/Auth/authentication";

type InitialStateType = {
  isAuthenticated: boolean;
  loading: boolean;
  user: UserType | null;
};

const initialState = <InitialStateType>{
  isAuthenticated: false,
  loading: true,
  user: null,
};

export const loadUser = createAsyncThunk(
  "authentication/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${config.baseUrl}/users/me`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        return response.data.user;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  }
);

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setLoginUser(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
    },
    updateUser(state, action) {
      state.user = action.payload;
    },
    logoutUser(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUser.pending, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = { ...action.payload };
      state.loading = false;
    });
    builder.addCase(loadUser.rejected, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    });
  },
});
export const { setLoginUser, logoutUser ,updateUser} = authenticationSlice.actions;
export default authenticationSlice.reducer;
