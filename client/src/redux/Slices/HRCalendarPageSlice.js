import { createSlice } from "@reduxjs/toolkit";
import { HandleGetHRCalendarEvents, HandlePostHRCalendarEvent, HandlePatchHRCalendarEvent, HandleDeleteHRCalendarEvent } from "../Thunks/HRCalendarPageThunk";
import { HRCalendarPageAsyncReducer } from "../AsyncReducers/asyncreducer";

const HRCalendarPageSlice = createSlice({
    name: "HRCalendarPage",
    initialState: {
        data: null,
        isLoading: false,
        fetchData: false,
        success: {
            status: false,
            message: null,
            content: null
        },
        error: {
            status: false,
            message: null,
            content: null
        }
    },
    extraReducers: (builder) => {
        HRCalendarPageAsyncReducer(builder, HandleGetHRCalendarEvents);
        HRCalendarPageAsyncReducer(builder, HandlePostHRCalendarEvent);
        HRCalendarPageAsyncReducer(builder, HandlePatchHRCalendarEvent);
        HRCalendarPageAsyncReducer(builder, HandleDeleteHRCalendarEvent);
    }
})

export default HRCalendarPageSlice.reducer
