import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  loader : {
    flex: 1,
    justifyContent : "center",
    alignItems: "center",
    width:"100%",
    height: "100%"
  }, 
  input : {
    marginBottom:10,
    fontSize:15, 
    padding:0,
    width: '100%'
  },

  screenTitle: {
    fontSize: 25,
    textAlign:"center",
    fontFamily:"Roboto_900Black"
  }
})

export default globalStyles