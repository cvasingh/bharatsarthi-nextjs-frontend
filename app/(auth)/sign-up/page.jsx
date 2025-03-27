import { getCurrent } from "@/features/auth/queries";
import { SignUpCard } from "@/features/auth/components/sign-up-card";
import { redirect } from "next/navigation";

const SignUpPage = async ({ searchParams }) => {
  const user = await getCurrent();
  if (user) redirect(searchParams?.redirectUrl ?? "/");

  return <SignUpCard />;
};

export default SignUpPage;
