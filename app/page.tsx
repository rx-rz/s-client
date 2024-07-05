import { RoomtypesList } from "@/components/roomtypes-list";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="mx-auto  h-screen">
        <Image
          className="h-full object-cover"
          src={"/landing.jpeg"}
          width={2200}
          alt=""
          height={1600}
        />
      </div>
      <div className="w-10/12 mx-auto">
        <div className="py-64  mx-auto">
          <p className="font-satoshi text-center w-fit mx-auto text-5xl ">
            Nestled along the pristine coastline of the Caribbean, The Bliss
            Hotel invites you to experience luxury redefined. Our exclusive
            beachfront property offers an unparalleled escape from the ordinary,
            where azure waters meet white sandy beaches and lush tropical
            gardens create a paradise oasis.
          </p>
        </div>
        <div className="h-fit  mb-20 gap-8 flex flex-col   mx-auto">
          <Image
            alt=""
            className="max-h-[700px] max-w-[500px]"
            src={"/mid-one.jpeg"}
            height={1000}
            width={700}
          />
          <Image
            alt=""
            className="max-h-[700px] self-end max-w-[500px]"
            src={"/mid-two.jpeg"}
            height={1000}
            width={700}
          />
          <div className="mb-20 mt-32">
            <h2 className="text-5xl mb-8">Rooms</h2>
            <RoomtypesList />
          </div>
          <Image
            alt=""
            className="max-h-[700px] self-end max-w-[500px]"
            src={"/mid-four.jpeg"}
            height={1000}
            width={700}
          />
          <Image
            alt=""
            className="max-h-[700px]  max-w-[500px]"
            src={"/mid-three.jpeg"}
            height={1000}
            width={700}
          />
        </div>
        <div className="text-5xl   text-justify mx-auto font-satoshi">
          <p>
            Experience the vacation of a lifetime at The Bliss Hotel, where
            luxury meets nature in perfect harmony. Book your stay today and
            create memories that will last forever.
          </p>
          <div className="flex justify-between my-8 items-center">
            <div className="flex text-sm flex-col">
              <Link href={"#"}>Github</Link>
              <Link href={"#"}>Email</Link>
              <Link href={"#"}>Medium</Link>
              <Link href={"#"}>Twitter</Link>
            </div>
            <Image
              alt=""
              className="invert"
              src={"/logo.png"}
              width={50}
              height={50}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
