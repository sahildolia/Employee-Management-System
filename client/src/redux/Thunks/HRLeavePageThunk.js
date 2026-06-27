import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HRLeavePageEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRLeaves = createAsyncThunk('HandleGetHRLeaves', async (LeaveData, { rejectWithValue }) => {
    try {
        const { apiroute } = LeaveData;
        const response = await apiService.get(`${HRLeavePageEndPoints[apiroute]}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandlePostHRLeaves = createAsyncThunk('HandlePostHRLeaves', async (LeaveData, { rejectWithValue }) => {
    try {
        const { apiroute, data } = LeaveData;
        const response = await apiService.post(`${HRLeavePageEndPoints[apiroute]}`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandlePatchHRLeaves = createAsyncThunk('HandlePatchHRLeaves', async (LeaveData, { rejectWithValue }) => {
    try {
        const { apiroute, data } = LeaveData;
        const response = await apiService.patch(`${HRLeavePageEndPoints[apiroute]}`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandleDeleteHRLeaves = createAsyncThunk("HandleDeleteHRLeaves", async (LeaveData, { rejectWithValue }) => {
    try {
        const { apiroute } = LeaveData;
        const RouteArray = apiroute.split(".")
        if (RouteArray.length > 0) {
            const response = await apiService.delete(`${HRLeavePageEndPoints[RouteArray[0]](RouteArray[1])}`, {
                withCredentials: true
            })
            return response.data
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
