import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HRApplicantPageEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRApplicants = createAsyncThunk('HandleGetHRApplicants', async (applicantData, { rejectWithValue }) => {
    try {
        const { apiroute } = applicantData;
        const response = await apiService.get(`${HRApplicantPageEndPoints[apiroute]}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandlePostHRApplicant = createAsyncThunk('HandlePostHRApplicant', async (applicantData, { rejectWithValue }) => {
    try {
        const { apiroute, data } = applicantData;
        const response = await apiService.post(`${HRApplicantPageEndPoints[apiroute]}`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandlePatchHRApplicant = createAsyncThunk('HandlePatchHRApplicant', async (applicantData, { rejectWithValue }) => {
    try {
        const { apiroute, data } = applicantData;
        const response = await apiService.patch(`${HRApplicantPageEndPoints[apiroute]}`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandleDeleteHRApplicant = createAsyncThunk("HandleDeleteHRApplicant", async (applicantData, { rejectWithValue }) => {
    try {
        const { apiroute } = applicantData;
        const RouteArray = apiroute.split(".")
        if (RouteArray.length > 0) {
            const response = await apiService.delete(`${HRApplicantPageEndPoints[RouteArray[0]](RouteArray[1])}`, {
                withCredentials: true
            })
            return response.data
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
