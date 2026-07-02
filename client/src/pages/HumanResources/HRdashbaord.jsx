import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { HRdashboardSidebar } from "../../components/ui/HRsidebar.jsx"
import { Outlet } from "react-router-dom"

export const HRDashbaord = () => {
    return (
        <div className="HR-dashboard-container flex">

            <div className="HRDashboard-sidebar">
                <SidebarProvider>
                    <HRdashboardSidebar />
                    <div className="sidebar-container min-[250px]:absolute md:relative">
                        <SidebarTrigger />
                    </div>
                </SidebarProvider>
            </div>
            <div className="HRdashboard-container h-screen w-full min-[250px]:mx-1 md:mx-2 flex flex-col min-[250px]:ps-10 md:ps-0">
                <Outlet />
            </div>
        </div>
    )
}