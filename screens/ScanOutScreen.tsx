import { StyleSheet, Text, View } from 'react-native'
import { Modal, Portal, Provider } from 'react-native-paper'
import React, { FC, useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { hideModal, showModal } from '../store/modal'
import { getCameraPermission } from '../store/cameraPermission'
import Loader from '../components/Loader'
import LaunchCam from '../components/LaunchCam'

const ScanInScreen:FC = () => {
  
  const [data, setData] = useState<string>("")
  const [type, setType] = useState<string>("")
  const [scanned, setScanned] = useState<boolean>(false);

  const {visible} = useSelector((state: RootState) => state.modalVisible)
  const {cameraStatus, loading, success} = useSelector((state: RootState) => state.cameraPermission)

  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(getCameraPermission())
  }, [cameraStatus])

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

  if(loading){
    return (
      <Loader color='orange'/>
    ) 
  } else {
    if (cameraStatus === null) {
      return (
        <LaunchCam/>
      )  
    } else if(cameraStatus === "granted"){
      return (
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <Provider>
            <Portal>
              <Modal visible={visible} onDismiss={modalIsFalse} contentContainerStyle={styles.modalStyle}>
                <Text>{`Bar code with type ${type} and data ${data} has been scanned!`}</Text>
              </Modal>
            </Portal>
          </Provider>
        </View>
      )

    } else if(cameraStatus === "denied" || success === false){
      return <Text>Un problème est survenu avec la caméra. Veuillez redémarrez l'application.</Text>

    }
  }
}

export default ScanInScreen

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'orange',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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



