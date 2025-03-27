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
    <section class="relative pt-20 pb-24">
      <img
        src="https://pagedone.io/asset/uploads/1705473908.png"
        alt="cover-image"
        class="w-full absolute top-0 left-0 z-0 h-60 object-cover"
      />
      <div class="w-full max-w-7xl mx-auto px-6 md:px-8">
        <Avatar className="size-20 mx-auto">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div class="flex items-center justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5">
          <div class="block">
            <h3 class="font-manrope font-bold text-4xl text-gray-900 mb-1 max-sm:text-center">
              {name || "User"}
            </h3>
            <p class="font-normal text-base leading-7 text-gray-500  max-sm:text-center">
              Engineer at BB Agency Industry <br class="hidden sm:block" />
              New York, United States
            </p>
          </div>
          <button class="py-3.5 px-5 flex rounded-full bg-indigo-600 items-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3011 8.69881L8.17808 11.8219M8.62402 12.5906L8.79264 12.8819C10.3882 15.6378 11.1859 17.0157 12.2575 16.9066C13.3291 16.7974 13.8326 15.2869 14.8397 12.2658L16.2842 7.93214C17.2041 5.17249 17.6641 3.79266 16.9357 3.0643C16.2073 2.33594 14.8275 2.79588 12.0679 3.71577L7.73416 5.16033C4.71311 6.16735 3.20259 6.67086 3.09342 7.74246C2.98425 8.81406 4.36221 9.61183 7.11813 11.2074L7.40938 11.376C7.79182 11.5974 7.98303 11.7081 8.13747 11.8625C8.29191 12.017 8.40261 12.2082 8.62402 12.5906Z"
                stroke="white"
                stroke-width="1.6"
                stroke-linecap="round"
              />
            </svg>
            <span class="px-2 font-semibold text-base leading-7 text-white">
              {email}
            </span>
          </button>
        </div>
        <div class="flex max-sm:flex-wrap max-sm:justify-center items-center gap-4">
          <a
            href="javascript:;"
            class="rounded-full py-3 px-6 bg-stone-100 text-gray-700 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900"
          >
            Ux Research
          </a>
          <a
            href="javascript:;"
            class="rounded-full py-3 px-6 bg-stone-100 text-gray-700 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900"
          >
            CX Strategy
          </a>
          <a
            href="javascript:;"
            class="rounded-full py-3 px-6 bg-stone-100 text-gray-700 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900"
          >
            Project Manager
          </a>
        </div>
      </div>
    </section>
  );
};
