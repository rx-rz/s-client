import { createRoute } from "@/lib";
import { api } from "@/lib/axios";
import useSWRMutation from "swr/mutation";

import {
  RegisterCustomerRequest,
  RegisterCustomerResponse,
} from "@/types/customer.types";
import {
  GetAvailableRoomsResponse,
  GetRoomDetailsResponse,
} from "@/types/room.types";
import useSWR from "swr";
import {
  CreateBookingRequest,
  CreateBookingResponse,
} from "@/types/booking.types";
import { useRouter } from "next/navigation";

export const getAvailableRooms = () => {
  const fetcher = (url: string): Promise<GetAvailableRoomsResponse> => {
    return api.get(url);
  };

  const { data, isLoading: availableRoomsIsLoading } = useSWR(
    createRoute({
      prefix: "rooms",
      route: "/getAvailableRooms",
    }),
    fetcher
  );

  return {
    data,
    availableRoomsIsLoading,
  };
};

export const getRoomDetails = (roomNo: number | string | null) => {
  const fetcher = (url: string): Promise<GetRoomDetailsResponse> => {
    return api.get(url, { params: { roomNo } });
  };
  const { data, isLoading: roomDetailsIsLoading } = useSWR(
    createRoute({
      prefix: "rooms",
      route: "/getRoomDetails",
    }),
    fetcher
  );
  return { data, roomDetailsIsLoading };
};

export const handleBookingFlow = () => {
  const router = useRouter();
  const registerCustomerRequest = async (
    url: string,
    { arg }: { arg: RegisterCustomerRequest }
  ): Promise<RegisterCustomerResponse> => {
    try {
      const response = await api.post(url, arg);
      return response.data;
    } catch (err) {
      throw err;
    }
  };


  const {
    trigger: registerCustomer,
    error: registerCustomerError,
    isMutating: registerCustomerLoading,
    data: registerCustomerResponse,
  } = useSWRMutation(
    createRoute({ prefix: "customers", route: "/registerCustomer" }),
    registerCustomerRequest
  );

  const createBookingRequest = async (
    url: string,
    { arg }: { arg: CreateBookingRequest }
  ): Promise<CreateBookingResponse> => {
    try {
      const response = await api.post(url, arg);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const {
    trigger: createBooking,
    data: createBookingResponse,
    error: createBookingError,
    isMutating: createBookingLoading,
  } = useSWRMutation(
    createRoute({ prefix: "bookings", route: "/createBooking" }),
    createBookingRequest,
    {
      onSuccess: () => {
        // router.push("/");
        console.log("here!");
      },
    }
  );
  
  return {
    registerCustomer,
    registerCustomerLoading,
    registerCustomerError,
    registerCustomerResponse,
    createBooking,
    createBookingLoading,
    createBookingError,
    createBookingResponse,
  };
};
