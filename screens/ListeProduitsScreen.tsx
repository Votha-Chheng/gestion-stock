import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import ProductSchema, { Product } from '../models/Product'
import CategorySchema from '../models/Category'
import globalStyles from '../globalStyles'
import InventaireListRender from '../components/InventaireListRender'
import FilterProducts from '../components/FilterProducts'

const ListeProduits: FC = () => {

  const [realm, setRealm] = useState<any>(null)
  const [productsList, setProductsList] = useState<Product[]>([])
  const [errorProducts, setErrorProducts] = useState<boolean>(false)

  useEffect(()=>{
    Realm.open({
      path:"myrealm",
      schema: [ProductSchema, CategorySchema],
      deleteRealmIfMigrationNeeded: true,
    })
    .then(realm => {
      setRealm(realm)

    })

    return(()=>{
      if (realm !== null && !realm.isClosed) {
        realm.close();
      }
    })
    
  }, [])

  useEffect(()=>{
    realm && realm.write(()=>{
      const tempProducts = realm.objects("Product")
      console.log(tempProducts)  
      setProductsList(tempProducts)       
    })
  }, [realm])

  return (
    <View>
      <FilterProducts/>
      
      <View>
        {
          productsList.length >0
          ?
          <FlatList
            data={productsList}
            keyExtractor={(item: Product) => item._id}
            renderItem = {({item}) => (
              <InventaireListRender
                data={item}
              />
            )}
          />
          :
          <Text>Aucun produit</Text>
        }
      </View>
      
      
    </View>
  )
}

export default ListeProduits

const styles = StyleSheet.create({

})