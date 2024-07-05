"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { BookingCalendar } from "./_components/booking-calendar";
import { AvailableRooms } from "./_components/available-rooms";
import { useSearchParams } from "next/navigation";

const BookingPage = () => {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
  });
  const [showAvailableRooms, setShowAvailableRooms] = useState(false);
  const searchParams = useSearchParams();
  const handleDayClick = (day: Date) => {
    if (range)
      if (!range.from || (range.from && range.to)) {
        setRange({ from: day, to: undefined });
      } else if (range.from && !range.to) {
        setRange({ from: range.from, to: day });
      }
  };
  const roomTypeSelected = searchParams.get("roomType") || "";
  return (
    <>
      <div className="relative">
        <div className="flex justify-between mt-16">
          <div className="max-w-2xl">
            <h2 className="text-5xl mb-4 font-medium">
              {roomTypeSelected ? (
                <span>
                  A beautiful <span className="text-accent_one">{roomTypeSelected}</span> awaits you!
                </span>
              ) : (
                "Our beautiful rooms are waiting for you!"
              )}
            </h2>
            <p className="font-medium opacity-75">
              Immerse yourself in a world of comfort and elegance as you explore
              our carefully curated selection of stunning accommodations. From
              cozy retreats to luxurious suites, each room is designed to
              provide you with a memorable and rejuvenating experience. Whether
              you're seeking a romantic getaway, a family vacation, or a
              peaceful solo adventure, our diverse range of rooms caters to
              every taste and need. Book now and prepare to indulge in the
              perfect blend of style, comfort, and exceptional hospitality that
              will make your stay truly unforgettable.
            </p>
            {range?.to ? (
              <Button
                className="mt-10"
                onClick={() => setShowAvailableRooms(true)}
              >
                Find Available Rooms
              </Button>
            ) : (
              <></>
            )}
          </div>

          <BookingCalendar
            handleDayClick={handleDayClick}
            range={range}
            setRange={setRange}
          />
        </div>
        {showAvailableRooms ? (
          <div className="mt-40 pt-8 border-t">
            <h2 className="font-medium text-3xl">
              Room(s) available between {range?.from?.toDateString()} and{" "}
              {range?.to?.toDateString()}
            </h2>
            <AvailableRooms range={range} roomTypeSelected={roomTypeSelected}/>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default BookingPage;
