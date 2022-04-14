import Realm from "realm";

class Produit extends Realm.Object {}

Produit.schema = {
  name: "Produit",
  primaryKey: "produitID",
  properties: {
    _id: "objectId",
    codeBar: "string",
    nom: "string",
    categorie: "string",
  },
}

export default new Realm({ schema: [Produit]})