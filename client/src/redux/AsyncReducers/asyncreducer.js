export const AsyncReducer = (builder, thunk) => {
    builder
        .addCase(thunk.pending, (state) => {
            state.isLoading = true;
            state.error.content = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error.status = false;
            state.data = action.payload;
            if (action.payload.resetpassword) {
                state.isAuthenticated = false;
                state.isResetPasswords = action.payload.success
            }
            else {
                state.isAuthenticated = action.payload.success;
            }
        })
        .addCase(thunk.rejected, (state, action) => {
            if (action.payload.gologin) {
                state.isLoading = false;
                state.error.status = false;
                state.error.message = action.payload.message
                state.error.content = action.payload
            }
            else {
                state.isLoading = false;
                state.error.status = true;
                state.error.message = action.payload.message
                state.error.content = action.payload
            }
        });
};

export const HRAsyncReducer = (builder, thunk) => {
    builder
        .addCase(thunk.pending, (state) => {
            state.isLoading = true;
            state.error.content = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
            if (action.payload.type == "signup") {
                state.isSignUp = true
                state.isLoading = false;
                state.isAuthenticated = true
                state.isAuthourized = true
                state.isVerifiedEmailAvailable = true
                state.error.status = false;
                state.data = action.payload;
            }
            if ((action.payload.type == "checkHR") || (action.payload.type == "HRLogin") || (action.payload.type == "HRforgotpassword")) {
                state.isSignUp = true
                state.isLoading = false;
                state.isAuthenticated = true
                state.isAuthourized = true
                state.error.status = false;
                state.data = action.payload;
            }
            if (action.payload.type == "HRverifyemail") {
                state.isSignUp = true
                state.isLoading = false;
                state.isAuthenticated = true
                state.isAuthourized = true
                state.isVerifiedEmailAvailable = false
                state.isVerified = true
                state.error.status = false;
                state.data = action.payload;
            }
            if (action.payload.type == "HRcodeavailable") {
                state.isSignUp = true
                state.isLoading = false;
                state.isAuthenticated = true
                if (action.payload.alreadyverified) {
                    state.isVerified = true
                }
                else {
                    state.isVerified = false
                }
                state.isVerifiedEmailAvailable = true
                state.error.status = false;
                state.data = action.payload;
            }
            if (action.payload.resetpassword) {
                state.isSignUp = true
                state.isLoading = false;
                state.isAuthenticated = false;
                state.isResetPassword = true
                state.error.status = false;
                state.data = action.payload;
            }
            if (action.payload.type == "HRResendVerifyEmail") {
                state.isSignUp = true
                state.isLoading = false;
                state.isAuthenticated = true
                state.isVerifiedEmailAvailable = true
                state.error.status = false;
                state.data = action.payload;
            }
        })
        .addCase(thunk.rejected, (state, action) => {
            if (action.payload.type == "signup") {
                state.isSignUp = false
                state.isLoading = false;
                state.error.status = true;
                state.error.message = action.payload.message
                state.error.content = action.payload
            }
            if (action.payload.type == "HRcodeavailable") {
                state.isLoading = false;
                state.isVerified = false
                state.isVerifiedEmailAvailable = false
                state.error.status = false;
                state.error.content = action.payload
            }
            if (action.payload.gologin) {
                state.isSignUp = false
                state.isLoading = false;
                state.isAuthenticated = false
                state.error.status = false;
                state.error.message = action.payload.message
                state.error.content = action.payload
            }
            else {
                state.isLoading = false;
                state.error.status = true;
                state.error.message = action.payload.message
                state.error.content = action.payload
            }
        });
}


export const HRDashboardAsyncReducer = (builder, thunk) => {
    builder.addCase(thunk.pending, (state) => {
        state.isLoading = true;
        state.error.content = null;
    })
    builder.addCase(thunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error.status = false;
        state.data = action.payload.data;
        state.success = action.payload.success
    })
    builder.addCase(thunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error.status = true;
        state.error.message = action.payload.message
        state.error.content = action.payload;
    })
}

