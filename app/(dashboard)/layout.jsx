import AppSidebar from "@/components/app-sidebar";
import { Navbar } from "@/components/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <Navbar />
          <div className="mx-auto max-w-screen-2xl w-full h-full">
            <main className="h-full py-8 px-6 flex flex-col">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
