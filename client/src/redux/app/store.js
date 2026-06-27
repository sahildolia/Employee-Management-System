import { configureStore } from '@reduxjs/toolkit'
import EmployeeReducer from "../Slices/EmployeeSlice.js"
import HRReducer from '../Slices/HRSlice.js'
import DashbaordReducer from "../Slices/DashboardSlice.js"
import HREmployeesPageReducer from '../Slices/HREmployeesPageSlice.js'
import HRDepartmentPageReducer from '../Slices/HRDepartmentPageSlice.js'
import EMployeesIDReducer from '../Slices/EmployeesIDsSlice.js'
import HRSalaryPageReducer from '../Slices/HRSalaryPageSlice.js'
import HRNoticePageReducer from '../Slices/HRNoticePageSlice.js'
import HRLeavePageReducer from '../Slices/HRLeavePageSlice.js'
import EmployeeDashboardReducer from '../Slices/EmployeeDashboardSlice.js'
import HRAttendancePageReducer from '../Slices/HRAttendancePageSlice.js'
import HRCalendarPageReducer from '../Slices/HRCalendarPageSlice.js'
import HRRecruitmentPageReducer from '../Slices/HRRecruitmentPageSlice.js'
import HRApplicantPageReducer from '../Slices/HRApplicantPageSlice.js'
import HRInterviewPageReducer from '../Slices/HRInterviewPageSlice.js'

export const store = configureStore({
    reducer: {
        employeereducer: EmployeeReducer,
        HRReducer: HRReducer,
        dashboardreducer: DashbaordReducer,
        HREmployeesPageReducer : HREmployeesPageReducer,
        HRDepartmentPageReducer : HRDepartmentPageReducer,
        EMployeesIDReducer : EMployeesIDReducer,
        HRSalaryPageReducer : HRSalaryPageReducer,
        HRNoticePageReducer : HRNoticePageReducer,
        HRLeavePageReducer : HRLeavePageReducer,
        EmployeeDashboardReducer : EmployeeDashboardReducer,
        HRAttendancePageReducer : HRAttendancePageReducer,
        HRCalendarPageReducer : HRCalendarPageReducer,
        HRRecruitmentPageReducer : HRRecruitmentPageReducer,
        HRApplicantPageReducer : HRApplicantPageReducer,
        HRInterviewPageReducer : HRInterviewPageReducer
    }
})