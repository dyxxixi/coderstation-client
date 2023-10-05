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
    typesList: []
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getTypesList.fulfilled, (state, { payload }) => {
      state.typesList = payload
    })
  }
})

export default typeSlice.reducer
