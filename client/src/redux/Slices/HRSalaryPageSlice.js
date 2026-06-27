import { createSlice } from "@reduxjs/toolkit";
import { HandleGetHRSalary, HandlePostHRSalary, HandlePatchHRSalary, HandleDeleteHRSalary } from "../Thunks/HRSalaryPageThunk";
import { HRSalaryPageAsyncReducer } from "../AsyncReducers/asyncreducer";

const HRSalaryPageSlice = createSlice({
    name: "HRSalaryPage",
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
        HRSalaryPageAsyncReducer(builder, HandleGetHRSalary);
        HRSalaryPageAsyncReducer(builder, HandlePostHRSalary);
        HRSalaryPageAsyncReducer(builder, HandlePatchHRSalary);
        HRSalaryPageAsyncReducer(builder, HandleDeleteHRSalary);
    }
})

export default HRSalaryPageSlice.reducer
