import axios from "axios";
import { APIError } from "./handle-api-errors";
export const api = axios.create({
  baseURL:
    typeof window === "undefined"
      ? process.env.PUBLIC_URL
      : process.env.NEXT_PUBLIC_URL,
  headers: {
    Authorization: `Bearer`,
  },
});
api.interceptors.response.use(
  (resp) => {
    return resp.data;
  },
  (error) => {
    let apiError;
    console.log(error)
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
