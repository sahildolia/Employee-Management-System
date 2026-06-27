import { createSlice } from "@reduxjs/toolkit";
import { HandleGetHRRecruitment, HandlePostHRRecruitment, HandlePatchHRRecruitment, HandleDeleteHRRecruitment } from "../Thunks/HRRecruitmentPageThunk";
import { HRRecruitmentPageAsyncReducer } from "../AsyncReducers/asyncreducer";

const HRRecruitmentPageSlice = createSlice({
    name: "HRRecruitmentPage",
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
        HRRecruitmentPageAsyncReducer(builder, HandleGetHRRecruitment);
        HRRecruitmentPageAsyncReducer(builder, HandlePostHRRecruitment);
        HRRecruitmentPageAsyncReducer(builder, HandlePatchHRRecruitment);
        HRRecruitmentPageAsyncReducer(builder, HandleDeleteHRRecruitment);
    }
})

export default HRRecruitmentPageSlice.reducer
