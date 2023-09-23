import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    userInfo: {}
  },
  reducers: {
    // 初始化用户信息
    initUserInfo: (state, { payload }) => {
      state.userInfo = payload
    },
    // 修改用户登录状态
    changeUserStatus: (state, { payload }) => {
      state.isLogin = payload
    },
    // 清除用户信息
    clearUserInfo: (state) => {
      state.userInfo = {}
    }
  }
})


export const { initUserInfo, changeUserStatus, clearUserInfo } = userSlice.actions
export default userSlice.reducer
