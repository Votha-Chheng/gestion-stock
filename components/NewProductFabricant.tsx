import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { TextInput } from 'react-native-paper'
import globalStyles from '../globalStyles'

type NewProductFabricant = {
  onChangeFabricant : Function
  fabricant : string
}

const NewProductFabricant : FC<NewProductFabricant> = ({fabricant, onChangeFabricant}: NewProductFabricant) => {
  return (
    <View>
      <TextInput
        mode='outlined'
        label="Fabricant"
        value={fabricant}
        onChangeText={(text) => onChangeFabricant(text)}
        onBlur = {()=> onChangeFabricant(fabricant.toUpperCase())}
        autoComplete={false}
        activeOutlineColor="#54b3f2"
        outlineColor='#54b3f2'
        style={globalStyles.input}
      />
    </View>
  )
}

export default NewProductFabricant

const styles = StyleSheet.create({})