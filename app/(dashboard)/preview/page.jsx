import { UserCard } from "@/features/auth/components/user-card";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  return <UserCard user={user} />;
}
