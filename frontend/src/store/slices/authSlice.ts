import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../../interfaces/user.interface";

interface AuthState {
  userInfo: UserInfo;
}

const initialState: AuthState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(`${localStorage.getItem("userInfo")}`)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice;
