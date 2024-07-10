import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { createCustomerAccountForBooking, createBooking } from "./actions";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { APIError } from "@/types";

export const customerDetailsSchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "First name can only be a string",
    })
    .max(30, { message: "First name should be a maximum of 30 characters." }),
  lastName: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Last name can only be a string!",
    })
    .max(30, { message: "Last name should be a maximum of 30 characters." }),
  email: z.string({ required_error: "Email is required" }).email({
    message: "Email input is not a valid email. Please correct and try again",
  }),
  zip: z.string({ required_error: "Zip code is required" }).max(10),
  phoneNo: z.string({ required_error: "Phone number is required" }).max(50),
  address: z.string({ required_error: "Address is required" }),
});

type Props = {
  amount: number;
  paymentCallbackUrl: string;
};
export const useMakeBooking = ({ amount, paymentCallbackUrl }: Props) => {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const router = useRouter();
  const [submitBookingDetailsLoading, setSubmitBookingDetailsLoading] =
    useState(false);
  const form = useForm<z.infer<typeof customerDetailsSchema>>({
    resolver: zodResolver(customerDetailsSchema),
    defaultValues: {
      address: "",
      email: "",
      firstName: "",
      lastName: "",
      phoneNo: "",
      zip: "",
    },
  });

  const submitBookingDetails = async (
    values: z.infer<typeof customerDetailsSchema>
  ) => {
    setSubmitBookingDetailsLoading(true);

    const handleError = (error: APIError) => {
      setSubmitBookingDetailsLoading(false);
      toast({ title: error.error, variant: "destructive" });
    };

    const { error: regError, response: regResponse } =
      await createCustomerAccountForBooking(values);
    if (regError) return handleError(regError);

    if (regResponse?.isSuccess) {
      const { error: bookError, response: bookResponse } = await createBooking({
        customerEmail: values.email,
        startDate: searchParams.get("startDate") || "",
        endDate: searchParams.get("endDate") || "",
        amount: amount.toString(),
        roomNo: Number(searchParams.get("roomNo")) || 0,
        paymentCallbackUrl,
      });
      if (bookError) return handleError(bookError);
      if (bookResponse?.isSuccess) {
        router.push(bookResponse.paymentUrl);
      }
    }
    setSubmitBookingDetailsLoading(false);
  };

  return {
    form,
    submitBookingDetails,
    submitBookingDetailsLoading,
  };
};

export const getNoOfDays = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime());
  const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 3600 * 24));
  return diffInDays;
};
