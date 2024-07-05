import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="w-10/12 sticky  z-10 top-0 mx-auto flex items-center justify-between">
      <Link href={"/"} className="flex gap-1 items-center">
        <Image alt="" src={"/logo.png"} width={50} height={50} />
        {/* <p className="text-black font-satoshi flex font-medium flex-col">
          <span>Bliss</span>
          <span>Hotel</span>
        </p> */}
      </Link>
      <div className="flex gap-6 font-medium">
        <Link href={"/auth/login"}>Login</Link>
        <Link href={"/book"}>Book a room</Link>
      </div>
    </nav>
  );
};
