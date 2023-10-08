import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTypesApi } from "../api/type";

// 处理请求
export const getTypesList = createAsyncThunk(
  'type/getTypesList',
  async () => {
    const response = await getTypesApi()
    return response.data
  }
)

export const typeSlice = createSlice({
  name: 'type',
  initialState: {
    typesList: [],
    issueTypeId: 'all',
    bookTypeId: 'all'
  },
  reducers: {
    updateIssueTypeId: (state, { payload }) => {
      state.issueTypeId = payload
    },
    updateBookTypeId: (state, { payload }) => {
      state.bookTypeId = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTypesList.fulfilled, (state, { payload }) => {
      state.typesList = payload
    })
  }
})

export const { updateIssueTypeId, updateBookTypeId } = typeSlice.actions
export default typeSlice.reducer
