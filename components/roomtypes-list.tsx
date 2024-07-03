import { createRoute } from "@/lib";
import { api } from "@/lib/axios";
import { GetRoomTypesResponse } from "@/types/roomtype.types";
import Image from "next/image";
import Link from "next/link";

export const RoomtypesList = async () => {
  const response: GetRoomTypesResponse = await api.get(
    createRoute({
      prefix: "roomtypes",
      route: "/getRoomTypesForHomePage",
    })
  );

  return (
    <div className="flex gap-4 font-satoshi cursor-">
      {response.roomTypes.map((roomType, index) => (
        <Link
          href={`/roomtype/${roomType.name}`}
          key={roomType.id}
          className="flex-1 cursor-pointer"
        >
          <Image
            alt=""
            className="max-h-[700px]"
            src={"/mid-two.jpeg"}
            height={1000}
            width={700}
          />
          <div className="flex justify-between my-1 items-center">
            <p className="text-2xl font-medium text-accent_two">
              {roomType.name}
            </p>
            <p>${roomType.price}</p>
          </div>
          <p>{roomType.description}</p>
        </Link>
      ))}
    </div>
  );
};
