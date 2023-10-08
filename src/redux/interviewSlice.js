import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInterviewTitleApi } from "../api/interview";

export const getInterviewTitleList = createAsyncThunk(
  'interview/getInterviewTitleList',
  async () => {
    const { data } = await getInterviewTitleApi()
    return data
  }
)

export const interviewSlice = createSlice({
  name: 'interview',
  initialState: {
    interviewTitleList: []
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getInterviewTitleList.fulfilled, (state, { payload }) => {
      state.interviewTitleList = payload
    })
  }
})

export default interviewSlice.reducer