export const HREmployeesPageAsyncReducer = (builder, thunk) => {
    builder.addCase(thunk.pending, (state) => {
        state.isLoading = true;
        state.error.content = null;
    })
    builder.addCase(thunk.fulfilled, (state, action) => {
        if (action.payload.type === "AllEmployees") {
            state.isLoading = false;
            state.error.status = false;
            state.error.message = null
            state.error.content = null;
            state.data = action.payload.data;
            state.success = action.payload.success
            state.fetchData = false
        }
        else if (action.payload.type === "EmployeeCreate" || action.payload.type === "EmployeeDelete") {
            state.isLoading = false;
            state.error.status = false;
            state.error.message = null
            state.error.content = null;
            state.data = action.payload.data;
            state.success = action.payload.success;
            state.fetchData = true
        }
        else if (action.payload.type === "GetEmployee") {
            state.isLoading = false;
            state.error.status = false;
            state.error.message = null
            state.error.content = null;
            state.employeeData = action.payload.data
        }
    })
    builder.addCase(thunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error.status = true;
        state.error.message = action.payload.message
        state.success = action.payload.success;
        state.error.content = action.payload;
    })
}

export const HRDepartmentPageAsyncReducer = (builder, thunk) => {
    builder.addCase(thunk.pending, (state) => {
        state.isLoading = true;
        state.error.content = null;
    })
    builder.addCase(thunk.fulfilled, (state, action) => {
        if (action.payload.type === "AllDepartments") {
            state.isLoading = false;
            state.error.status = false;
            state.error.message = null
            state.error.content = null;
            state.data = action.payload.data;
            state.fetchData = false
            state.success.status = false
            state.success.message = null
            state.success.content = null
        }
        else if (action.payload.type === "CreateDepartment" || 
            action.payload.type === "DepartmentDelete" || 
            action.payload.type === "DepartmentEMUpdate" || 
            action.payload.type === "RemoveEmployeeDE") 
            {
            state.isLoading = false;
            state.error.status = false;
            state.error.message = null
            state.error.content = null;
            state.success.status = action.payload.success;
            state.success.message = action.payload.message;
            state.success.content = action.payload;
            state.fetchData = true
        }
        else if (action.payload.type === "GetDepartment") {
            state.isLoading = false;
            state.error.status = false;
            state.error.message = null
            state.error.content = null;
            state.departmentData = action.payload.data
        }
    })
    builder.addCase(thunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error.status = true;
        state.error.message = action.payload.message
        state.success = action.payload.success;
        state.error.content = action.payload;
    })
}


export const HRNoticePageAsyncReducer = (builder, thunk) => {
    builder.addCase(thunk.pending, (state) => {
        state.isLoading = true;
        state.error.content = null;
    })
    builder.addCase(thunk.fulfilled, (state, action) => {
        if (action.payload.type === "AllNotices") {
            state.isLoading = false;
            state.error.status = false;
            state.error.message = null
            state.error.content = null;
            state.data = action.payload.data;
            state.fetchData = false
            state.success.status = false
            state.success.message = null
            state.success.content = null
        }
        else if (action.payload.type === "NoticeCreate" ||
            action.payload.type === "NoticeUpdate" ||
            action.payload.type === "NoticeDelete")
        {
            state.isLoading = false;
            state.error.status = false;
            state.error.message = null
            state.error.content = null;
            state.success.status = action.payload.success;
            state.success.message = action.payload.message;
            state.success.content = action.payload;
            state.fetchData = true
        }
    })
    builder.addCase(thunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error.status = true;
        state.error.message = action.payload.message
        state.success = action.payload.success;
        state.error.content = action.payload;
    })
}

export const HRLeavePageAsyncReducer = (builder, thunk) => {
    builder.addCase(thunk.pending, (state) => {
        state.isLoading = true;
        state.error.content = null;
    })
    builder.addCase(thunk.fulfilled, (state, action) => {
        if (action.payload.type === "AllLeaves") {
            state.isLoading = false;
            state.error.status = false;
            state.error.message = null
            state.error.content = null;
            state.data = action.payload.data;
            state.fetchData = false
            state.success.status = false
            state.success.message = null
            state.success.content = null
        }
        else if (action.payload.type === "LeaveCreate" ||
            action.payload.type === "LeaveDelete" ||
            action.payload.type === "LeaveHRUpdate")
        {
            state.isLoading = false;
            state.error.status = false;
            state.error.message = null
            state.error.content = null;
            state.success.status = action.payload.success;
            state.success.message = action.payload.message;
            state.success.content = action.payload;
            state.fetchData = true
        }
    })
    builder.addCase(thunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error.status = true;
        state.error.message = action.payload.message
        state.success = action.payload.success;
        state.error.content = action.payload;
    })
}

