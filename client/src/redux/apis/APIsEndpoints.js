export const APIsEndPoints = {
    LOGIN: "/api/auth/employee/login",
    CHECKELOGIN: "/api/auth/employee/check-login",
    FORGOT_PASSWORD: "/api/auth/employee/forgot-password",
    RESET_PASSWORD: (token) => `/api/auth/employee/reset-password/${token}`
}

export const HREndPoints = {
    SIGNUP: "/api/auth/HR/signup",
    CHECKLOGIN: "/api/auth/HR/check-login",
    LOGIN: "/api/auth/HR/login",
    VERIFY_EMAIL: "/api/auth/HR/verify-email",
    CHECK_VERIFY_EMAIL: "/api/auth/HR/check-verify-email",
    RESEND_VERIFY_EMAIL: "/api/auth/HR/resend-verify-email",
    FORGOT_PASSWORD: "/api/auth/HR/forgot-password",
    RESET_PASSWORD: (token) => `/api/auth/HR/reset-password/${token}` 
}

export const DashboardEndPoints = {
    GETDATA: "/api/v1/dashboard/HR-dashboard"
}

export const HREmployeesPageEndPoints = {
    GETALL: "/api/v1/employee/all",
    ADDEMPLOYEE: "/api/auth/employee/signup",
    GETONE: (EMID) => `/api/v1/employee/by-HR/${EMID}`,
    DELETE: (EMID) => `/api/v1/employee/delete-employee/${EMID}`
}

export const HRDepartmentPageEndPoints = {
    GETALL: "/api/v1/department/all",
    CREATE: "/api/v1/department/create-department",
    UPDATE: "/api/v1/department/update-department",
    DELETE: "/api/v1/department/delete-department"
}

export const EmployeesIDsEndPoints = {
    GETALL: "/api/v1/employee/all-employees-ids",
}

export const HRLeavePageEndPoints = {
    GETALL: "/api/v1/leave/all",
    CREATE: "/api/v1/leave/create-leave",
    UPDATE_HR: "/api/v1/leave/HR-update-leave",
    DELETE: (LID) => `/api/v1/leave/delete-leave/${LID}`,
}

export const HRNoticePageEndPoints = {
    GETALL: "/api/v1/notice/all",
    CREATE: "/api/v1/notice/create-notice",
    UPDATE: "/api/v1/notice/update-notice",
    DELETE: (NID) => `/api/v1/notice/delete-notice/${NID}`,
}

export const HRSalaryPageEndPoints = {
    GETALL: "/api/v1/salary/all",
    CREATE: "/api/v1/salary/create-salary",
    UPDATE: "/api/v1/salary/update-salary",
    DELETE: (SID) => `/api/v1/salary/delete-salary/${SID}`,
}

export const EmployeeDashboardEndPoints = {
    MY_PROFILE: "/api/v1/employee/by-employee",
    MY_ATTENDANCE: "/api/v1/attendance/my-attendance",
    MY_LEAVES: "/api/v1/leave/my-leaves",
    MY_SALARY: "/api/v1/salary/my-salaries",
    MY_NOTICES: "/api/v1/notice/my-notices",
    MY_REQUESTS: "/api/v1/generate-request/my-requests",
    CALENDAR_EVENTS: "/api/v1/corporate-calendar/events",
    INITIALIZE_ATTENDANCE: "/api/v1/attendance/initialize",
    UPDATE_ATTENDANCE: "/api/v1/attendance/update-attendance",
    CREATE_LEAVE: "/api/v1/leave/employee-create-leave",
    UPDATE_LEAVE: "/api/v1/leave/employee-update-leave",
    DELETE_LEAVE: (LID) => `/api/v1/leave/delete-leave/${LID}`,
    UPDATE_PROFILE: "/api/v1/employee/update-employee",
    CREATE_REQUEST: "/api/v1/generate-request/create-request",
}

export const HRAttendancePageEndPoints = {
    all: "/api/v1/attendance/all",
    create: "/api/v1/attendance/initialize",
    delete: (AID) => `/api/v1/attendance/delete-attendance/${AID}`,
}

export const HRCalendarPageEndPoints = {
    GETALL: "/api/v1/corporate-calendar/all",
    CREATE: "/api/v1/corporate-calendar/create-event",
    UPDATE: "/api/v1/corporate-calendar/update-event",
    DELETE: (EID) => `/api/v1/corporate-calendar/delete-event/${EID}`,
}

export const HRRecruitmentPageEndPoints = {
    GETALL: "/api/v1/recruitment/all",
    CREATE: "/api/v1/recruitment/create-recruitment",
    UPDATE: "/api/v1/recruitment/update-recruitment",
    DELETE: (RID) => `/api/v1/recruitment/delete-recruitment/${RID}`,
}

export const HRApplicantPageEndPoints = {
    GETALL: "/api/v1/applicant/all",
    CREATE: "/api/v1/applicant/create-applicant",
    UPDATE: "/api/v1/applicant/update-applicant",
    DELETE: (AID) => `/api/v1/applicant/delete-applicant/${AID}`,
}

export const HRInterviewPageEndPoints = {
    GETALL: "/api/v1/interview-insights/all",
    CREATE: "/api/v1/interview-insights/create-interview",
    UPDATE: "/api/v1/interview-insights/update-interview",
    DELETE: (IID) => `/api/v1/interview-insights/delete-interview/${IID}`,
} 