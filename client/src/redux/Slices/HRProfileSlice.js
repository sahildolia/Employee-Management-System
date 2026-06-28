import { createSlice } from "@reduxjs/toolkit";
import { HandleGetHRProfile, HandlePatchHRProfile } from "../Thunks/HRProfileThunk";

const HRProfileSlice = createSlice({
    name: "HRProfile",
    initialState: {
        profile: null,
        isLoading: false,
        success: { status: false, message: null, content: null },
        error: { status: false, message: null, content: null }
    },
    extraReducers: (builder) => {
        builder
            .addCase(HandleGetHRProfile.pending, (state) => {
                state.isLoading = true;
                state.error.content = null;
            })
            .addCase(HandleGetHRProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error.status = false;
                state.error.message = null;
                state.error.content = null;
                state.profile = action.payload.data;
            })
            .addCase(HandleGetHRProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error.status = true;
                state.error.message = action.payload?.message;
                state.error.content = action.payload;
            })
            .addCase(HandlePatchHRProfile.pending, (state) => {
                state.isLoading = true;
                state.error.content = null;
            })
            .addCase(HandlePatchHRProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error.status = false;
                state.error.message = null;
                state.error.content = null;
                state.success.status = action.payload.success;
                state.success.message = action.payload.message;
                state.success.content = action.payload;
            })
            .addCase(HandlePatchHRProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error.status = true;
                state.error.message = action.payload?.message;
                state.error.content = action.payload;
            })
    }
})

export default HRProfileSlice.reducer
