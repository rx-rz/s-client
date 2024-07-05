import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className="w-10/12 mx-auto">
      <div>{children}</div>
    </section>
  );
}
