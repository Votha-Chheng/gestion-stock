//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, IconButton } from 'react-native-paper';
import ListeProduits from './screens/ListeProduits';
import ProduitsARacheter from './screens/ProduitsARacheter';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen component={HomeScreen} name="Home"/>
        <Stack.Screen component={ScanScreen} name="Scanner"/>
      </Stack.Navigator> */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Accueil') {
              iconName = focused
                ? 'swap-vertical-bold'
                : 'arrow-up-bold';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <IconButton icon={iconName}/>;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen component={HomeScreen} name="Accueil"/>
        <Tab.Screen component={ListeProduits} name="Liste produits"/>
        <Tab.Screen component={ProduitsARacheter} name="Produits à racheter"/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
