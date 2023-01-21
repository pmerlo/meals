export interface Meal {
  _id: string;
  name: string;
  portions: number;
  date: string;
  stock: number;
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  qty: string;
}

export interface DeleteResult {
  deleted: boolean;
}
