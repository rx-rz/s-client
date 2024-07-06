import { User } from "@/lib/utils";
import { create } from "zustand";

type AuthState = {
  user: User
  token: string;
  setUser: (user: User) => void;
  setToken: (token: AuthState["token"]) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    firstName: "",
    lastName: "",
    email: "",
    id: "",
    isVerified: null,
    role: "CUSTOMER",
  },
  token: "",
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
}));
