import { getCurrent } from "@/features/auth/queries";
import { SignInCard } from "@/features/auth/components/sign-in-card";
import { redirect } from "next/navigation";

const SignInPage = async ({ searchParams }) => {
  const user = await getCurrent();
  if (user) redirect(searchParams?.redirectUrl ?? "/edit");

  return <SignInCard />;
};

export default SignInPage;
