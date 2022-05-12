import { Category } from "../models/Category";
import { setInitialToUpperCase, showToast } from "../utils";

export const fetchCategoryByName = (catList: Category[], catName: string) => {

  const category = catList.filter((cat: Category) => (
    cat.nom = catName
  ))

  return category[0]
}

export const fetchAllCategories = (realm: Realm) : Category []=>{
  let finalArray: Category[]
  const categories = realm.objects("Category")

  const categoriesList: any[] = categories.map((cat: any)=> (
    new Category (
      cat._id,
      cat.nom,
    )
  ))

  finalArray = [...categoriesList]
  

  return finalArray
}



export const createNewCategory = (realm: Realm, categoryExisting: string)=>{

  const categoryExists = realm.objects("Category").filtered(`nom = "${setInitialToUpperCase(categoryExisting.trim())}"`)

  if(categoryExists.length>0){
    showToast("error", "Impossible d'ajouter", "Cette catégorie existe déjà !")

  } else {
    realm.write(()=>{
      realm.create("Category", {
        _id: Date.now(),
        nom : setInitialToUpperCase(categoryExisting.trim()) 
      }
    )
        
    showToast("success", "Parfait !", "Nouvelle catégorie créée.")
      
    })

  }
}