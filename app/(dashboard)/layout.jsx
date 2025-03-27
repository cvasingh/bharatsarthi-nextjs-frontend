import AppSidebar from "@/components/app-sidebar";
import { Navbar } from "@/components/Navbar";
import { SidebarTrigger } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <div className="flex w-full h-full">
        <AppSidebar />
        <SidebarTrigger />
        <div className="lg:pl-[264px] w-full">
          <div className="mx-auto max-w-screen-2xl h-full">
            <Navbar />
            <main className="h-full py-8 px-6 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
