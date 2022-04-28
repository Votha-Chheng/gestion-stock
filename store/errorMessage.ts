import { createSlice } from "@reduxjs/toolkit";

export interface ErrorMessageState {
  error : boolean
  message : string
}

const initialState: ErrorMessageState = {
  message : "",
  error : false
}

const errorMessageSlice = createSlice({
  name: 'errorMessage',
  initialState,
  reducers: {
    getMessageError: (state, action) => {
      state.message = action.payload
    },
    getErrorToTrueOrFalse : (state, action) =>{
      state.error = action.payload
    }
  }
})

export const {getMessageError, getErrorToTrueOrFalse} = errorMessageSlice.actions

export default errorMessageSlice.reducer