import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SignInStart: (state) => {
      state.loading = true;
    },
    SignInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    SignInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    UpdateStart: (state) => {
      state.loading = true;
    },
    UpdateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    UpdateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    DeleteUserStart: (state) => {
      state.loading = true;
    },
    DeleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    DeleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    UserSignout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    }
  }
})

export const {
  SignInStart, SignInSuccess, SignInFailure, UpdateStart, UpdateFailure, UpdateSuccess, DeleteUserStart, DeleteUserSuccess, DeleteUserFailure, UserSignout
} = userSlice.actions;

export default userSlice.reducer;