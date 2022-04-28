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
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from './store/store';
import * as SplashScreen from 'expo-splash-screen';
import { Inter_900Black } from '@expo-google-fonts/inter';
import {Roboto_400Regular, Roboto_900Black} from '@expo-google-fonts/roboto';
import {useFonts} from 'expo-font';

export type RootStackParams = {
  Home
  EntrerProduits
  ConsommerProduits
  ListeProduits
}

const RootStack = createNativeStackNavigator<RootStackParams>();
const RootTab = createBottomTabNavigator();

const App = () => {

  let fontsLoading = useFonts({
    Inter_900Black,
    Roboto_400Regular,
    Roboto_900Black

  })

  const displaySplash = async()=>{
    if (!fontsLoading) {
      try{
        await SplashScreen.preventAutoHideAsync()
      }
      catch(err){
        console.log(err)
        throw err;
        
      }

    } else {
      try{
        await SplashScreen.hideAsync()

      }
      catch(err){
        console.log(err)
        throw err;

      }
    }
  }

  useEffect(()=>{
    displaySplash()
  }, [fontsLoading])

  return (
    <Provider store={store}>
      <NavigationContainer>
        <View>
          <StatusBar style="dark" />
        </View>
        <RootTab.Navigator
          initialRouteName='Entrer Produits'
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
