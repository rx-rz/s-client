import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";
import { NavbarWrapper } from "@/components/navbar-wrapper";

export const metadata: Metadata = {
  title: "Bliss Hotel",
  generator: "Next.js",
  applicationName: "Bliss Hotel",
  keywords: ["Bliss Hotel", "Accomodation", "Hotel", "Hospitality"],
  authors: [{ name: "Adeleye Temiloluwa" }],
  creator: "Adeleye Temiloluwa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-clip">
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
        <main className="mx-auto">
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
