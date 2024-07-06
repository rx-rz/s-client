import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type User = {
  id: string;
  role: "ADMIN" | "CUSTOMER";
  email: string;
  isVerified: boolean | null;
  firstName: string | null;
  lastName: string | null;
};

export function decodeUserToken(token: string) {
  const userToken = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );
  return userToken as User;
}
