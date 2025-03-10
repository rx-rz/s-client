import { createRoute } from "@/lib";
import { api } from "@/lib/axios";
import { APIError } from "@/lib/handle-api-errors";
import {
  CreateBookingRequest,
  CreateBookingResponse,
} from "@/types/booking.types";
import { customerDetailsSchema } from "./form";
import { z } from "zod";
import { RegisterCustomerResponse } from "@/types/customer.types";
export const createBooking = async (values: CreateBookingRequest) => {
  let error;
  let response: CreateBookingResponse | undefined;

  try {
    response = await api.post(
      createRoute({
        prefix: "bookings",
        route: "/createBooking",
      }),
      values
    );
  } catch (err) {
    if (err instanceof APIError) {
      error = err;
    }
  }
  return { error, response };
};

export const createCustomerAccountForBooking = async (
  values: z.infer<typeof customerDetailsSchema>
) => {
  let error;
  let response: RegisterCustomerResponse | undefined;
  try {
    response = await api.post(
      createRoute({
        prefix: "customers",
        route: "/createCustomer",
      }),
      values
    );
  } catch (err) {
    if (err instanceof APIError) {
      error = err;
    }
  }
  return { error, response };
};
