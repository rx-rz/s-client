import { createRoute } from "@/lib";
import { api } from "@/lib/axios";
import {
  GetRoomTypeDetailsResponse,
  GetRoomTypesResponse,
} from "@/types/roomtype.types";
import Image from "next/image";
import Link from "next/link";

const Page = async ({ params: { name } }: { params: { name: string } }) => {
  const { roomTypeDetails }: GetRoomTypeDetailsResponse = await api.get(
    createRoute({
      prefix: "roomtypes",
      route: "/roomTypeDetails",
    }),
    { params: { name } }
  );

  return (
    <main className="flex font-satoshi gap-8">
      <div className="mt-1 sticky top-24 h-[70vh]">
        <h2 className="text-6xl font-medium">{roomTypeDetails.name}</h2>
        <p className="text-xl my-3 font-medium opacity-80">
          {roomTypeDetails.description}
        </p>
        <p className="text-accent_two text-4xl font-bold">${roomTypeDetails.price}</p>
        <ul className="mt-4 mb-6">
          {roomTypeDetails.features?.map((feature) => (
            <li key={feature} className="mb-1 pb-1">
              {feature}
            </li>
          ))}
        </ul>
        <Link className="underline underline-offset-4 text-xl" href={"#"}>
          Book this room
        </Link>
      </div>
      <div className="grid grid-cols-2 mb-20 gap-3">
        <Image
          className="w-full h-full"
          src={"/details-three.jpeg"}
          alt=""
          width={1000}
          height={1000}
        />
        <Image
          className="w-full h-full"
          src={"/details-two.jpeg"}
          alt=""
          width={1000}
          height={1000}
        />
        <Image
          className="w-full h-full"
          src={"/details-one.jpeg"}
          alt=""
          width={1000}
          height={1000}
        />
        <Image
          className="w-full h-full"
          src={"/details-four.jpeg"}
          alt=""
          width={1000}
          height={1000}
        />
      </div>
    </main>
  );
};

export async function generateStaticParams() {
  const response: GetRoomTypesResponse = await api.get(
    createRoute({
      prefix: "roomtypes",
      route: "/getRoomTypesForHomePage",
    })
  );
  return response.roomTypes.map((roomType) => ({
    name: roomType.name,
  }));
}

export default Page;
