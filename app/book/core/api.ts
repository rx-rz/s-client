import { createRoute } from "@/lib";
import { api } from "@/lib/axios";
import {
  GetAvailableRoomsResponse,
  GetRoomDetailsResponse,
} from "@/types/room.types";
import useSWR from "swr";

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

export const handleBookingFlow = () => {};
