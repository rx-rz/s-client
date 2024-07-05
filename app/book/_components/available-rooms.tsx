import { getAvailableRooms } from "../core/api";
import { DateRange } from "react-day-picker";
import { RoomCard } from "./room-card";

type Props = {
  range: DateRange | undefined;
  roomTypeSelected?: string;
};

export const AvailableRooms = ({ range, roomTypeSelected }: Props) => {
  const { data } = getAvailableRooms();

  const availableRoomBasedOnSelectedRoomType =
    roomTypeSelected &&
    data?.availableRooms.find((room) => room.name === roomTypeSelected);
  console.log({ availableRoomBasedOnSelectedRoomType });
  return (
    <div className="mt-20">
      {!availableRoomBasedOnSelectedRoomType &&
        data?.availableRooms &&
        data.availableRooms.length > 0 &&
        data?.availableRooms.map((room) => (
          <RoomCard range={range} room={room} />
        ))}
      {availableRoomBasedOnSelectedRoomType && (
        <RoomCard range={range} room={availableRoomBasedOnSelectedRoomType} />
      )}
    </div>
  );
};
