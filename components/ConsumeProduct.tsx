import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { Product } from '../models/Product'
import globalStyles from '../globalStyles'
import { Button, TextInput } from 'react-native-paper'
import { newQtyToNumber } from '../utils'

type ScannedProductProps = {
  data: number
  product: Product
  qtyOut: string
  setQtyOut: Function
  validateQtyOut: Function
  cancelQtyOut: Function
}

const ConsumeProduct: FC<ScannedProductProps> = ({product, qtyOut, setQtyOut, validateQtyOut, cancelQtyOut, data}: ScannedProductProps) => {

  return (
    <View>
      <View>
        <Text style={[globalStyles.screenTitle, {color:"orange"}]}>Sortir de l'inventaire</Text>
      </View>
      <Text style={{textAlign:"center", marginBottom:20}}>Code-barre n° {data}</Text>
      <View style={{flexDirection:"row", width:"100%", justifyContent:"space-between", marginBottom:20}}>
        <View style={{width:"50%", paddingLeft:10}}>
          <Text style={[globalStyles.nom, {alignSelf:'flex-start'}]}>{product.nom}</Text>
          <Text style={globalStyles.marque}>{product.marque}</Text>
          <Text style={[globalStyles.categorie, {alignSelf:'flex-start'}]}>{product.categorie.nom}</Text>
        </View>

        <View style={{width:"50%", flexDirection:"row", alignItems:"center"}}>
          <View style={{width:"60%", justifyContent:"center"}}>
            <Text style={{height: 50 }}>Qté actuelle : </Text>
            <Text style={{height: 50, color:"black" }}>Qté à retirer : </Text>
            <Text style={{fontFamily:"Rubik_600SemiBold", color: "orange"}}>Stock total : </Text>
          </View>
          <View>
            <Text style={{marginTop:5, height: 40, alignSelf: "center"}}>{product.qty}</Text>
            <TextInput
              mode='flat'
              label=""
              value={qtyOut}
              activeOutlineColor="#337171"
              outlineColor='#c4cfd4'
              onChangeText={text => setQtyOut(text)}
              onFocus={()=>setQtyOut("")}
              autoComplete={false}
              keyboardType="numeric"
              dense={true}
              style={{marginTop:0}}
            />
            {
              product.qty - newQtyToNumber(qtyOut) > -1 
              ?
              <Text style={{marginBottom:10, marginTop: 25, fontFamily:"Rubik_600SemiBold", color: "orange"}}>
                { product.qty - newQtyToNumber(qtyOut)}
              </Text>
              :
              <Text style={{marginBottom:10, marginTop: 25, fontFamily:"Rubik_600SemiBold", color: "red"}}>
                Erreur !
              </Text>
            }
            
          </View>
        </View>
      </View>
      <View style={{flexDirection:'row', justifyContent:'center'}}>
        <Button mode="contained" color="#d44f0c" style={{width:"40%", marginRight:10}} onPress={()=>cancelQtyOut()}>
          Annuler
        </Button>
        <Button mode="contained" color="green" style={{width:"40%", marginLeft:10}} onPress={()=>validateQtyOut()}>
          Valider
        </Button>
      </View>
    </View>
  )
}

export default ConsumeProduct

const styles = StyleSheet.create({

})