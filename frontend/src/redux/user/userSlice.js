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
    }
  }
})

export const { SignInStart, SignInSuccess, SignInFailure, UpdateStart, UpdateFailure, UpdateSuccess } = userSlice.actions;

export default userSlice.reducer;