import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BarCodeScanner } from "expo-barcode-scanner";

export interface CameraPermissionState {
  cameraStatus : string,
  loading : boolean,
  success: boolean
}

const initialState: CameraPermissionState = {
  cameraStatus : null,
  loading: true,
  success : undefined
}

export const getCameraPermission = createAsyncThunk(
  "cameraStatus/getCameraPermission",
  async() => {
    const {status} = await BarCodeScanner.requestPermissionsAsync()
    return status
  }
)

const cameraPermissionSlice = createSlice({
  name: 'cameraPermission',
  initialState,
  reducers : {},
  extraReducers: (builder) => {
    builder.addCase(getCameraPermission.pending, (state, action)=>{
      state.loading = true
    })
    .addCase(getCameraPermission.fulfilled, (state, action) =>{
      state.loading = false
      state.cameraStatus = action.payload
      state.success = true
    })
    .addCase(getCameraPermission.rejected, (state, action)=>{
      state.loading = false
      state.success = false
    })
  }
})

export default cameraPermissionSlice.reducer