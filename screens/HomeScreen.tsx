import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper';
import React, {FC} from 'react'

const HomeScreen : FC = () => {
  return (
    <View style={styles.container}>
      <View>
        <Button 
          icon="arrow-down-bold" 
          color='green' 
          mode="contained" 
          onPress={() => console.log('Pressed')}
          style={{marginVertical:20}}
        >
          Entrer produits
        </Button>
        <Button 
          icon="arrow-up-bold" 
          color='orange' 
          mode="contained" 
          onPress={() => console.log('Pressed')}
          style={{marginVertical:20}}
        >
          Consommer produits
        </Button>
        <Button 
          icon="flask-empty-minus-outline" 
          color='red' 
          mode="contained" 
          onPress={() => console.log('Pressed')}
          style={{marginVertical:20}}
        >
          Produits à racheter
        </Button>
      </View>
      
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container : {
    flex:1,
    justifyContent:"center",
    alignItems: "center"
  }
})