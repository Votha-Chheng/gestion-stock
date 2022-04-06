import { Button, StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'

const ScanScreen:FC = (navigation) => {
  const [hasPermission, setHasPermission] = useState<string>(null);
  const [scanned, setScanned] = useState<boolean>(false);

  const getCameraPermission = async ()=>{
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status)
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned! ${hasPermission}`);
  };

  if (hasPermission === null) {
    return <Button title={'Lancer la caméra'} onPress={getCameraPermission}/>
  }

  return (
    <View>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={{flex:1, height:"50%", width:"100%", backgroundColor:"white",marginTop:"50%"}}>
        <Text>Application de gestion de stock</Text>
      </View>
      
      
      {scanned && 
        <View style={{height:"50%", width:"100%", backgroundColor:"white"}}>
          <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
        </View>
      }
    </View>
  )
}

export default ScanScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})