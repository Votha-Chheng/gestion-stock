import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-paper';
import React, {FC, useState} from 'react'
import { StackNavigationState, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const HomeScreen : FC = () => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()

  return (
    <View style={styles.container}>
      <View>
        <Button 
          icon="arrow-down-bold" 
          color='green' 
          mode="contained" 
          onPress={() => navigation.navigate("EntrerProduits")}
          style={{marginVertical:20}}
        >
          Entrer produits
        </Button>
        <Button 
          icon="arrow-up-bold" 
          color='orange' 
          mode="contained" 
          onPress={() =>navigation.navigate("ConsommerProduits")}
          style={{marginVertical:20}}
        >
          Consommer produits
        </Button>
        <Button 
          icon="clipboard-list-outline" 
          color='red' 
          mode="contained" 
          onPress={() => navigation.navigate("ListeProduits")}
          style={{marginVertical:20}}
        >
          Afficher tous les produits
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