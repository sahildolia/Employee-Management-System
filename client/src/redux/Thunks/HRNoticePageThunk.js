import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HRNoticePageEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRNotices = createAsyncThunk('HandleGetHRNotices', async (NoticeData, { rejectWithValue }) => {
    try {
        const { apiroute } = NoticeData;
        const response = await apiService.get(`${HRNoticePageEndPoints[apiroute]}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandlePostHRNotices = createAsyncThunk('HandlePostHRNotices', async (NoticeData, { rejectWithValue }) => {
    try {
        const { apiroute, data } = NoticeData;
        const response = await apiService.post(`${HRNoticePageEndPoints[apiroute]}`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandlePatchHRNotices = createAsyncThunk('HandlePatchHRNotices', async (NoticeData, { rejectWithValue }) => {
    try {
        const { apiroute, data } = NoticeData;
        const response = await apiService.patch(`${HRNoticePageEndPoints[apiroute]}`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandleDeleteHRNotices = createAsyncThunk("HandleDeleteHRNotices", async (NoticeData, { rejectWithValue }) => {
    try {
        const { apiroute } = NoticeData;
        const RouteArray = apiroute.split(".")
        if (RouteArray.length > 0) {
            const response = await apiService.delete(`${HRNoticePageEndPoints[RouteArray[0]](RouteArray[1])}`, {
                withCredentials: true
            })
            return response.data
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
