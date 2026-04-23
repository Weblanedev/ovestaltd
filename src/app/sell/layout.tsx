import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/server-auth";

export default async function SellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const u = await getServerUser();
  if (!u) {
    redirect("/login?next=/sell");
  }
  return <>{children}</>;
}
