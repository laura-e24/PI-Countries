import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '../rootReducer'
const store = configureStore({
  reducer: rootReducer,
  devTools: false
})

export default store