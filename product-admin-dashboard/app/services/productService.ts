import axiosInstance from "./axiosInstance";
import { ProductResponse } from "../types/product";

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