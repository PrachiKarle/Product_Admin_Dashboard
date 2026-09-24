//products api calls

import axiosInstance from "./axiosInstance";
import { ProductResponse, Product,CreateProduct } from "../types/product";

export const getProducts = async (
  limit: number,
  skip: number,
  search?:string
): Promise<ProductResponse> => {
  
  const response = await axiosInstance.get<ProductResponse>(
    search?"/products/search":
    "/products",
    {
      params: {
        limit,
        skip,
        ...(search && {q:search})
      },
    }
  );

  return response.data;
};


export const getProduct=async(id:string):Promise<Product>=>{
  const response=await axiosInstance.get<Product>(`/products/${id}`);
  return response.data;
}


export const createProduct=async(product:CreateProduct):Promise<Product>=>{
  const response=await axiosInstance.post<Product>("/products/add",product);
  return response.data;
}

export const updateProduct=async(id:number,product:CreateProduct):Promise<Product>=>{
  const response=await axiosInstance.put<Product>(`/products/${id}`,product);
  return response.data;
}

export const deleteProduct=async(id:number):Promise<Product>=>{
  const response=await axiosInstance.delete<Product>(`/products/${id}`)
  return  response.data;
}

export const getCategories=async():Promise<string[]>=>{
  const response=await axiosInstance.get<string[]>("/products/categories");
  return response.data;
}


