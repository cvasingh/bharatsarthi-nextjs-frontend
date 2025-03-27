import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  return <>{JSON.stringify(params)}</>;
}
