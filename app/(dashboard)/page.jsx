import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/queries";

const Home = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  redirect(`/preview`);
};

export default Home;
