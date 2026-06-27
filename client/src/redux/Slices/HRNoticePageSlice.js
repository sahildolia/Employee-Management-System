import { createSlice } from "@reduxjs/toolkit";
import { HandleGetHRNotices, HandlePostHRNotices, HandlePatchHRNotices, HandleDeleteHRNotices } from "../Thunks/HRNoticePageThunk";
import { HRNoticePageAsyncReducer } from "../AsyncReducers/asyncreducer";

const HRNoticePageSlice = createSlice({
    name: "HRNoticePage",
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
        HRNoticePageAsyncReducer(builder, HandleGetHRNotices);
        HRNoticePageAsyncReducer(builder, HandlePostHRNotices);
        HRNoticePageAsyncReducer(builder, HandlePatchHRNotices);
        HRNoticePageAsyncReducer(builder, HandleDeleteHRNotices);
    }
})

export default HRNoticePageSlice.reducer
