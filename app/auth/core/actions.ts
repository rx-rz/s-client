import { z } from "zod";
import { registerSchema } from "./form";
import { api } from "@/lib/axios";
import { createRoute } from "@/lib";
import { APIError } from "@/lib/handle-api-errors";
import {
  LoginCustomerRequest,
  LoginCustomerResponse,
  RegisterCustomerResponse,
} from "@/types/customer.types";
import {
  SendOTPRequest,
  SendOTPResponse,
  VerifyOTPRequest,
  VerifyOTPResponse,
} from "@/types/otp.types";

export const registerAccount = async (
  values: Omit<z.infer<typeof registerSchema>, "confirmPassword">
) => {
  let error;
  let response: RegisterCustomerResponse | undefined;
  try {
    response = await api.post(
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
  return { error, response };
};

export const sendOTP = async (values: SendOTPRequest) => {
  let error;
  let response: SendOTPResponse | undefined;
  try {
    response = await api.post(
      createRoute({
        prefix: "otp",
        route: "/sendOTP",
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

export const verifyOTP = async (values: VerifyOTPRequest) => {
  let error;
  let response: VerifyOTPResponse | undefined;
  try {
    response = await api.post(
      createRoute({
        prefix: "otp",
        route: "/verifyOTP",
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

export const loginAccount = async (values: LoginCustomerRequest) => {
  let error;
  let response: LoginCustomerResponse | undefined;
  try {
    response = await api.post(
      createRoute({
        prefix: "customers",
        route: "/loginCustomer",
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
