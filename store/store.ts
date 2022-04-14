import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import modalReducer from "./modal"

const store = configureStore({
  reducer: {
    modalVisible: modalReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = ()=> useDispatch<AppDispatch>()

export default store