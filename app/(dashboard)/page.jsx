// import ProfileForm from "@/components/profile-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className=" flex w-full flex-col p-8 max-w-screen-md mx-auto">
      <div className="flex justify-start items-center mb-20">
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
      {/* <ProfileForm /> */}
    </div>
  );
}
