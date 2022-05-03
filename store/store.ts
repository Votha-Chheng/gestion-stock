import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import modalReducer from "./modal"
import cameraPermissionReducer from "./cameraPermission"
import scanningReducer from "./scanning"
import codeBarDataTypeReducer from "./dataBarCode"
import errorMessageReducer from './errorMessage'


const store = configureStore({
  reducer: {
    modalVisible: modalReducer,
    cameraPermission : cameraPermissionReducer,
    scanning : scanningReducer,
    codeBarDataType : codeBarDataTypeReducer,
    errorMessage : errorMessageReducer,

  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = ()=> useDispatch<AppDispatch>()

export default store