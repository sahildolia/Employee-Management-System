import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HRRecruitmentPageEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRRecruitment = createAsyncThunk('HandleGetHRRecruitment', async (recruitmentData, { rejectWithValue }) => {
    try {
        const { apiroute } = recruitmentData;
        const response = await apiService.get(`${HRRecruitmentPageEndPoints[apiroute]}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandlePostHRRecruitment = createAsyncThunk('HandlePostHRRecruitment', async (recruitmentData, { rejectWithValue }) => {
    try {
        const { apiroute, data } = recruitmentData;
        const response = await apiService.post(`${HRRecruitmentPageEndPoints[apiroute]}`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandlePatchHRRecruitment = createAsyncThunk('HandlePatchHRRecruitment', async (recruitmentData, { rejectWithValue }) => {
    try {
        const { apiroute, data } = recruitmentData;
        const response = await apiService.patch(`${HRRecruitmentPageEndPoints[apiroute]}`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandleDeleteHRRecruitment = createAsyncThunk("HandleDeleteHRRecruitment", async (recruitmentData, { rejectWithValue }) => {
    try {
        const { apiroute } = recruitmentData;
        const RouteArray = apiroute.split(".")
        if (RouteArray.length > 0) {
            const response = await apiService.delete(`${HRRecruitmentPageEndPoints[RouteArray[0]](RouteArray[1])}`, {
                withCredentials: true
            })
            return response.data
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
