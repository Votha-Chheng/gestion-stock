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
import { Product } from '../models/Product'
import EnterProduct from '../components/EnterProduct'
import { newQtyToNumber, showToast } from '../utils'
import { Category } from '../models/Category'

type ScanInScreenProps = {
  realm: Realm
  allProducts: Product[]
  allCategories: Category[]
}

const ScanInScreen:FC<ScanInScreenProps> = ({realm, allProducts, allCategories}: ScanInScreenProps) => {

  const [productExists, setProductExists] = useState<boolean>(false)
  const [productAsProp, setProductAsProp] = useState<Product>(null)
  const [newQty, setNewQty] = useState<string>("1")

  const {visible} = useSelector((state: RootState) => state.modalVisible)
  const {cameraStatus, loading, errorCam} = useSelector((state: RootState) => state.cameraPermission)
  const {scanned} = useSelector((state: RootState) => state.scanning)
  const {data, type} = useSelector((state: RootState) => state.codeBarDataType)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getCameraPermission())

    return()=>{
      dispatch(resetCodeBarData())
      dispatch(hideModal())
      dispatch(unscan())

    }
  }, [])


  const productExistOrNot = (data: number)=>{
    if(allProducts){
      const product: Product[] = allProducts.filter(prod => prod._id === data)
      console.log("Product is " + product[0])

      if(product.length === 0){
        setProductExists(false)

      } else {
      console.log("From ScanInScreen : " + product)
      setProductExists(true)
      setProductAsProp(product[0])

      }
    }
  }

  const handleBarCodeScanned = ({ type, data }) => {
    dispatch(scan())
    dispatch(getData(data))
    dispatch(getType(type))
    dispatch(showModal())
    productExistOrNot(data)
  }

  const validateNewStock = ()=>{
    dispatch(hideModal())
    
    const product:any = realm.objectForPrimaryKey("Product", data.toString())
    
    realm.write(()=>{
      product.qty += newQtyToNumber(newQty)
      setProductAsProp(product)
    })

    const productUpdated:any = realm.objectForPrimaryKey("Product", data.toString())

    showToast("success", "Stock mis à jour", `Stock actuel de ${productUpdated.nom} : ${productUpdated.qty} unités.`)
    
    setTimeout(()=>{
      dispatch(unscan())
    }, 1500)
    
    dispatch(resetCodeBarData())
    setNewQty("1")

  }

  const cancelNewStock = ()=>{
    dispatch(hideModal())
    setTimeout(()=>{
      dispatch(unscan())
    }, 3000)
    dispatch(resetCodeBarData())
    setNewQty("1")
    showToast("info", "Stock inchangé", "Mise à jour du stock annulée.")
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
              {
                productExists 
                ?
                <EnterProduct data={data} product={productAsProp} newQty={newQty} setNewQty={setNewQty} validateNewStock={validateNewStock} cancelNewStock={cancelNewStock} />
                :
                <EnterNewProduct type={type} data={data} realm={realm} allCategories={allCategories} />
              }
              
            </Modal>
          </Portal>
        </Provider>
      </View>
    )

  } else if(cameraStatus === "denied" || errorCam){
    return (
      <View>
        <Text style={{fontFamily:"Inter_900Black"}}>
          Un problème est survenu. Assurez-vous d'avoir donné la permission pour accéder à la caméra. Si le problème persiste, redémarrez l'application.
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