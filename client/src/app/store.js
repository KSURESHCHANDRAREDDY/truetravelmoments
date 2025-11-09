import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import storyReducer from '../features/stories/storySlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stories: storyReducer,
  },
})
