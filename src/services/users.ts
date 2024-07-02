import type { ApiResponse } from "@/models/apiResponse";
import { axiosInstance } from ".";
import type { Users } from "@/models/users";

export const getUsers = (): Promise<ApiResponse<Users[]>> => {
  return axiosInstance.get('/users');
}

export const updatetUser = (user: Users): Promise<ApiResponse<Users>> => {
  return axiosInstance.put(`/users/${user.id}`, user)
}

export const deleteUser = (user: Users) => {
  return axiosInstance.delete(`/users/${user.id}`)
}