import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HRInterviewPageEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRInterviews = createAsyncThunk('HandleGetHRInterviews', async (interviewData, { rejectWithValue }) => {
    try {
        const { apiroute } = interviewData;
        const response = await apiService.get(`${HRInterviewPageEndPoints[apiroute]}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandlePostHRInterview = createAsyncThunk('HandlePostHRInterview', async (interviewData, { rejectWithValue }) => {
    try {
        const { apiroute, data } = interviewData;
        const response = await apiService.post(`${HRInterviewPageEndPoints[apiroute]}`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandlePatchHRInterview = createAsyncThunk('HandlePatchHRInterview', async (interviewData, { rejectWithValue }) => {
    try {
        const { apiroute, data } = interviewData;
        const response = await apiService.patch(`${HRInterviewPageEndPoints[apiroute]}`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandleDeleteHRInterview = createAsyncThunk("HandleDeleteHRInterview", async (interviewData, { rejectWithValue }) => {
    try {
        const { apiroute } = interviewData;
        const RouteArray = apiroute.split(".")
        if (RouteArray.length > 0) {
            const response = await apiService.delete(`${HRInterviewPageEndPoints[RouteArray[0]](RouteArray[1])}`, {
                withCredentials: true
            })
            return response.data
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
