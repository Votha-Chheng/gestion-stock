import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { Product } from '../models/Product'
import { Button, TextInput } from 'react-native-paper'
import { newQtyToNumber } from '../utils'
import globalStyles from '../globalStyles'

type EnterProductProps = {
  data: number
  product: Product
  validateNewStock : Function
  newQty: string
  setNewQty: Function
  cancelNewStock: Function
}

const EnterProduct: FC<EnterProductProps> = ({data, product, validateNewStock, newQty, setNewQty, cancelNewStock}: EnterProductProps) => {

  return (
    <View>
      <Text style={[globalStyles.screenTitle, {color:"green"}]}>Ajouter dans l'inventaire</Text>
      <Text style={{textAlign:"center", marginVertical:20}}>Code-barre n° {data}</Text>
      <View style={{flexDirection:"row", width:"100%", justifyContent:"space-between", marginBottom:20}}>
        <View style={{width:"50%", paddingLeft:10}}>
          <Text style={[globalStyles.nom, {alignSelf:'flex-start'}]}>{product.nom}</Text>
          <Text style={globalStyles.marque}>{product.marque}</Text>
          <Text style={[globalStyles.categorie, {alignSelf:'flex-start'}]}>{product.categorie.nom}</Text>
        </View>

        <View style={{width:"50%", flexDirection:"row", alignItems:"center"}}>
          <View style={{width:"60%", justifyContent:"center"}}>
            <Text style={{height: 50 }}>Qté actuelle : </Text>
            <Text style={{height: 50 }}>Qté à ajouter : </Text>
            <Text style={{fontFamily:"Rubik_600SemiBold", color:"purple"}}>Stock total : </Text>
          </View>
          <View>
            <Text style={{marginTop:5, height: 40, alignSelf: "center"}}>{product.qty}</Text>
            <TextInput
              mode='flat'
              label=""
              value={newQty}
              activeOutlineColor="#337171"
              outlineColor='#c4cfd4'
              onChangeText={text => setNewQty(text)}
              onFocus={()=>setNewQty("")}
              autoComplete={false}
              keyboardType="numeric"
              dense={true}
              style={{marginTop:0}}
            />
            <Text style={{marginBottom:10, marginTop: 25, fontFamily:"Rubik_600SemiBold", color: "purple"}}>{product.qty + newQtyToNumber(newQty)}</Text>
          </View>
        </View>
      </View>
      <View style={{flexDirection:'row', justifyContent:'center'}}>
        <Button mode="contained" color="#d44f0c" style={{width:"40%", marginRight:10}} onPress={()=>cancelNewStock()}>
          Annuler
        </Button>
        <Button mode="contained" color="green" style={{width:"40%", marginLeft:10}} onPress={()=>validateNewStock()}>
          Valider
        </Button>
      </View>
    </View>
  )
}

export default EnterProduct

const styles = StyleSheet.create({})