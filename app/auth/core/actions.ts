import { z } from "zod";
import { registerSchema } from "./form";
import { api } from "@/lib/axios";
import { createRoute } from "@/lib";
import { APIError } from "@/lib/handle-api-errors";

export const registerAccount = async (
  values: Omit<z.infer<typeof registerSchema>, "confirmPassword">
) => {
  let error;
  try {
    await api.post(
      createRoute({
        prefix: "customers",
        route: "/registerCustomer",
      }),
      values
    );
  } catch (err) {
    if (err instanceof APIError) {
      error = err;
    }
  }
  return { error };
};
