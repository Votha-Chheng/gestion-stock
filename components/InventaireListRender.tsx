import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { Product } from '../models/Product'

type InventaireListRenderProps = {
  data : Product
}

const InventaireListRender: FC<InventaireListRenderProps> = ({data}: InventaireListRenderProps) => {

  const renderColorText = (product: Product) : string =>{
    return product.qty < product.stockLimite ? "#e7efeb" : "#697771"
    
  }
  return (
    <TouchableOpacity style={[styles.itemContainer, {backgroundColor: `${data.qty < data.stockLimite ? "red": "#e7efeb"}`}]}>
      <View style={styles.info}>
        <Text style={[styles.marque, {color: renderColorText(data)}]}>{data.marque}</Text>
        <Text style={[styles.nom, {color: renderColorText(data)}]}>{data.nom}</Text>
        <Text style={[styles.categorie, {color: renderColorText(data)}]}>{data.categorie.nom}</Text>
      </View>
      <View style={styles.infoQty}>
        <Text style={{color: renderColorText(data)}}>Stock actuel</Text>
        <Text style={[styles.qty, {color: renderColorText(data)}]}>{data.qty}</Text>
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
  },
  infoQty: {
    width: "25%",
    justifyContent: "center",
    alignItems: 'center',
    fontFamily: "Rubik_300Light"
  },
  categorie: {
    fontSize: 15,
    fontFamily: "Rubik_400Regular",
    marginVertical:2.5,
    alignSelf: 'center'
  },
  marque: {
    fontSize: 20,
    fontFamily: "Rubik_500Medium_Italic",
    marginVertical:2.5
  },
  nom: {
    fontSize: 17,
    fontFamily: "Rubik_600SemiBold",
    marginVertical:2.5,
    alignSelf: 'center'
  },
  qty: {
    fontFamily: "Rubik_600SemiBold",
  }
})