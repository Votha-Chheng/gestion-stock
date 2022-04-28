import { Alert } from "react-native"

export const asyncWrapper = (func: Function, errorMsg: string) =>{

  return async() => {
    try {
      await func()

    } catch (err) {
      return errorMsg
      
    }
  }
}

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
