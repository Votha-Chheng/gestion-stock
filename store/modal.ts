import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  visible : boolean
}

const initialState: ModalState = {
  visible : false
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state) => {
      state.visible = true
    },
    hideModal : (state) =>{
      state.visible = false
    }
  }
})

export const {showModal, hideModal} = modalSlice.actions

export default modalSlice.reducer