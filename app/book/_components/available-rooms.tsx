import Image from "next/image";
import { getAvailableRooms } from "../_api";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { DateRange } from "react-day-picker";

type Props = {
  range: DateRange | undefined;
};
export const AvailableRooms = ({ range }: Props) => {
  const { data } = getAvailableRooms();
  return (
    <div className="mt-20">
      {data?.availableRooms.map((room) => (
        <div key={room.roomNo} className="flex w-full mb-8 gap-8">
          <Image
            width={1000}
            height={500}
            alt=""
            src={"/details-two.jpeg"}
            className="rounded-sm shadow-sm h-fit max-w-[550px] max-h-[400px] object-fill"
          />

          <div className="flex-1">
            <div className="flex mb-4 items-center text-4xl justify-between flex-1">
              <div>
                <p>{room.name}</p>
                <div className="flex gap-2 items-center mt-1">
                  <CalendarIcon />
                  <p className="text-sm">{range?.from?.toDateString()}</p>
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold">${room.price}</p>
                <Button className="text-lg">Book Now</Button>
              </div>
            </div>

            <p className="text-lg font-medium opacity-70">{room.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
