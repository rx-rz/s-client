import axios from "axios";
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
  (error: Error) => {
    return Promise.reject({ error });
  }
);
