import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ScanInScreen from './ScanInScreen'
import ScanOutScreen from './ScanOutScreen'
import { IconButton } from 'react-native-paper'
import ListeProduitsScreen from './ListeProduitsScreen'
import ProduitsARacheter from './ProduitsARacheter'
import ProductSchema, { Product } from '../models/Product'
import CategorySchema, { Category } from '../models/Category'
import { showToast } from '../utils'
import { fetchAllProducts, fetchProductsAlert } from '../actions/productActions'
import { fetchAllCategories } from '../actions/categoryActions'



const NavigationScreen = () => {
  const [realm, setRealm] = useState<Realm>(null)
  const [allproducts, setAllProducts] = useState<Product[]>([])
  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [badge, setBadge] = useState<number>(null)

  const RootTab = createBottomTabNavigator()


  useEffect(()=>{
    try {
      Realm.open({
        path:"myrealm",
        schema: [ProductSchema, CategorySchema],
        deleteRealmIfMigrationNeeded: true,
      })
      .then(realm => {
        setRealm(realm)
        setAllProducts(fetchAllProducts(realm)) 
        setAllCategories(fetchAllCategories(realm))
        setBadge(fetchProductsAlert(realm))
  
        const productsList = realm.objects("Product")
  
        try {    
          productsList.addListener(()=>{
            setAllProducts(fetchAllProducts(realm))
            setBadge(fetchProductsAlert(realm))
  
          })
          
        } catch (err) {
          showToast("error", "Erreur : Mise à jour de l'inventaire", "L'inventaire n'a pas été mis à jour. Recommencez.")
          console.log(err.message)
          return err.message
        }
  
        return ()=>{
          productsList.removeAllListeners()
          
        }
      })

    } catch (err) {
      showToast("error", "Erreur : Base de données", "Impossible d'accéder à l'inventaire. Quittez et relancer l'application.")
      return err.message

    }
    

    return()=>{
      if(realm !== null && !realm.isClosed){
        realm.close()

      }
    }
  }, [])


  return (
    <NavigationContainer>
      <View>
        <StatusBar style="dark" />
      </View>
      <RootTab.Navigator
        initialRouteName='Rentrer'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string

            if (route.name === 'Rentrer') {
              if( focused){
                iconName = 'arrow-down-bold'
                color = "green"
                size = 30
              } else {
                iconName = 'arrow-down-bold-outline'
                color = "grey"
                size = 20
              }
                
            } else if (route.name === 'Consommer') {
              if(focused){
                iconName = 'arrow-up-bold'
                color = "orange"
                size = 30
              } else {
                iconName = 'arrow-up-bold-outline'
                color = "grey"
                size = 20
              }

            } else if (route.name === 'Inventaire') {
              iconName = 'clipboard-list-outline'

              if(focused){
                color = "purple"
                size = 25
              } else {
                color = "grey"
                size = 20
              }
            } else if (route.name === 'A racheter') {
              iconName = "flask-empty-minus-outline"

              if(focused){
                color = "red"
                size = 25
              } else {
                color = "grey"
                size = 20
              }
            }

            // You can return any component that you like here!
            return <IconButton icon={iconName} color={color} size={size} animated={true}/>;
          },
          tabBarActiveTintColor : (route.name === "Rentrer" ? "green" : route.name === "Consommer" ? "orange" : route.name === "Inventaire" ? "purple" : "red"),
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle : {
            paddingBottom : 7.5,
            marginTop:-5,
            fontSize : 12,
            fontWeight: "bold",
            width:75
          }
        })}
      >
        <RootTab.Screen 
          name="Rentrer" 
          children={()=> <ScanInScreen realm={realm} allProducts={allproducts} allCategories={allCategories} /> }
          options={{title:"Rentrer", unmountOnBlur:true}}
        />
        <RootTab.Screen 
          name="Consommer" 
          children={()=> <ScanOutScreen realm={realm} allProducts={allproducts} /> }
          options={{title:"Consommer", unmountOnBlur:true}}
        />
        <RootTab.Screen 
          name="Inventaire"
          children={()=> <ListeProduitsScreen realm={realm} allProducts={allproducts}  allCategories={allCategories}/> }
          options={ badge>0 && { tabBarBadge: badge }}
        />
        <RootTab.Screen 
          name="A racheter" 
          children={()=> <ProduitsARacheter realm={realm} allProducts={allproducts} /> }
        />
      </RootTab.Navigator>
    </NavigationContainer>
  )
}

export default NavigationScreen

const styles = StyleSheet.create({})