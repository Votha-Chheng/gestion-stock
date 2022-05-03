import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { Button, TextInput } from 'react-native-paper'
import globalStyles from '../globalStyles'
import { Category } from '../models/Category'

type CategoryPickerProps = {
  chooseCategory: Category
  onValuePickerChange: Function
  onFocus: Function
  onBlur: Function
  focused: boolean
  newCategory: string
  onChangeCategory: Function
  createNewCategory: any
  createCatMode: boolean,
  createCatModeToFalse: Function
  realm: any
}

const CategoryPicker: FC<CategoryPickerProps> = ({
  chooseCategory, 
  focused, 
  newCategory, 
  onValuePickerChange, 
  onFocus, 
  onBlur, 
  onChangeCategory, 
  createNewCategory,
  createCatMode,
  createCatModeToFalse,
  realm
}: CategoryPickerProps) => {

  const [categoryList, setCategoryList] = useState<any[]>()
  const [errorCatList, setErrorCatList] = useState<boolean>()

  useEffect(()=>{

    realm && realm.write(()=>{
      const tempCategories = realm.objects("Category")
      console.log(tempCategories)  
      setCategoryList(tempCategories)   

    })

  }, [realm])


  return (
    <View style={{borderColor: "#c4cfd4", borderWidth:2, padding:2.5, marginBottom:10}}>
    <Text style={{color:"#6e6e72", fontSize:15, marginVertical:5, marginLeft:10}}>Catégorie du produit</Text>
      {
        !createCatMode
        ?
        <Picker 
          mode='dialog' 
          onValueChange={(item: string)=>onValuePickerChange(item)}
          selectedValue={chooseCategory.nom}
          itemStyle={{fontSize:20, padding:0, margin:0}}
          style={{backgroundColor: "#e0e0e1"}}
          placeholder="Choisir une catégorie..."
          onFocus={()=>onFocus()}
          onBlur={()=>onBlur()}
        >
          <Picker.Item label="Choisir catégorie..." enabled={!focused ? true : false} value={null} color='#66666e'/>  
          <Picker.Item label="Nouvelle catégorie" value={"Nouvelle catégorie"} color='#292f36'/>
          {
            categoryList && categoryList.map((cat:Category) => {
              return (
                <Picker.Item key={cat._id} label={cat.nom} value={cat.nom} color='#292f36' />
              )
            })
          }
        </Picker>
        :
        <View>
          <TextInput
            mode='outlined'
            label="Entrer une nouvelle catégorie"
            value={newCategory}
            outlineColor="#621b00"
            activeOutlineColor="#a32e00"
            onChangeText={text => onChangeCategory(text)}
            autoComplete={false}
            style={globalStyles.input}
          />
          <View style={{flexDirection:"row", width:"100%", paddingRight:3.5 }}>
            <Button
              mode='contained' 
              color="#698d68" 
              labelStyle={{fontSize:12}} 
              style={{width:"60%", marginRight:2.5, marginBottom:5 }}
              onPress={createNewCategory}
            >
              Ajouter catégorie
            </Button>
            <Button mode='contained' color="#b64e3e" labelStyle={{fontSize:12}} style={{width:"40%", marginBottom:5}} onPress={()=>createCatModeToFalse()}>Annuler</Button>
          </View>
        </View>            
      }  
    </View>
  )
}

export default CategoryPicker

const styles = StyleSheet.create({})