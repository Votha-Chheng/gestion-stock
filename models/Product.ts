import { Category } from "./Category"

export type Product = {
  _id: string,
  codeBarType: string,
  nom: string,
  categorie: Category,
  telFournisseur?: number,
  siteFournisseur?: string,
  commandeEncours:boolean,
  qty:number,
  stockLimite:number
}


const ProductSchema = {
  name: "Product",
  primaryKey: "_id",
  properties: {
    _id: "string",
    codeBarType: "string",
    nom: "string",
    categorie: "Category",
    telFournisseur:"int?",
    siteFournisseur : "string?",
    commandeEncours:{type:"bool", default: false},
    qty:"int",
    stockLimite:"int"
  },
}

export default ProductSchema