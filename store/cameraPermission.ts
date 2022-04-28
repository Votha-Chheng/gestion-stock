import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BarCodeScanner } from "expo-barcode-scanner";

export interface CameraPermissionState {
  cameraStatus : string,
  loading : boolean,
  errorCam: boolean
}

const initialState: CameraPermissionState = {
  cameraStatus : null,
  loading: true,
  errorCam : false
}

export const getCameraPermission = createAsyncThunk(
  "cameraStatus/getCameraPermission",
  async() => {
    try {
      const {status} = await BarCodeScanner.requestPermissionsAsync()
      return status
    
    } catch (err){
      return err
    } 
    
  }
)

const cameraPermissionSlice = createSlice({
  name: 'cameraPermission',
  initialState,
  reducers : {},
  extraReducers: (builder) => {
    builder.addCase(getCameraPermission.pending, (state, action)=>{
      state.loading = true
      state.errorCam = false
    })
    .addCase(getCameraPermission.fulfilled, (state, action) =>{
      state.loading = false
      state.cameraStatus = action.payload
      state.errorCam = false
    })
    .addCase(getCameraPermission.rejected, (state, action)=>{
      state.loading = false
      state.errorCam = true
    })
  }
})

export default cameraPermissionSlice.reducer