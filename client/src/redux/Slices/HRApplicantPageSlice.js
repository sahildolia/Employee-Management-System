import { createSlice } from "@reduxjs/toolkit";
import { HandleGetHRApplicants, HandlePostHRApplicant, HandlePatchHRApplicant, HandleDeleteHRApplicant } from "../Thunks/HRApplicantPageThunk";
import { HRApplicantPageAsyncReducer } from "../AsyncReducers/asyncreducer";

const HRApplicantPageSlice = createSlice({
    name: "HRApplicantPage",
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
        HRApplicantPageAsyncReducer(builder, HandleGetHRApplicants);
        HRApplicantPageAsyncReducer(builder, HandlePostHRApplicant);
        HRApplicantPageAsyncReducer(builder, HandlePatchHRApplicant);
        HRApplicantPageAsyncReducer(builder, HandleDeleteHRApplicant);
    }
})

export default HRApplicantPageSlice.reducer
