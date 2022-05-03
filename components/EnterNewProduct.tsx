import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import CategorySchema, { Category } from '../models/Category'
import Toast from 'react-native-toast-message';
import { getErrorToTrueOrFalse, getMessageError } from '../store/errorMessage'
import ProductSchema, { Product } from '../models/Product'
import { createButtonAlert } from '../utils'
import Loader from './Loader'
import NewProductFabricant from './NewProductFabricant'
import globalStyles from '../globalStyles'
import NewProductName from './NewProductName'
import CategoryPicker from './CategoryPicker'
import Realm from 'realm'


type NewProductProps = {
  type: string
  data: string
}

const EnterNewProduct:FC<NewProductProps> = ({data, type}: NewProductProps) => {

  const [fabricant, setFabricant] = useState<string>("")
  const [chooseCategory, setChooseCategory] = useState<Category>({_id: null, nom: ""})
  const [quantity, setQuantity] = useState<string>("1")
  const [newCategory, setNewCategory] = useState<string>("")
  const [createCatMode, setCreateCatMode] = useState<boolean>(false)
  const [nom, setNom] = useState<string>("")
  const [focused, setFocused] = useState<boolean>(false)
  const [stockLimite, setStockLimite] = useState<string>("1")
  const [telFournisseur, setTelFournisseur] = useState<string>("")
  const [displayTel, setDisplayTel] = useState<string>("")
  const [webSite, setWebSite] = useState<string>("")
  const [loadingCreation, setLoadingCreation] = useState<boolean>(false)
  const [realm, setRealm] = useState<any>(null)

  const {visible} = useSelector((state: RootState) => state.modalVisible)
  const {scanned} = useSelector((state: RootState) => state.scanning)
  const {error, message} = useSelector((state: RootState) => state.errorMessage)

  const dispatch = useDispatch()


  useEffect(()=>{
    if(error){
      createButtonAlert("Une erreur est survenue !", message, onPressAlert)
    }
  }, [error])

  useEffect(()=>{
    Realm.open({
      path:"myrealm",
      schema: [ProductSchema, CategorySchema],
      deleteRealmIfMigrationNeeded: true,
    })
    .then(realm => {
      setRealm(realm)

    })

    return(()=>{
      if (realm !== null && !realm.isClosed) {
        realm.close();
      }
    })
    
  }, [])

  const showToast = (type: string, message1: string, message2: string)=>{
    Toast.show({
      type,
      text1: message1,
      text2:  message2
    });
  }

  const onPressAlert = ()=>{
    dispatch(getErrorToTrueOrFalse(false))
    dispatch(getMessageError(""))
  }
  
  const createProduct = async ()=>{
    try {
      let newProduct: Product

      setLoadingCreation(true)

      realm.write(()=>{
        newProduct = realm.create("Product", {
          _id: data,
          codeBarType: type.toString(),
          nom: nom,
          marque: fabricant,
          categorie: realm.objectForPrimaryKey("Category", chooseCategory._id),
          telFournisseur: +telFournisseur,
          siteFournisseur : webSite,
          qty:+quantity,
          stockLimite:+stockLimite
        })
      })

      showToast("success","Succès", `${newProduct.nom} a été ajouté dans l'inventaire.`)

    } catch (error) {
      console.log(error.message)
      showToast("error", "Erreur", "Un problème est survenu. Recommencez l'opération.")
      dispatch(getMessageError("Impossible de trouver la catégorie."))

      return
    }
  }


  const getSingleCategory = async (catName=null, id=null): Promise<void> => {
    let singleCategory = null
    let category = null

    try {
      realm.write(()=>{

        const tempCategories = realm.objects("Category")

        if(tempCategories === null){
          return {errorMsg: "Nothing to find."}
        }

        if(catName !== null){
          singleCategory = tempCategories.filtered(`nom = "${catName}"`)

        } else if( id!==null) {
          singleCategory = tempCategories.filtered(`_id = ${id}`)

        }

        setChooseCategory({_id: singleCategory[0]._id, nom: singleCategory[0].nom})
        console.log(chooseCategory._id)
      })
    
    } catch (err){
      console.log(err.message)

      showToast("error", "Erreur", err.message)
    } 
  }  

  const createNewCategory = async()=>{
    try {
      realm.write(()=>{
        const categories = realm.objects("Category")
        const categoryExist = categories.filtered(`nom = "${newCategory}"`)

        console.log("categoryExist " + categoryExist)

        if(categoryExist.length>0){
          showToast("error", "Impossible d'ajouter", "Cette catégorie existe déjà.")

        } else {
            realm.create("Category", {
            _id: Date.now(),
            nom : newCategory
          })
          
          showToast("success", "Parfait !", "Nouvelle catégorie créee.")
        }
      
      })

      setCreateCatMode(false)

    } catch (err) {
      showToast("error", "Impossible d'ajouter", "Une erreur est survenue.")
      console.log(err.message)
      return

    }
  }

  const deleteAllCategories = async()=>{
    const realm = await Realm.open({
      path:"myrealm",
      schema: [CategorySchema],
      deleteRealmIfMigrationNeeded: true,
    })

    realm.write(()=>{
      realm.deleteAll()
    })


    console.log("Toutes les catégories ont été supprimées.")
  }

  const spaceTelFournisseur = (tel: string): string => {
    let arrTel: string[] = []
    let num : string

    if(tel){
      for(let i = 0; i<=tel.length; i++){
        num = tel.charAt(i)
        if(i%2===0 && tel.length>1 && i>0){
          arrTel = [...arrTel, " ", num]

        } else {
          arrTel = [...arrTel, num]

        }
      }
    }
    
    return arrTel.join("")
  }

  const unspaceTel = (telWithSpace: string): string =>{
    const newTel = telWithSpace.split(" ")

    return newTel.join()
  }

  const onValuePickerChange = (item: string) : void=>{
    if(item !== "Nouvelle catégorie"){
      getSingleCategory(item, null)

    } else {
      setCreateCatMode(true)
      
    }
  }

  if(loadingCreation){
    return(
      <Loader color="blue" />

    )
  }

  return (
    <ScrollView>
      <Text style={styles.title}>Nouveau produit</Text>
      <Text style={{textAlign:"center"}}>Renseignez les informations suivantes :</Text>
      
      <SafeAreaView style={styles.bodyModal}>
        <View style={{marginBottom:10}}>
          <Text>Code-barre de type 
            <Text style={styles.type}> {type}</Text> 
            <Text> & n° </Text>
            <Text style={styles.type}>{data}</Text>
          </Text>
        </View>
        <NewProductFabricant fabricant={fabricant} onChangeFabricant ={setFabricant}/>
        
        {
          <Text>
            {chooseCategory && chooseCategory._id}
          </Text>
        }

        <NewProductName nom={nom} onChangeName={setNom} />

        {/* <Button onPress={deleteAllCategories} mode='contained'>
          Supprimer toutes les catégories
        </Button> */}

        {/* <Button onPress={showToast} mode='contained'>
          Toast
        </Button> */}

        <CategoryPicker
          focused={focused}
          chooseCategory={chooseCategory}
          onValuePickerChange = {onValuePickerChange}
          onFocus={()=>setFocused(true)}
          onBlur={()=>setFocused(false)}
          newCategory={newCategory}
          onChangeCategory={setNewCategory}
          createNewCategory = {createNewCategory}
          createCatMode={createCatMode}
          createCatModeToFalse={()=>setCreateCatMode(false)}
          realm = {realm}
        />
        
        <TextInput
          mode='outlined'
          label="Quantité à rentrer"
          value={quantity}
          activeOutlineColor="#337171"
          outlineColor='#c4cfd4'
          onChangeText={text => setQuantity(text)}
          onFocus={()=>setQuantity("")}
          onBlur={()=>setQuantity(prev => prev !== "" ? quantity : "1")}
          autoComplete={false}
          keyboardType="numeric"
          style={styles.inpuQty}
        />
        <TextInput
          mode='outlined'
          label="Stock limite"
          value={stockLimite}
          activeOutlineColor="#a25553"
          outlineColor='#c4cfd4'
          onChangeText={text => setStockLimite(text)}
          onFocus={()=>setStockLimite("")}
          autoComplete={false}
          keyboardType="numeric"
          style={styles.inpuQty}
        />

        <View style={{borderColor: "#c4cfd4", borderWidth:2, padding:2.5, marginBottom:10}}>
          <Text style={{color:"#6e6e72", fontSize:15, marginVertical:5, marginLeft:10}}>Contact fournisseur (optionnel)</Text>
          <TextInput
            mode='outlined'
            label="N° de téléphone"
            value={displayTel}
            activeOutlineColor="#a25553"
            outlineColor='#c4cfd4'
            onChangeText={text => {
              setTelFournisseur(text)
            }}
            onFocus={()=>setDisplayTel(unspaceTel(telFournisseur))}
            onBlur={()=>setDisplayTel(spaceTelFournisseur(telFournisseur))}
            autoComplete={false}
            keyboardType="numeric"
            style={globalStyles.input}
            maxLength={14}
          />
          <TextInput
            mode='outlined'
            label="Site web"
            value={webSite}
            onChangeText={text => setWebSite(text)}
            onBlur = {()=> setWebSite(webSite.toLowerCase())}
            autoComplete={false}
            activeOutlineColor="#54b3f2"
            outlineColor='#54b3f2'
            style={globalStyles.input}
            left={<TextInput.Affix text="https://" />}
            autoCapitalize="none"
          />
        </View>
        <Text>{telFournisseur}</Text>
        <Button
          mode='contained'
          icon='check-bold'
          onPress={() => createProduct()}
        >
          Valider les informations
        </Button>
      </SafeAreaView>
    </ScrollView>
  )
}

export default EnterNewProduct

const styles = StyleSheet.create({
  title : {
    fontSize : 20,
    textAlign : 'center',
    fontFamily : "Roboto_900Black",
    textTransform:'uppercase',
    marginBottom:10
  },
  bodyModal : {
    padding:10
  },
  inpuQty : {
    marginBottom:10,
    fontSize:15, 
    padding:0,
    width:175,
    textAlign: "center"
  },
  type : {
    fontFamily: "Roboto_900Black"
  },
  categoryTags: {
    marginHorizontal: 5,
    paddingVertical:2.5,
    paddingHorizontal:5,
    borderRadius:5
  }
})