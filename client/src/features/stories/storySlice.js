import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axiosConfig'

export const fetchStories = createAsyncThunk('stories/fetchAll', async () => {
  const res = await axios.get('/stories')
  return res.data
})

const storySlice = createSlice({
  name: 'stories',
  initialState: { list: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStories.fulfilled, (state, action) => {
      state.list = action.payload
    })
  },
})

export default storySlice.reducer
