import { StyleSheet, Text, View } from 'react-native'
import { Button, Modal, Portal, Provider } from 'react-native-paper'
import React, { FC, useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import BarcodeScan from '../components/BarcodeScan'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { hideModal, showModal } from '../store/modal'

const ScanInScreen:FC = () => {
  const [hasPermission, setHasPermission] = useState<string>(null);
  const [data, setData] = useState<string>("")
  const [type, setType] = useState<string>("")
  const [scanned, setScanned] = useState<boolean>(false);

  const modalVisibility = useSelector((state: RootState) => state.modalVisible.visible)
  const dispatch = useDispatch()

  const getCameraPermission = async ()=>{
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status)
  }

  const modalIstrue = ()=>{
    dispatch(showModal())
  }

  const modalIsFalse = ()=>{
    dispatch(hideModal())
    setScanned(false)
    setData("")
    setType("")
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setData(data)
    setType(type)
    setScanned(true)
    modalIstrue()
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

  else if(hasPermission === "granted"){
    return (
      <View style={styles.container}>
        <BarcodeScan handleBarCodeScanned={handleBarCodeScanned} scanned={scanned} />
        <Provider>
          <Portal>
            <Modal visible={modalVisibility} onDismiss={modalIsFalse} contentContainerStyle={styles.modalStyle}>
              <Text>{`Bar code with type ${type} and data ${data} has been scanned!`}</Text>
            </Modal>
          </Portal>
        </Provider>
      </View>
    )
  }
}

export default ScanInScreen

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#11e48f',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  launchCamera : {
    flex: 1,
    justifyContent : 'center',
    backgroundColor: '#11e48f',
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