import { createSlice } from "@reduxjs/toolkit";
import { HandleGetHRAttendance, HandlePostHRAttendance, HandleDeleteHRAttendance } from "../Thunks/HRAttendancePageThunk";
import { HRAttendancePageAsyncReducer } from "../AsyncReducers/asyncreducer";

const HRAttendancePageSlice = createSlice({
    name: "HRAttendancePage",
    initialState: {
        data: null,
        isLoading: false,
        fetchData: false,
        success: {
            status: false,
            message: null,
            content: null
        },
        error: {
            status: false,
            message: null,
            content: null
        }
    },
    extraReducers: (builder) => {
        HRAttendancePageAsyncReducer(builder, HandleGetHRAttendance);
        HRAttendancePageAsyncReducer(builder, HandlePostHRAttendance);
        HRAttendancePageAsyncReducer(builder, HandleDeleteHRAttendance);
    }
})

export default HRAttendancePageSlice.reducer
