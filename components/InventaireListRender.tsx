import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { Product } from '../models/Product'
import globalStyles from '../globalStyles'

type InventaireListRenderProps = {
  data : Product
  onPressFunction : Function
}

const InventaireListRender: FC<InventaireListRenderProps> = ({data, onPressFunction}: InventaireListRenderProps) => {

  const renderColorText = (product: Product) : string =>{
    return product.qty <= product.stockLimite ? "#e7efeb" : "#697771"
    
  }
  return (
    <TouchableOpacity style={[styles.itemContainer, {backgroundColor: `${data.qty <= data.stockLimite ? "red": "#e7efeb"}`}]} onPress={()=> onPressFunction(data._id)}>
      <View style={styles.info}>
        <Text style={[globalStyles.marque, {color: renderColorText(data)}]}>{data.marque}</Text>
        <Text style={[globalStyles.nom, {color: renderColorText(data)}]}>{data.nom}</Text>
        <Text style={[globalStyles.categorie, {color: renderColorText(data)}]}>{data.categorie.nom}</Text>
      </View>
      <View style={globalStyles.infoQty}>
        <Text style={{color: renderColorText(data)}}>Stock actuel</Text>
        <Text style={[globalStyles.qty, {color: renderColorText(data)}]}>{data.qty}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default InventaireListRender

const styles = StyleSheet.create({
  itemContainer: {
    padding: 5,
    marginHorizontal: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius:5,
    flexDirection: "row"
  },
  info: {
    width:"75%"
  }
  
})