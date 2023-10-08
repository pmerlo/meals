export interface Meal {
  _id: string;
  name: string;
  portions: number;
  date: string;
  modified: string;
  stock: number;
}

export interface DeleteResult {
  deleted: boolean;
}
