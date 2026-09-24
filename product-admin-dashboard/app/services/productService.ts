//products api calls

import axiosInstance from "./axiosInstance";
import { ProductResponse, Product } from "../types/product";

export const getProducts = async (
  limit: number,
  skip: number
): Promise<ProductResponse> => {
  const response = await axiosInstance.get<ProductResponse>(
    "/products",
    {
      params: {
        limit,
        skip,
      },
    }
  );

  return response.data;
};


export const getProduct=async(id:string):Promise<Product>=>{
  const response=await axiosInstance.get<Product>(`/products/${id}`);
  return response.data;
}