import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategorySchema from "../models/Category";
import Realm from "realm";

export interface CatgoryState {
  categoryList : object[]
  errorLoadCat : boolean
  singlecategory : object
}

const initialState: CatgoryState = {
  categoryList : [],
  errorLoadCat: false,
  singlecategory : {}
}

export const getAllCategories = createAsyncThunk(
  "categoryList/getAllCategories",
  async() => {
    try {
      let allcategories
      const realm = await Realm.open({
        path:"myrealm",
        schema: [CategorySchema],
        deleteRealmIfMigrationNeeded: true,
      })

      const tempCategories = realm.objects("Category")
      allcategories = tempCategories.map((category: any) => 
        Object.fromEntries(
          new Map([
            ['_id', category._id], 
            ['nom', category.nom]
          ])  
        )
      )
      
      return allcategories
    
    } catch (err){

      return err
    } 
    
  }
)

const categoryReducerSlice = createSlice({
  name: 'categoryReducer',
  initialState,
  reducers : {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.pending, (state, action)=>{
      state.errorLoadCat = false
    })
    .addCase(getAllCategories.fulfilled, (state, action) =>{
      state.categoryList = action.payload
      state.errorLoadCat = false
    })
    .addCase(getAllCategories.rejected, (state, action)=>{
      state.errorLoadCat = true
    })
  }
})

export default categoryReducerSlice.reducer