import { Metadata } from "next";
import { ReactNode } from "react";
export const metadata: Metadata = {
  title: "Book a room",
};
export default function BookingLayout({ children }: { children: ReactNode }) {
  
  return (
    <section className="w-10/12 mx-auto">
      <div>{children}</div>
    </section>
  );
}
