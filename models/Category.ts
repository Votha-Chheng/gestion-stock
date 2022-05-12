export class Category {
  _id: number;
  nom: string;

  constructor(  
    _id: number,
    nom: string,

  ) {
    this._id = _id;
    this.nom = nom;

  }
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