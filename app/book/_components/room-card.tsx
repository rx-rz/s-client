
import { Button } from "@/components/ui/button";
import { manageSearchParams } from "@/lib/search-params";
import { Room } from "@/types/room.types";
import { CalendarIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { DateRange } from "react-day-picker";

type Props = {
  room: Room;
  range: DateRange | undefined;
};

export const RoomCard = ({room, range}: Props) => {
  const { addSearchParam, navigateWithParams } = manageSearchParams();
  return (
    <div key={room.roomNo} className="flex w-full mb-8 gap-8">
      <Image
        width={1000}
        height={500}
        alt=""
        src={"/details-three.jpeg"}
        className="rounded-sm shadow-sm h-fit max-w-[550px] max-h-[400px] object-fill"
      />

      <div className="flex-1 max-w-[800px]">
        <div className="flex mb-4 items-center text-2xl font-medium justify-between flex-1">
          <div>
            <p>{room.name}</p>
            <div className="flex gap-2 items-center mt-1">
              <CalendarIcon />
              <p className="text-sm">{range?.from?.toDateString()}</p>
            </div>
          </div>
          <div>
            <p className="text-xl font-medium">${room.price}</p>
            <p className="text-xs">per night</p>
          </div>
        </div>

        <p className=" font-medium opacity-70 mb-4">{room.description}</p>
        <Button
          onClick={() => {
            addSearchParam("roomNo", room.roomNo.toString());
            addSearchParam("startDate", range?.from?.toISOString() || "");
            addSearchParam("endDate", range?.to?.toISOString() || "");
            navigateWithParams("/book/submit-details");
          }}
          className="bg-black text-white p-2"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};
