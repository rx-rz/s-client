import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { handleBookingFlow } from "./api";
import { useSearchParams } from "next/navigation";

const customerDetailsSchema = z.object({
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
};
export const useMakeBooking = ({ amount }: Props) => {
  const {
    registerCustomer,
    createBooking,
    createBookingError,
    registerCustomerError,
    createBookingLoading,
    registerCustomerLoading,
    createBookingResponse,
    registerCustomerResponse,
  } = handleBookingFlow();
  const searchParams = useSearchParams();
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

  const submitDetails = async (
    values: z.infer<typeof customerDetailsSchema>
  ) => {
    localStorage.setItem("email-for-password-setting", values.email);
    const { isSuccess } = await registerCustomer({
      ...values,
      registrationIsOnTheBookingPage: true,
    });
    if (isSuccess) {
      await createBooking({
        customerEmail: "akhilol-log",
        startDate: searchParams.get("startDate") || "",
        endDate: searchParams.get("endDate") || "",
        amount: amount.toString(),
        roomNo: Number(searchParams.get("roomNo")),
      });
    }
  };
  return {
    form,
    submitDetails,
    createBookingError,
    createBookingLoading,
    createBookingResponse,
    registerCustomerError,
    registerCustomerLoading,
    registerCustomerResponse,
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
