import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HRSalaryPageEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRSalary = createAsyncThunk('HandleGetHRSalary', async (SalaryData, { rejectWithValue }) => {
    try {
        const { apiroute } = SalaryData;
        const response = await apiService.get(`${HRSalaryPageEndPoints[apiroute]}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandlePostHRSalary = createAsyncThunk('HandlePostHRSalary', async (SalaryData, { rejectWithValue }) => {
    try {
        const { apiroute, data } = SalaryData;
        const response = await apiService.post(`${HRSalaryPageEndPoints[apiroute]}`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandlePatchHRSalary = createAsyncThunk('HandlePatchHRSalary', async (SalaryData, { rejectWithValue }) => {
    try {
        const { apiroute, data } = SalaryData;
        const response = await apiService.patch(`${HRSalaryPageEndPoints[apiroute]}`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandleDeleteHRSalary = createAsyncThunk("HandleDeleteHRSalary", async (SalaryData, { rejectWithValue }) => {
    try {
        const { apiroute } = SalaryData;
        const RouteArray = apiroute.split(".")
        if (RouteArray.length > 0) {
            const response = await apiService.delete(`${HRSalaryPageEndPoints[RouteArray[0]](RouteArray[1])}`, {
                withCredentials: true
            })
            return response.data
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