export const HRSalaryPageAsyncReducer = (builder, thunk) => {
    builder.addCase(thunk.pending, (state) => {
        state.isLoading = true;
        state.error.content = null;
    })
    builder.addCase(thunk.fulfilled, (state, action) => {
        if (action.payload.type === "AllSalary") {
            state.isLoading = false;
            state.error.status = false;
            state.error.message = null
            state.error.content = null;
            state.data = action.payload.data;
            state.fetchData = false
            state.success.status = false
            state.success.message = null
            state.success.content = null
        }
        else if (action.payload.type === "SalaryCreate" ||
            action.payload.type === "SalaryUpdate" ||
            action.payload.type === "SalaryDelete")
        {
            state.isLoading = false;
            state.error.status = false;
            state.error.message = null
            state.error.content = null;
            state.success.status = action.payload.success;
            state.success.message = action.payload.message;
            state.success.content = action.payload;
            state.fetchData = true
        }
    })
    builder.addCase(thunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error.status = true;
        state.error.message = action.payload.message
        state.success = action.payload.success;
        state.error.content = action.payload;
    })
}

export const EmployeesIDsAsyncReducer = (builder, thunk) => {
    builder.addCase(thunk.pending, (state) => {
        state.isLoading = true;
        state.error.content = null;
    })
    builder.addCase(thunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error.message = null;
        state.error.content = null
        state.error.status = false;
        state.data = action.payload.data;
    })
    builder.addCase(thunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error.status = true;
        state.error.message = action.payload.message
        state.error.content = action.payload
    })
}

export const HRAttendancePageAsyncReducer = (builder, thunk) => {
    builder.addCase(thunk.pending, (state) => {
        state.isLoading = true;
        state.error.content = null;
    })
    builder.addCase(thunk.fulfilled, (state, action) => {
        if (action.payload.type === "AllAttendance") {
            state.isLoading = false;
            state.error.status = false;
            state.error.message = null
            state.error.content = null;
            state.data = action.payload.data;
            state.fetchData = false
            state.success.status = false
            state.success.message = null
            state.success.content = null
        }
        else if (action.payload.type === "AttendanceCreate" ||
            action.payload.type === "AttendanceDelete")
        {
            state.isLoading = false;
            state.error.status = false;
            state.error.message = null
            state.error.content = null;
            state.success.status = action.payload.success;
            state.success.message = action.payload.message;
            state.success.content = action.payload;
            state.fetchData = true
        }
    })
    builder.addCase(thunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error.status = true;
        state.error.message = action.payload.message
        state.success = action.payload.success;
        state.error.content = action.payload;
    })
}

export const HRCalendarPageAsyncReducer = (builder, thunk) => {
    builder.addCase(thunk.pending, (state) => {
        state.isLoading = true;
        state.error.content = null;
    })
    builder.addCase(thunk.fulfilled, (state, action) => {
        if (action.payload.type === "AllEvents") {
            state.isLoading = false;
            state.error.status = false;
            state.error.message = null
            state.error.content = null;
            state.data = action.payload.data;
            state.fetchData = false
            state.success.status = false
            state.success.message = null
            state.success.content = null
        }
        else if (action.payload.type === "EventCreate" ||
            action.payload.type === "EventUpdate" ||
            action.payload.type === "EventDelete")
        {
            state.isLoading = false;
            state.error.status = false;
            state.error.message = null
            state.error.content = null;
            state.success.status = action.payload.success;
            state.success.message = action.payload.message;
            state.success.content = action.payload;
            state.fetchData = true
        }
    })
    builder.addCase(thunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error.status = true;
        state.error.message = action.payload.message
        state.success = action.payload.success;
        state.error.content = action.payload;
    })
}

