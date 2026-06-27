import { createSlice } from "@reduxjs/toolkit";
import { HandleGetMyProfile, HandleGetMyAttendance, HandleGetMyLeaves, HandleGetMySalary, HandleGetMyNotices, HandleGetMyRequests, HandleGetCalendarEvents, HandlePostMyAttendance, HandlePostMyLeave, HandlePatchMyLeave, HandlePatchMyProfile, HandleDeleteMyLeave } from "../Thunks/EmployeeDashboardThunk";
import { EmployeeDashboardAsyncReducer } from "../AsyncReducers/asyncreducer";

const EmployeeDashboardSlice = createSlice({
    name: "EmployeeDashboard",
    initialState: {
        profile: null,
        attendance: null,
        leaves: null,
        salary: null,
        notices: null,
        requests: null,
        calendarEvents: null,
        isLoading: false,
        fetchData: false,
        success: { status: false, message: null, content: null },
        error: { status: false, message: null, content: null }
    },
    extraReducers: (builder) => {
        EmployeeDashboardAsyncReducer(builder, HandleGetMyProfile);
        EmployeeDashboardAsyncReducer(builder, HandleGetMyAttendance);
        EmployeeDashboardAsyncReducer(builder, HandleGetMyLeaves);
        EmployeeDashboardAsyncReducer(builder, HandleGetMySalary);
        EmployeeDashboardAsyncReducer(builder, HandleGetMyNotices);
        EmployeeDashboardAsyncReducer(builder, HandleGetMyRequests);
        EmployeeDashboardAsyncReducer(builder, HandleGetCalendarEvents);
        EmployeeDashboardAsyncReducer(builder, HandlePostMyAttendance);
        EmployeeDashboardAsyncReducer(builder, HandlePostMyLeave);
        EmployeeDashboardAsyncReducer(builder, HandlePatchMyLeave);
        EmployeeDashboardAsyncReducer(builder, HandlePatchMyProfile);
        EmployeeDashboardAsyncReducer(builder, HandleDeleteMyLeave);
    }
})

export default EmployeeDashboardSlice.reducer
