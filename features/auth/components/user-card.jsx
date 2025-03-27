"use client";

import { useCurrent } from "../api/use-current";
import { useLogout } from "../api/use-logout";
import { Loader } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserCard = () => {
  const { data: user, isLoading } = useCurrent();
  const { mutate: logout } = useLogout();

  if (isLoading) {
    return (
      <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const { name, email } = user;
  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase() ?? "U";

  return (
    <div className="flex justify-start items-center mb-20">
      <Avatar className="size-20">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div className=" ml-4">
        <p className="text-xl font-bold">{name || "User"}</p>
        <span className="text-xs font-medium text-muted-foreground">
          {email}
        </span>
      </div>
    </div>
  );
};
