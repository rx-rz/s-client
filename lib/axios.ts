import axios from "axios";
import { APIError } from "./handle-api-errors";
export const api = axios.create({
  withCredentials: true,
  baseURL:
    typeof window === "undefined"
      ? process.env.PUBLIC_URL
      : process.env.NEXT_PUBLIC_URL,
});
api.interceptors.request.use((request) => {
  return request;
});
api.interceptors.response.use(
  (resp) => {
    if(resp.status === 302){
      
    }
    return resp.data;
  },
  (error) => {
    let apiError;
    if (axios.isAxiosError(error)) {
      apiError = new APIError(
        Number(error.response?.status.toString() || ""),
        error.response?.data?.error || error.message,
        error.response?.data?.error_type || "Internal Server Error"
      );
    } else {
      apiError = new APIError(
        500,
        error.message || "Unknown error occured",
        "Internal Server Error"
      );
    }
    return Promise.reject(apiError);
  }
);
