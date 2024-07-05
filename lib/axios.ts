import { toast } from "@/components/ui/use-toast";
import { APIError } from "@/types";
import axios, { AxiosError } from "axios";
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
    console.log(error);
    let apiError: APIError;

    if (axios.isAxiosError(error)) {
      apiError = {
        statusCode: error.response?.status.toString() || "",
        error: error.response?.data?.error || error.message,
        error_type: error.response?.data?.error_type || "AXIOS_ERROR",
      };
    } else {
      apiError = {
        statusCode: "500",
        error: error.message || "Unknown error occurred",
        error_type: "UNKNOWN_ERROR",
      };
    }

    return Promise.reject(apiError);
  }
);
