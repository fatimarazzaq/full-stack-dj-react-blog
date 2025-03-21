import { configureStore } from '@reduxjs/toolkit'
import postReducer from "../features/post/postSlice"
import authReducer from "../features/auth/authSlice"

export default configureStore({
  reducer: {
    post:postReducer,
    auth: authReducer,
  },
})