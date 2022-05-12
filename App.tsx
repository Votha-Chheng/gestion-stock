import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store/store';
import * as SplashScreen from 'expo-splash-screen';
import Toast, { BaseToast } from 'react-native-toast-message';
import { Inter_900Black, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import {Roboto_400Regular, Roboto_900Black} from '@expo-google-fonts/roboto';
import {
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
  Rubik_700Bold,
  Rubik_800ExtraBold,
  Rubik_900Black,
  Rubik_300Light_Italic,
  Rubik_400Regular_Italic,
  Rubik_500Medium_Italic,
  Rubik_600SemiBold_Italic,
  Rubik_700Bold_Italic,
  Rubik_800ExtraBold_Italic,
  Rubik_900Black_Italic,} from '@expo-google-fonts/rubik';
import {useFonts} from 'expo-font';
import NavigationScreen from './screens/NavigationScreen';



export type RootStackParams = {
  Home
  EntrerProduits
  ConsommerProduits
  ListeProduits
}

const RootStack = createNativeStackNavigator<RootStackParams>();

const App = () => {

  let fontsLoading = useFonts({
    Inter_900Black,
    Inter_500Medium,
    Roboto_400Regular,
    Inter_600SemiBold,
    Roboto_900Black,
    Rubik_300Light,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
    Rubik_700Bold,
    Rubik_800ExtraBold,
    Rubik_900Black,
    Rubik_300Light_Italic,
    Rubik_400Regular_Italic,
    Rubik_500Medium_Italic,
    Rubik_600SemiBold_Italic,
    Rubik_700Bold_Italic,
    Rubik_800ExtraBold_Italic,
    Rubik_900Black_Italic,
  })

  const displaySplash = async()=>{
    if (!fontsLoading) {
      try{
        await SplashScreen.preventAutoHideAsync()
      }
      catch(err){
        console.log(err.message)
        return err.message
        
      }
    } else {
      try{
        await SplashScreen.hideAsync()

      }
      catch(err){
        console.log(err.message)
        return err.message;

      }
    }
  }

  useEffect(()=>{
    displaySplash()
    
  }, [fontsLoading])


  const toastConfig = {
    success: (props: any) =>(
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'green' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 17.5,
          color:"green"
        }}
        text2Style={{
          fontSize: 15,
          color:"green"
        }}
      />
    ),
    info: (props:any) =>(
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#1D9BF0' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 17.5,
          color:"#1D9BF0"
        }}
        text2Style={{
          fontSize: 15,
          color:"#1D9BF0"
        }}
      />
    ),
    error: (props:any) =>(
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'red' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          color:"red"
        }}
        text2Style={{
          fontSize: 13,
          color:"black"
        }}
      />
    )
  }

  return (
    <Provider store={store}>
      <NavigationScreen/>
      <Toast config={toastConfig}/>
    </Provider>
    
  );
}

export default App

const styles = StyleSheet.create({

});
