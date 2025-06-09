export interface ICategory {
  name: string;
  description: string;
  type: "ingredient" | "product" | "blog";
  parentId?: string
}

export interface IDeleteMultipleCategoriesRequest {
  ids: string[];
}