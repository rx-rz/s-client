import { createRoute } from "@/lib";
import { api } from "@/lib/axios";
import { GetAvailableRoomsResponse } from "@/types/room.types";
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

