export interface Category {
  _id: string;
  name: string;
  description: string;
  type: string;
  parent: Category | null;
  image: string;
  active: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
