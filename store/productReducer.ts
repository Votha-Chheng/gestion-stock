import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategorySchema from "../models/Category";
import Realm from "realm";
import ProductSchema from "../models/Product";

export interface ProductState {
  productNames : string[]
  errorLoadProductNames : boolean
}

const initialState: ProductState = {
  productNames : [],
  errorLoadProductNames: false
}

export const getAllProductsName= createAsyncThunk(
  "categoryList/getAllProductsName",
  async() => {
    try {
      let productsName
      const realm = await Realm.open({
        path:"myrealm",
        schema: [ProductSchema, CategorySchema],
        deleteRealmIfMigrationNeeded: true,
      })

      const tempProducts = realm.objects("Product")
      productsName = tempProducts.map((product: any) => `${product.nom}`)

      realm.close()

      return productsName
    
    } catch (err){

      return err
    } 
    
  }
)


const productReducerSlice = createSlice({
  name: 'categoryReducer',
  initialState,
  reducers : {},
  extraReducers: (builder) => {
    builder.addCase(getAllProductsName.pending, (state, action)=>{
      state.errorLoadProductNames = false
    })
    .addCase(getAllProductsName.fulfilled, (state, action) =>{
      state.productNames = action.payload
      state.errorLoadProductNames = false
    })
    .addCase(getAllProductsName.rejected, (state, action)=>{
      state.errorLoadProductNames = true
    })
  },

})

export default productReducerSlice.reducer