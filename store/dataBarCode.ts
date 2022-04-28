import { createSlice } from "@reduxjs/toolkit";

export interface DataBarCodeState {
  type : string
  data: string
}

const initialState: DataBarCodeState = {
  type : "",
  data: ''
}

const dataBarCodeSlice = createSlice({
  name: 'dataBarCode',
  initialState,
  reducers: {
    resetCodeBarData: (state) => {
      state.data = ""
      state.type = ""
    },
    getType: (state, action) => {
      state.type = action.payload
    },
    getData: (state, action) => {
      state.data = action.payload
    }
  }
})

export const {resetCodeBarData, getType, getData} = dataBarCodeSlice.actions

export default dataBarCodeSlice.reducer