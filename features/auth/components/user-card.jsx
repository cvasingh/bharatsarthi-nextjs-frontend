"use client";

import { useCurrent } from "../api/use-current";
import { useLogout } from "../api/use-logout";
import { Link, Loader } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import QRCode from "react-qr-code";
import DottedSeparator from "@/components/dotted-separator";

export const UserCard = () => {
  const { data, isLoading } = useCurrent();

  if (isLoading) {
    return (
      <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { userId, name, email, address } = data;
  console.log(email);

  return (
    <section class="relative ">
      <div className="border rounded-2xl mx-auto shadow-md p-4 w-[156px] mb-6">
        <QRCode
          value={`${process.env.NEXT_PUBLIC_APP_URL}/preview/${userId}`}
          size="124"
        />
        <p className="text-xs font-bold mt-2 text-center">Your QR Code</p>
      </div>
      <div className="p-7">
        <DottedSeparator />
      </div>
      <div class="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div class="block">
          <h3 class="font-manrope font-bold text-4xl text-gray-900 mb-1 max-sm:text-center">
            {name || "User"}
          </h3>
          <h3 class="font-manrope font-bold text-4xl text-gray-900 mb-1 max-sm:text-center">
            {email}
          </h3>
          {address && (
            <p class="font-normal text-base leading-7 text-gray-500  max-sm:text-center">
              Engineer at BB Agency Industry <br class="hidden sm:block" />
              New York, United States
            </p>
          )}
        </div>
        {data?.["$id"] === userId && (
          <Link href="/edit">
            <Edit className="size-6 text-muted-foreground" />
          </Link>
        )}
      </div>
    </section>
  );
};
