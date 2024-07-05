import { createRoute } from "@/lib";
import { api } from "@/lib/axios";
import {
  GetRoomTypeDetailsResponse,
  GetRoomTypesResponse,
} from "@/types/roomtype.types";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  params: { name },
}: {
  params: { name: string };
}): Promise<Metadata> {
  return {
    title: `Bliss Hotel: ${decodeURIComponent(name)}`,
  };
}

const Page = async ({ params: { name } }: { params: { name: string } }) => {
  const { roomTypeDetails }: GetRoomTypeDetailsResponse = await api.get(
    createRoute({
      prefix: "roomtypes",
      route: "/roomTypeDetails",
    }),
    { params: { name } }
  );

  return (
    <main className="flex font-satoshi tracking-tight gap-8 w-10/12 mx-auto">
      <div className="mt-1 sticky top-24 h-[70vh]">
        <h2 className="text-4xl font-medium">{roomTypeDetails.name}</h2>
        <p className=" my-3 font-medium max-w-3xl opacity-80">
          {roomTypeDetails.description}
        </p>

        <ul className="mt-8 mb-6 list-disc">
          {roomTypeDetails.features?.map((feature) => (
            <li key={feature} className=" mb-1 pb-1">
              {feature}
            </li>
          ))}
        </ul>
        <p className="text-accent_two text-4xl font-bold">
          ${roomTypeDetails.price}
        </p>
        <Link
          className="underline underline-offset-4 text-xl"
          href={`/book?roomType=${roomTypeDetails.name}`}
        >
          Book this room
        </Link>
      </div>
      <div className="grid grid-cols-1 mb-20 gap-3">
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
