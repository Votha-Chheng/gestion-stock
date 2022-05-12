import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { Product } from '../models/Product'
import { Category } from '../models/Category'
import globalStyles from '../globalStyles'
import InventaireListRender from '../components/InventaireListRender'
import FilterProducts from '../components/FilterProducts'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, Portal, Provider } from 'react-native-paper'
import { hideModal, showModal } from '../store/modal'
import { RootState } from '../store/store'
import { fetchProductById } from '../actions/productActions'


type ListeProduitsScreenProps = {
  realm: Realm
  allProducts: Product[]
  allCategories: Category[]
}

const ListeProduitsScreen: FC<ListeProduitsScreenProps> = ({realm, allProducts, allCategories}: ListeProduitsScreenProps) => {

  const [displayProduct, setDisplayProduct] = useState<Product>(null)

  const {visible} = useSelector((state: RootState) => state.modalVisible)

  const dispatch = useDispatch()


  const onPressItem = (id: string)=>{
    setDisplayProduct(fetchProductById(realm, id))
    
    dispatch(showModal())  

  }

  return (
    <View style={styles.screenContainer}>
      <FilterProducts/>
      <View>
        {
          allProducts.length >0
          ?
          <FlatList
            data={allProducts}
            keyExtractor={(item: Product) => item._id.toString()}
            renderItem = {({item}) => (
              <InventaireListRender
                data={item}
                onPressFunction={onPressItem}
              />
            )}
          />
          :
          <Text>Aucun produit</Text>
        }
      </View>
      {
        displayProduct !== null 
        &&
        <Provider>
          <Portal>
            <Modal 
              visible={visible} 
              onDismiss={()=> dispatch(hideModal())} 
              contentContainerStyle={[styles.modalStyle, {justifyContent:"flex-start"}]}
            >
              <ScrollView>
                <Text style={globalStyles.screenTitle}>
                  Code barre n° {displayProduct._id}
                </Text>
                <Text>
                  {displayProduct.nom}
                </Text>
                <Text>
                  {displayProduct.categorie.nom}
                </Text>
                <Text>
                  {displayProduct.marque}
                </Text>  
                <View>
                  {
                    displayProduct.telFournisseur !==null && 
                    <Text>N° de téléphone du fournisseur : {displayProduct.telFournisseur}</Text>  
                  }
                  {
                    displayProduct.siteFournisseur !=="" && 
                    <Text>Site web du fournisseur : {displayProduct.siteFournisseur}</Text>
                  }
                  
                </View>
                {
                  !displayProduct.commandeEncours 
                  ?
                  <Button mode='contained'>
                    Commander produit
                  </Button>
                  : 
                  <Text style={{color: "orange"}}>
                    Produit en cours de commande
                  </Text>
                }
              </ScrollView>  
            </Modal>
          </Portal>
        </Provider>
      }
    </View>
  )
}

export default ListeProduitsScreen

const styles = StyleSheet.create({
  screenContainer: {
    height: "100%"
  },
  modalStyle : {
    backgroundColor: 'white', 
    paddingVertical: 10,
    fontWeight: '900',
    minHeight: "75%"
  }
})