//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper';
import ListeProduitsScreen from './screens/ListeProduitsScreen';
import ProduitsARacheter from './screens/ProduitsARacheter';
import ScanInScreen from './screens/ScanInScreen';
import ScanOutScreen from './screens/ScanOutScreen';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import store from './store/store';

export type RootStackParams = {
  Home
  EntrerProduits
  ConsommerProduits
  ListeProduits
}

const RootStack = createNativeStackNavigator<RootStackParams>();
const RootTab = createBottomTabNavigator();

const App = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <View>
          <StatusBar style="dark" />
        </View>
        {/* <RootStack.Navigator initialRouteName='Home'>
          <RootStack.Screen component={HomeScreen} name="Home"/>
          <RootStack.Screen component={ScanInScreen} name="EntrerProduits"/>
          <RootStack.Screen component={ScanOutScreen} name="ConsommerProduits"/>
          <RootStack.Screen component={ListeProduitsScreen} name="ListeProduits"/>
        </RootStack.Navigator> */}
        <RootTab.Navigator
          initialRouteName='EntrerProduits'
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Entrer Produits') {
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

              } else if (route.name === 'Gérer Produits') {
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
            tabBarActiveTintColor : (route.name === "Entrer Produits" ? "green" : route.name === "Consommer" ? "orange" : route.name === "Gérer Produits" ? "purple" : "red"),
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle : {
              paddingBottom : 7.5,
              marginTop:-5,
              fontSize : 12,
              fontWeight: "bold",
            }
          })}
        >
          <RootTab.Screen component={ScanInScreen} name="Entrer Produits" options={{title:"Entrer Produits", unmountOnBlur:true}}/>
          <RootTab.Screen component={ScanOutScreen} name="Consommer" options={{title:"Consommer", unmountOnBlur:true}}/>
          <RootTab.Screen component={ListeProduitsScreen} name="Gérer Produits"/>
          <RootTab.Screen component={ProduitsARacheter} name="A racheter" options={{ tabBarBadge: 3 }}/>
        </RootTab.Navigator>
      </NavigationContainer>
    </Provider>
    
  );
}

export default App

const styles = StyleSheet.create({

});
