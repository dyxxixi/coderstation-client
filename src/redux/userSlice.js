import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { editUserApi } from '../api/user';

export const updateUserInfo = createAsyncThunk(
  'user/updateUserInfo',
  async (payload, thunkApi) => {
    editUserApi(payload.userId, payload.newInfo)
    thunkApi.dispatch(updateStoreUserInfo(payload.newInfo))
  }
)

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
    },
    // 更新用户信息
    updateStoreUserInfo: (state, { payload }) => {
      // 个人中心那也会用到 所以可能更新多个属性
      for (let key in payload) {
        state.userInfo[key] = payload[key]
      }
    }
  }
})


export const { initUserInfo, changeUserStatus, clearUserInfo, updateStoreUserInfo } = userSlice.actions
export default userSlice.reducer
