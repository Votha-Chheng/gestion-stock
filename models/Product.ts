import { Category } from "./Category"

export class Product {
  _id: number;
  codeBarType: string;
  marque: string;
  nom: string;
  categorie?: Category;
  telFournisseur?: string;
  siteFournisseur?: string;
  commandeEncours: boolean = false;
  qty: number;
  stockLimite: number;

  constructor(  
    _id: number,
    codeBarType: string,
    marque: string,
    nom: string,
    qty: number,
    stockLimite: number,
    categorie?: {_id: number, nom: string},
    telFournisseur?: string,
    siteFournisseur?: string,
    commandeEncours: boolean = false
  ) {
    this._id = _id;
    this.codeBarType = codeBarType;
    this.marque = marque;
    this.nom = nom;
    this.categorie ={_id: categorie._id, nom: categorie.nom};
    this.telFournisseur = telFournisseur;
    this.siteFournisseur = siteFournisseur;
    this.commandeEncours = commandeEncours;
    this.qty = qty;
    this.stockLimite = stockLimite;

  }
}

const ProductSchema = {
  name: "Product",
  primaryKey: "_id",
  properties: {
    _id: "string",
    codeBarType: "string",
    marque: "string",
    nom: "string",
    categorie: "Category?",
    telFournisseur:"string?",
    siteFournisseur : "string?",
    commandeEncours:{type:"bool", default: false},
    qty:"int",
    stockLimite:"int"
  },
}

export default ProductSchema