import { Calendar } from "@/components/ui/calendar";
import { Dispatch, SetStateAction, useEffect } from "react";
import { DateRange } from "react-day-picker";
type Props = {
  range: DateRange | undefined;
  setRange: Dispatch<SetStateAction<DateRange | undefined>>;
  handleDayClick: (day: Date) => void;
};

export const BookingCalendar = ({ range, setRange, handleDayClick }: Props) => {
  const date = new Date();
  return (
    <Calendar
      mode="range"
      className="w-fit border"
      selected={range}
      onDayClick={handleDayClick}
      onSelect={setRange}
      disabled={{ before: new Date(date.setHours(date.getHours() + 1)) }}
    />
  );
};
