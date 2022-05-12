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
import ConsumeProduct from '../components/ConsumeProduct'
import ProductSchema, { Product } from '../models/Product'
import CategorySchema from '../models/Category'
import { newQtyToNumber, showToast } from '../utils'
import Toast, { BaseToast } from 'react-native-toast-message';
import { scan, unscan } from '../store/scanning'
import { getData, getType, resetCodeBarData } from '../store/dataBarCode'

type ScanOutScreenProps = {
  realm: Realm
  allProducts: Product[]
}
const ScanOutScreen:FC<ScanOutScreenProps> = ({realm, allProducts}: ScanOutScreenProps) => {

  const [productExists, setProductExists] = useState<boolean>(false)
  const [productAsProp, setProductAsProp] = useState<any>(null)
  const [qtyOut, setQtyOut] = useState<string>("1")

  const {data, type} = useSelector((state: RootState) => state.codeBarDataType)
  const {scanned} = useSelector((state: RootState) => state.scanning)
  const {visible} = useSelector((state: RootState) => state.modalVisible)
  const {cameraStatus, loading, errorCam} = useSelector((state: RootState) => state.cameraPermission)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getCameraPermission())

  }, [])

  useEffect(()=>{
    return ()=>{
      dispatch(resetCodeBarData())
      dispatch(hideModal())
      dispatch(unscan())
    }
  }, [])


  const productExistOrNot = (data: number)=>{
    const product = realm.objectForPrimaryKey("Product", data)

    if(product === undefined || product === null){
      console.log("Product is undefined.")
      setProductExists(false)

    } else {
      console.log("From ScanInScreen : " + product)
      setProductExists(true)
      setProductAsProp(product)
    }
      
  }

  const validateQtyOut = (): void=>{
    const product:any = realm.objectForPrimaryKey("Product", data)

    if(product.qty - newQtyToNumber(qtyOut) < 0) {
      showToast("error", `Quantité à retirer trop grande : ${qtyOut} !`, `Le stock actuel est de ${product.qty} unités.`)
    
    } else {
      realm.write(()=>{
        product.qty -= newQtyToNumber(qtyOut)
        setProductAsProp(product)

      })

      const productUpdated:any = realm.objectForPrimaryKey("Product", data)

      dispatch(hideModal())
      showToast("success", "Stock mis à jour", `Stock de ${productUpdated.nom} descendu à ${productUpdated.qty} unités.`)
          
      setTimeout(()=>{
        dispatch(unscan())
      }, 1500)

      dispatch(resetCodeBarData())
      setQtyOut("1")
    } 
  }

  const cancelQtyOut = ()=>{
    dispatch(hideModal())
    setTimeout(()=>{
      dispatch(unscan())
    }, 3000)
    dispatch(resetCodeBarData())
    setQtyOut("1")
    showToast("info", "Stock inchangé", "Mise à jour du stock annulée.")
  }

  const handleBarCodeScanned = ({ type, data }) => {
    dispatch(scan())
    dispatch(getData(data))
    dispatch(getType(type))
    dispatch(showModal())
    productExistOrNot(data)
  }

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
              {
                productExists
                &&
                <Modal visible={visible} dismissable={false} contentContainerStyle={styles.modalStyle}>  
                  <ConsumeProduct product={productAsProp} qtyOut={qtyOut} setQtyOut={setQtyOut} validateQtyOut={validateQtyOut} cancelQtyOut={cancelQtyOut} data={data} />
                </Modal>
              }
            </Portal>
          </Provider>
        </View>
      )

    } else if(cameraStatus === "denied" || errorCam){
      return <Text>Un problème est survenu avec la caméra. Veuillez redémarrez l'application.</Text>

    }
  }
}

export default ScanOutScreen

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
  }
})



