export type Category = {
  _id:number
  nom: string
}


const CategorySchema = {
  name: "Category",
  primaryKey: "_id",
  properties: {
    _id: "int",
    nom: "string",
  },
}

export default CategorySchema