import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { EmployeeDashboardEndPoints } from "../apis/APIsEndpoints";

export const HandleGetMyProfile = createAsyncThunk('HandleGetMyProfile', async (LeaveData, { rejectWithValue }) => {
    try {
        const { apiroute } = LeaveData;
        const response = await apiService.get(`${EmployeeDashboardEndPoints[apiroute]}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandleGetMyAttendance = createAsyncThunk('HandleGetMyAttendance', async (LeaveData, { rejectWithValue }) => {
    try {
        const { apiroute } = LeaveData;
        const response = await apiService.get(`${EmployeeDashboardEndPoints[apiroute]}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandleGetMyLeaves = createAsyncThunk('HandleGetMyLeaves', async (LeaveData, { rejectWithValue }) => {
    try {
        const { apiroute } = LeaveData;
        const response = await apiService.get(`${EmployeeDashboardEndPoints[apiroute]}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandleGetMySalary = createAsyncThunk('HandleGetMySalary', async (LeaveData, { rejectWithValue }) => {
    try {
        const { apiroute } = LeaveData;
        const response = await apiService.get(`${EmployeeDashboardEndPoints[apiroute]}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandleGetMyNotices = createAsyncThunk('HandleGetMyNotices', async (LeaveData, { rejectWithValue }) => {
    try {
        const { apiroute } = LeaveData;
        const response = await apiService.get(`${EmployeeDashboardEndPoints[apiroute]}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandleGetMyRequests = createAsyncThunk('HandleGetMyRequests', async (LeaveData, { rejectWithValue }) => {
    try {
        const { apiroute } = LeaveData;
        const response = await apiService.get(`${EmployeeDashboardEndPoints[apiroute]}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandleGetCalendarEvents = createAsyncThunk('HandleGetCalendarEvents', async (LeaveData, { rejectWithValue }) => {
    try {
        const { apiroute } = LeaveData;
        const response = await apiService.get(`${EmployeeDashboardEndPoints[apiroute]}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandlePostMyAttendance = createAsyncThunk('HandlePostMyAttendance', async (LeaveData, { rejectWithValue }) => {
    try {
        const { apiroute, data } = LeaveData;
        const response = await apiService.post(`${EmployeeDashboardEndPoints[apiroute]}`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandlePostMyLeave = createAsyncThunk('HandlePostMyLeave', async (LeaveData, { rejectWithValue }) => {
    try {
        const { apiroute, data } = LeaveData;
        const response = await apiService.post(`${EmployeeDashboardEndPoints[apiroute]}`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandlePatchMyLeave = createAsyncThunk('HandlePatchMyLeave', async (LeaveData, { rejectWithValue }) => {
    try {
        const { apiroute, data } = LeaveData;
        const response = await apiService.patch(`${EmployeeDashboardEndPoints[apiroute]}`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandlePatchMyProfile = createAsyncThunk('HandlePatchMyProfile', async (profileData, { rejectWithValue }) => {
    try {
        const { apiroute, data } = profileData;
        const response = await apiService.patch(`${EmployeeDashboardEndPoints[apiroute]}`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandleDeleteMyLeave = createAsyncThunk("HandleDeleteMyLeave", async (LeaveData, { rejectWithValue }) => {
    try {
        const { apiroute } = LeaveData;
        const RouteArray = apiroute.split(".")
        if (RouteArray.length > 0) {
            const response = await apiService.delete(`${EmployeeDashboardEndPoints[RouteArray[0]](RouteArray[1])}`, {
                withCredentials: true
            })
            return response.data
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
