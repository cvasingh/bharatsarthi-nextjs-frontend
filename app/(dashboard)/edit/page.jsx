import { useGetUserById } from "@/features/auth/api/use-get-user-by-id";
import { EditForm } from "@/features/auth/components/edit-form";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  return <EditForm user={user} />;
}
