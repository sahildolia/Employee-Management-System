import { createSlice } from "@reduxjs/toolkit";
import { HandleGetHRLeaves, HandlePostHRLeaves, HandlePatchHRLeaves, HandleDeleteHRLeaves } from "../Thunks/HRLeavePageThunk";
import { HRLeavePageAsyncReducer } from "../AsyncReducers/asyncreducer";

const HRLeavePageSlice = createSlice({
    name: "HRLeavePage",
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
        HRLeavePageAsyncReducer(builder, HandleGetHRLeaves);
        HRLeavePageAsyncReducer(builder, HandlePostHRLeaves);
        HRLeavePageAsyncReducer(builder, HandlePatchHRLeaves);
        HRLeavePageAsyncReducer(builder, HandleDeleteHRLeaves);
    }
})

export default HRLeavePageSlice.reducer
