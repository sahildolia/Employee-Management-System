import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { EmployeeSidebar } from "../../components/ui/EmployeeSidebar.jsx"
import { Outlet } from "react-router-dom"

export const EmployeeLayout = () => {
    return (
        <div className="HR-dashboard-container flex">
            <div className="HRDashboard-sidebar">
                <SidebarProvider>
                    <EmployeeSidebar />
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
