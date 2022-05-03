import { Alert } from "react-native"
import Realm from 'realm'
import CategorySchema from "./models/Category"
import ProductSchema from "./models/Product"

export const createButtonAlert = (titre: string, messageAlert:string, onPressFunction:any) : void => {
  Alert.alert(
    titre,
    messageAlert,
    [
      { 
        text: "OK", 
        onPress: () => {
          onPressFunction
        } }
    ]
  )
}

export const openRealm = async() =>{

  const realm = await Realm.open({
    path:"myrealm",
    schema: [ProductSchema, CategorySchema],
    deleteRealmIfMigrationNeeded: true,
  })
  
  return realm
} 
