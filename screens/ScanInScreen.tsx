import { StyleSheet, Text, View } from 'react-native'
import { Button, Modal, Portal, Provider } from 'react-native-paper'
import React, { FC, useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { hideModal, showModal } from '../store/modal'
import { getCameraPermission } from '../store/cameraPermission'
import Loader from '../components/Loader'
import LaunchCam from '../components/LaunchCam'
import EnterNewProduct from '../components/EnterNewProduct'
import { scan, unscan } from '../store/scanning'
import { getData, getType, resetCodeBarData } from '../store/dataBarCode'
import Toast, { BaseToast } from 'react-native-toast-message';

const ScanInScreen:FC = () => {

  const {visible} = useSelector((state: RootState) => state.modalVisible)
  const {cameraStatus, loading, errorCam} = useSelector((state: RootState) => state.cameraPermission)
  const {scanned} = useSelector((state: RootState) => state.scanning)
  const {data, type} = useSelector((state: RootState) => state.codeBarDataType)
  const {} = useSelector((state: RootState) => state.categoryState)


  const dispatch = useDispatch()


  useEffect(()=>{
    cameraStatus !=="granted"
    ? dispatch(getCameraPermission())
    : null
  }, [cameraStatus])

  useEffect(()=>{
    dispatch(resetCodeBarData())
    dispatch(hideModal())
    dispatch(unscan())
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    dispatch(scan())
    dispatch(getData(data))
    dispatch(getType(type))
    dispatch(showModal())
  }

  const toastConfig = {
    success: (props) =>(
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'green' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          color:"green"
        }}
        text2Style={{
          fontSize: 12.5,
          color:"green"
        }}
      />
    )
  }

  if(loading){
    return (
      <Loader color='green'/>
    ) 

  } else if (cameraStatus === null){   
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
            <Modal visible={visible} dismissable={false} contentContainerStyle={styles.modalStyle}>
              <EnterNewProduct type={type} data={data} />
              <Toast config={toastConfig}/>
            </Modal>
          </Portal>
        </Provider>
      </View>
    )

  } else if(cameraStatus === "denied" || errorCam){
    return (
      <View>
        <Text style={{fontFamily:"Inter_900Black"}}>
          {"Un problème est survenu. Assurez-vous d'avoir donné la permission pour accéder à la caméra. Si le problème persiste, redémarrez l'application."}
        </Text>
        <Button onPress={()=>dispatch(getCameraPermission())}>
          Relancer la caméra
        </Button>
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
  subContainer: {
    flex:1,
    alignSelf:"flex-end",
    width:"100%",
    height:100,
    backgroundColor: "#fff",
  },
  modalStyle : {
    backgroundColor: 'white', 
    paddingVertical: 10,
    fontWeight: '900'
    //height: 200,
  }
})