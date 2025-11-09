import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axiosConfig'

export const fetchMe = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/auth/me')
      return res.data.user
    } catch (err) {
      const message = err?.response?.data?.message || 'Not authenticated'
      return rejectWithValue(message)
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post('/auth/login', data)
      return res.data.user
    } catch (err) {
      const message = err?.response?.data?.message || 'Login failed'
      return rejectWithValue(message)
    }
  }
)

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await axios.post('/auth/logout')
    return null
  } catch (err) {
    const message = err?.response?.data?.message || 'Logout failed'
    return rejectWithValue(message)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.status = 'idle'
        state.error = action.payload || null
        state.user = null
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Login failed'
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
      })
  },
})

export default authSlice.reducer
