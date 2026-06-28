import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HRProfileEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRProfile = createAsyncThunk("HandleGetHRProfile", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(`${HRProfileEndPoints.MY_HR_PROFILE}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const HandlePatchHRProfile = createAsyncThunk("HandlePatchHRProfile", async (profileData, { rejectWithValue }) => {
    try {
        const { data } = profileData;
        const response = await apiService.patch(`${HRProfileEndPoints.UPDATE_HR_PROFILE}`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
