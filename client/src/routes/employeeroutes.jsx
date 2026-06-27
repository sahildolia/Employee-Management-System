import { EmployeeLogin } from "../pages/Employees/emplyoeelogin.jsx"
import { EmployeeLayout } from "../pages/Employees/EmployeeLayout.jsx"
import { ProtectedRoutes } from "./protectedroutes.jsx"
import { ForgotPassword } from "../pages/Employees/forgotpassword.jsx"
import { ResetEmailConfirm } from "../pages/Employees/resetemailconfirm.jsx"
import { ResetPassword } from "../pages/Employees/resetpassword.jsx"
import { EntryPage } from "../pages/Employees/EntryPage.jsx"
import { EmployeeDashboard } from "../pages/Employees/employeedashboard.jsx"
import { EmpLeavesPage } from "../pages/Employees/EmpLeavespage.jsx"
import { EmployeeSalaryPage } from "../pages/Employees/salarypage.jsx"
import { AttendancePage } from "../pages/Employees/attendancepage.jsx"
import { NoticesPage } from "../pages/Employees/noticespage.jsx"
import { ProfilePage } from "../pages/Employees/profilepage.jsx"

export const EmployeeRoutes = [
    {
        path: "/",
        element: <EntryPage />
    },
    {
        path: "/auth/employee/login",
        element: <EmployeeLogin />
    },
    {
        path: "/auth/employee/forgot-password",
        element: <ForgotPassword />
    },
    {
        path: "/auth/employee/reset-email-confirmation",
        element: <ResetEmailConfirm />
    },
    {
        path: "/auth/employee/resetpassword/:token",
        element: <ResetPassword />
    },
    {
        path: "/employee/dashboard",
        element: <ProtectedRoutes><EmployeeLayout /></ProtectedRoutes>,
        children: [
            {
                path: "/employee/dashboard/dashboard-data",
                element: <EmployeeDashboard />
            },
            {
                path: "/employee/dashboard/leaves",
                element: <EmpLeavesPage />
            },
            {
                path: "/employee/dashboard/salary",
                element: <EmployeeSalaryPage />
            },
            {
                path: "/employee/dashboard/attendance",
                element: <AttendancePage />
            },
            {
                path: "/employee/dashboard/notices",
                element: <NoticesPage />
            },
            {
                path: "/employee/dashboard/profile",
                element: <ProfilePage />
            }
        ]
    }
]
