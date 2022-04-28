import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { getAllProductsName } from '../store/productReducer'

const ListeProduits: FC = () => {

  const {productNames} = useSelector((state : RootState)=> state.productState)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAllProductsName())
  }, [])

  return (
    <View>
      <Text>{Array.from(productNames).toString()}</Text>
      {
        productNames.length>0 
        ?
        productNames.map((prod, index )=>(
          <Text key={index}>
            {prod}
          </Text>
        ))
        :
        <Text>Aucun produit</Text>
      }
      
    </View>
  )
}

export default ListeProduits

const styles = StyleSheet.create({

})