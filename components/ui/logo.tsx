import Image from "next/image";

export const Logo = ({ className }: { className: string }) => {
  return (
    <Image
      className={className}
      alt="Bliss Hotel Logo"
      height={50}
      width={50}
      src={"/logo.png"}
    />
  );
};
