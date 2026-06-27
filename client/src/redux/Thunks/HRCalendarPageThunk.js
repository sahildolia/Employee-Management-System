import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HRCalendarPageEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRCalendarEvents = createAsyncThunk('HandleGetHRCalendarEvents', async (eventData, { rejectWithValue }) => {
    try {
        const { apiroute } = eventData;
        const response = await apiService.get(`${HRCalendarPageEndPoints[apiroute]}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandlePostHRCalendarEvent = createAsyncThunk('HandlePostHRCalendarEvent', async (eventData, { rejectWithValue }) => {
    try {
        const { apiroute, data } = eventData;
        const response = await apiService.post(`${HRCalendarPageEndPoints[apiroute]}`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandlePatchHRCalendarEvent = createAsyncThunk('HandlePatchHRCalendarEvent', async (eventData, { rejectWithValue }) => {
    try {
        const { apiroute, data } = eventData;
        const response = await apiService.patch(`${HRCalendarPageEndPoints[apiroute]}`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandleDeleteHRCalendarEvent = createAsyncThunk("HandleDeleteHRCalendarEvent", async (eventData, { rejectWithValue }) => {
    try {
        const { apiroute } = eventData;
        const RouteArray = apiroute.split(".")
        if (RouteArray.length > 0) {
            const response = await apiService.delete(`${HRCalendarPageEndPoints[RouteArray[0]](RouteArray[1])}`, {
                withCredentials: true
            })
            return response.data
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
