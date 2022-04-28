import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import globalStyles from '../globalStyles'
import { TextInput } from 'react-native-paper'

type NewProductName = {
  onChangeName : Function
  nom : string
}

const NewProductName: FC<NewProductName> = ({nom, onChangeName}: NewProductName) => {

  return (
    <View>
      <TextInput
        mode='outlined'
        label="Nom du produit"
        value={nom}
        onChangeText={text => onChangeName(text)}
        activeOutlineColor="#86a677"
        outlineColor='#86a677'
        autoComplete={false}
        style={globalStyles.input}
      />
    </View>
  )
}

export default NewProductName

const styles = StyleSheet.create({})