import { createSlice } from "@reduxjs/toolkit";

export interface DataBarCodeState {
  type : number
  data: number
}

const initialState: DataBarCodeState = {
  type : null,
  data: null
}

const dataBarCodeSlice = createSlice({
  name: 'dataBarCode',
  initialState,
  reducers: {
    resetCodeBarData: (state) => {
      state.data = null
      state.type = null
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