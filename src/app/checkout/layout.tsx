import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/server-auth";

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const u = await getServerUser();
  if (!u) {
    redirect("/login?next=/checkout");
  }
  return <>{children}</>;
}
