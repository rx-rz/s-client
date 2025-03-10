"use client";
import { manageSearchParams } from "@/lib/search-params";
import Image from "next/image";
import { getAvailableRooms } from "../core/api";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getNoOfDays, useMakeBooking } from "../core/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const SubmitBookingDetailsPage = () => {
  const { searchParams } = manageSearchParams();
  const { data } = getAvailableRooms();
  const bookedRoom = data?.availableRooms.find(
    (room) => room.roomNo === Number(searchParams.get("roomNo"))
  );
  const totalNoOfDays = getNoOfDays({
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
  });
  const { form, submitBookingDetails, submitBookingDetailsLoading } =
    useMakeBooking({
      amount: Number(bookedRoom?.price) * totalNoOfDays,
      paymentCallbackUrl: "http://localhost:3000",
    });
    
  return (
    <div>
      <p className="text-4xl font-medium my-8">You are almost done!</p>
      <div className="flex mt-4 justify-between">
        <div className="w-[48%]">
          <Image
            width={1000}
            height={500}
            alt=""
            src={"/details-three.jpeg"}
            className="rounded-sm border shadow-lg h-fit max-h-[450px] object-cover mb-4"
          />
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-medium">{bookedRoom?.name}</h2>
              <div className="flex gap-2 items-center mb-4">
                <CalendarIcon />
                <p className="text-sm font-medium opacity-70">
                  {new Date(searchParams.get("startDate") || "").toDateString()}{" "}
                  - {new Date(searchParams.get("endDate") || "").toDateString()}
                </p>
              </div>
            </div>
            <p className="text-xl font-bold">
              ${Number(bookedRoom?.price) * totalNoOfDays}
              <span className="block text-xs">Total Price</span>
            </p>
          </div>
          <p className="font-medium text-justify opacity-70">
            {bookedRoom?.description}
          </p>
        </div>
        <div className="w-[48%]">
          <h3 className="text-2xl font-medium">Booking Details</h3>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitBookingDetails)}
              className="py-10 mx-auto font-satoshi"
            >
              <div className="flex gap-8">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormLabel>First Name *</FormLabel>
                      <FormControl className="">
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl className="">
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-8">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormLabel>Email*</FormLabel>
                      <FormControl className="">
                        <Input placeholder="johndoe@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNo"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl className="">
                        <Input placeholder="+234810011002" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-8">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormLabel>Address*</FormLabel>
                      <FormControl className="">
                        <Input placeholder="No 1, John Doe Street" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zip"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormLabel>Zip Code *</FormLabel>
                      <FormControl className="">
                        <Input placeholder="011011" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="mt-8 w-full p-1" type="submit">
                {submitBookingDetailsLoading ? <Spinner /> : "Make booking"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SubmitBookingDetailsPage;
