import { User } from "@/lib/utils";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
type AuthState = {
  user: User;
  token: string;
  setUser: (user: User) => void;
  setToken: (token: AuthState["token"]) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
