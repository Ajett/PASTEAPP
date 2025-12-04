
import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("user"));
const savedToken = localStorage.getItem("token");

const slice = createSlice({
  name: "auth",
  initialState: { user: savedUser || null, token: savedToken || null },
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }
});

export const { loginSuccess, logout } = slice.actions;
export default slice.reducer;
