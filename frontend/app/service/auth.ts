import axios, { AxiosError } from "axios";
import jwt from "jsonwebtoken";

import { LoginResponse } from "@/app/types/login-response";

export const login = async (data: { email: string, password: string }): Promise<LoginResponse> => {
  const base_url = process.env.NEXT_PUBLIC_BASE_URL
  const complement_url = "/auth/login"
  try {
    const response = await axios.post(`${base_url}/${complement_url}`,
      data,
      {
        headers: { "Content-Type": "application/json" },
      });

    return {
      success: true,
      data: response.data,
      message: "Seja bem vindo!"
    }
  } catch (error: AxiosError | any) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data
      }
    } else if (error.request) {
      return {
        success: false,
        message: "Errode conexão. ER-02"
      }
    } else {
      return {
        success: false,
        message: error.message
      }

    }
  }
}