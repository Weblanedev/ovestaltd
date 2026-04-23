import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/server-auth";

export default async function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const u = await getServerUser();
  if (!u) {
    redirect("/login?next=/partner");
  }
  return <>{children}</>;
}