export const HRRecruitmentPageAsyncReducer = (builder, thunk) => {
    builder.addCase(thunk.pending, (state) => {
        state.isLoading = true;
        state.error.content = null;
    })
    builder.addCase(thunk.fulfilled, (state, action) => {
        if (action.payload.type === "AllRecruitment") {
            state.isLoading = false;
            state.error.status = false;
            state.error.message = null
            state.error.content = null;
            state.data = action.payload.data;
            state.fetchData = false
            state.success.status = false
            state.success.message = null
            state.success.content = null
        }
        else if (action.payload.type === "RecruitmentCreate" ||
            action.payload.type === "RecruitmentUpdate" ||
            action.payload.type === "RecruitmentDelete")
        {
            state.isLoading = false;
            state.error.status = false;
            state.error.message = null
            state.error.content = null;
            state.success.status = action.payload.success;
            state.success.message = action.payload.message;
            state.success.content = action.payload;
            state.fetchData = true
        }
    })
    builder.addCase(thunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error.status = true;
        state.error.message = action.payload.message
        state.success = action.payload.success;
        state.error.content = action.payload;
    })
}

export const HRApplicantPageAsyncReducer = (builder, thunk) => {
    builder.addCase(thunk.pending, (state) => {
        state.isLoading = true;
        state.error.content = null;
    })
    builder.addCase(thunk.fulfilled, (state, action) => {
        if (action.payload.type === "AllApplicants") {
            state.isLoading = false;
            state.error.status = false;
            state.error.message = null
            state.error.content = null;
            state.data = action.payload.data;
            state.fetchData = false
            state.success.status = false
            state.success.message = null
            state.success.content = null
        }
        else if (action.payload.type === "ApplicantCreate" ||
            action.payload.type === "ApplicantUpdate" ||
            action.payload.type === "ApplicantDelete")
        {
            state.isLoading = false;
            state.error.status = false;
            state.error.message = null
            state.error.content = null;
            state.success.status = action.payload.success;
            state.success.message = action.payload.message;
            state.success.content = action.payload;
            state.fetchData = true
        }
    })
    builder.addCase(thunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error.status = true;
        state.error.message = action.payload.message
        state.success = action.payload.success;
        state.error.content = action.payload;
    })
}

export const HRInterviewPageAsyncReducer = (builder, thunk) => {
    builder.addCase(thunk.pending, (state) => {
        state.isLoading = true;
        state.error.content = null;
    })
    builder.addCase(thunk.fulfilled, (state, action) => {
        if (action.payload.type === "AllInterviews") {
            state.isLoading = false;
            state.error.status = false;
            state.error.message = null
            state.error.content = null;
            state.data = action.payload.data;
            state.fetchData = false
            state.success.status = false
            state.success.message = null
            state.success.content = null
        }
        else if (action.payload.type === "InterviewCreate" ||
            action.payload.type === "InterviewUpdate" ||
            action.payload.type === "InterviewDelete")
        {
            state.isLoading = false;
            state.error.status = false;
            state.error.message = null
            state.error.content = null;
            state.success.status = action.payload.success;
            state.success.message = action.payload.message;
            state.success.content = action.payload;
            state.fetchData = true
        }
    })
    builder.addCase(thunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error.status = true;
        state.error.message = action.payload.message
        state.success = action.payload.success;
        state.error.content = action.payload;
    })
}

export const EmployeeDashboardAsyncReducer = (builder, thunk) => {
    builder.addCase(thunk.pending, (state) => {
        state.isLoading = true;
        state.error.content = null;
    })
    builder.addCase(thunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error.message = null;
        state.error.content = null;
        state.error.status = false;
        if (action.payload.type === "MyAttendance") {
            state.attendance = action.payload.data;
        } else if (action.payload.type === "MyLeaves") {
            state.leaves = action.payload.data;
            state.fetchData = false;
            state.success.status = false;
        } else if (action.payload.type === "MySalary") {
            state.salary = action.payload.data;
        } else if (action.payload.type === "MyNotices") {
            state.notices = action.payload.data;
        } else if (action.payload.type === "MyRequests") {
            state.requests = action.payload.data;
        } else if (action.payload.type === "LeaveCreate" || action.payload.type === "LeaveUpdate" || action.payload.type === "LeaveDelete") {
            state.success.status = action.payload.success;
            state.success.message = action.payload.message;
            state.success.content = action.payload;
            state.fetchData = true;
        } else {
            state.profile = action.payload.data;
        }
    })
    builder.addCase(thunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error.status = true;
        state.error.message = action.payload?.message;
        state.error.content = action.payload;
    })
}