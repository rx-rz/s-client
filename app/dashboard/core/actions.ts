import { createRoute } from "@/lib";
import { api } from "@/lib/axios";
import { GetCustomerDetailsResponse } from "@/types/customer.types";
import { cookies } from "next/headers";

export const getCustomerDetails = async ({ email }: { email: string }) => {
  let error;
  let response: GetCustomerDetailsResponse | undefined;
  try {
    response = await api.get(
      createRoute({
        prefix: "customers",
        route: "/getCustomerDetails",
      }),
      {
        params: { email },
        headers: { Cookie: `token=${cookies().get("token")?.value}` },
      }
    );
  } catch (err) {
    error = err;
  }
  return { error, response };
};
