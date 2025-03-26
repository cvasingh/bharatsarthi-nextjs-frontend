import { ProfileForm } from "@/components/ProfileForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className=" flex w-full flex-col p-8">
      <div className="flex justify-center items-center">
        <Avatar className="size-20">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className=" ml-4">
          <p className="text-xl font-bold">Shiva Singh</p>
          <span className="text-xs font-medium text-muted-foreground">
            Gurugram, Haryana
          </span>
        </div>
      </div>
      <ProfileForm />
    </div>
  );
}
