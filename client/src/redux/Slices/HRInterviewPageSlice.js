import { createSlice } from "@reduxjs/toolkit";
import { HandleGetHRInterviews, HandlePostHRInterview, HandlePatchHRInterview, HandleDeleteHRInterview } from "../Thunks/HRInterviewPageThunk";
import { HRInterviewPageAsyncReducer } from "../AsyncReducers/asyncreducer";

const HRInterviewPageSlice = createSlice({
    name: "HRInterviewPage",
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
        HRInterviewPageAsyncReducer(builder, HandleGetHRInterviews);
        HRInterviewPageAsyncReducer(builder, HandlePostHRInterview);
        HRInterviewPageAsyncReducer(builder, HandlePatchHRInterview);
        HRInterviewPageAsyncReducer(builder, HandleDeleteHRInterview);
    }
})

export default HRInterviewPageSlice.reducer
