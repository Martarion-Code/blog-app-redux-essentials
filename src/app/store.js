import { configureStore } from '@reduxjs/toolkit'
import postSliceReducer from '../features/posts/postSlice'
import userSliceReducer from '../features/users/userSlice'
export default configureStore({
  reducer: {
    posts: postSliceReducer,
    users: userSliceReducer,
  },
})
