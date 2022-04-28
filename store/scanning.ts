import { createSlice } from "@reduxjs/toolkit";

export interface ScanningState {
  scanned : boolean
}

const initialState: ScanningState = {
  scanned : false
}

const scanningSlice = createSlice({
  name: 'scanning',
  initialState,
  reducers: {
    scan: (state) => {
      state.scanned = true
    },
    unscan : (state) =>{
      state.scanned = false
    }
  }
})

export const {scan, unscan} = scanningSlice.actions

export default scanningSlice.reducer