import axiosInstance from "./axiosInstance";
import {
  LoginCredentials,
  LoginResponse,
} from "../types/auth"

export const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    "/auth/login",
    credentials
  );

  return response.data;
};