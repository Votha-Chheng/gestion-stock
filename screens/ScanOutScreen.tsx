import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button, Modal, Portal, Provider } from 'react-native-paper';
import BarcodeScan from '../components/BarcodeScan';

const ScanOutScreen = () => {
  const [hasPermission, setHasPermission] = useState<string>(null);
  const [data, setData] = useState<string>("")
  const [type, setType] = useState<string>("")
  const [visible, setVisible] = useState<boolean>(false)
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(()=>{
    if(!visible){
      setScanned(false)
    }
  }, [visible])

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const getCameraPermission = async ()=>{
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status)
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setData(data)
    setType(type)
    setScanned(true)
    showModal()
  };
  
  if (hasPermission === null) {
    return (
      <View style={[styles.launchCamera]}>
        <Button icon="barcode-scan" mode="contained" color='whitesmoke' onPress={getCameraPermission}>
          Lancer le scanner
        </Button>
      </View>
      
    )  
  }
  if(hasPermission === "granted"){
    return (
      <View style={styles.container}>
        <BarcodeScan handleBarCodeScanned={handleBarCodeScanned} scanned={scanned} />
        
        <Provider>
          <Portal>
            <Modal visible={visible} onDismiss={()=>setScanned(false)} contentContainerStyle={styles.modalStyle}>
              <Text>{`Bar code with type ${type} and data ${data} has been scanned!`}</Text>
            </Modal>
          </Portal>
        </Provider>
      </View>
    )
  }
}

export default ScanOutScreen


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#ff9a5c',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  launchCamera : {
    flex: 1,
    justifyContent : 'center',
    backgroundColor: '#ff9a5c',
    alignItems : 'center',
    width:"100%",
    height : "100%"
  },
  subContainer: {
    flex:1,
    alignSelf:"flex-end",
    width:"100%",
    height:100,
    backgroundColor: "#fff",
  },
  modalStyle : {
    backgroundColor: 'white', 
    padding: 20,
    height: 200,
  }
})



