"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export const NavbarWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  if (pathname.includes("/dashboard")) {
    return null;
  }
  return <>{children}</>;
};
