import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HRAttendancePageEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRAttendance = createAsyncThunk('HandleGetHRAttendance', async (attendanceData, { rejectWithValue }) => {
    try {
        const { apiroute } = attendanceData;
        const response = await apiService.get(`${HRAttendancePageEndPoints[apiroute]}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandlePostHRAttendance = createAsyncThunk('HandlePostHRAttendance', async (attendanceData, { rejectWithValue }) => {
    try {
        const { apiroute, data } = attendanceData;
        const response = await apiService.post(`${HRAttendancePageEndPoints[apiroute]}`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandleDeleteHRAttendance = createAsyncThunk('HandleDeleteHRAttendance', async (attendanceData, { rejectWithValue }) => {
    try {
        const { apiroute } = attendanceData;
        const RouteArray = apiroute.split(".")
        if (RouteArray.length > 0) {
            const response = await apiService.delete(`${HRAttendancePageEndPoints[RouteArray[0]](RouteArray[1])}`, {
                withCredentials: true
            });
            return response.data;
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
