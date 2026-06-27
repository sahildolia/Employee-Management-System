import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    HandleGetMyProfile, HandleGetMyAttendance, HandleGetMyLeaves,
    HandleGetMySalary, HandleGetMyNotices, HandleGetMyRequests
} from "../../redux/Thunks/EmployeeDashboardThunk"
import { Loading } from "../../components/common/loading.jsx"
import { CalendarClock, CheckCircle2, DollarSign, Clock3, Bell, CalendarDays } from "lucide-react"

export const EmployeeDashboard = () => {
    const dispatch = useDispatch()
    const state = useSelector((s) => s.EmployeeDashboardReducer)

    useEffect(() => {
        dispatch(HandleGetMyProfile({ apiroute: "MY_PROFILE" }))
        dispatch(HandleGetMyAttendance({ apiroute: "MY_ATTENDANCE" }))
        dispatch(HandleGetMyLeaves({ apiroute: "MY_LEAVES" }))
        dispatch(HandleGetMySalary({ apiroute: "MY_SALARY" }))
        dispatch(HandleGetMyNotices({ apiroute: "MY_NOTICES" }))
        dispatch(HandleGetMyRequests({ apiroute: "MY_REQUESTS" }))
    }, [])

    const profile = state.profile
    const leaves = state.leaves || []
    const salary = state.salary || []
    const attendance = state.attendance
    const noticesData = state.notices
    const requests = state.requests || []

    const pendingLeaves = leaves.filter((l) => l.status === "Pending").length
    const approvedLeaves = leaves.filter((l) => l.status === "Approved").length

    const todayStatus = useMemo(() => {
        if (!attendance) return "N/A"
        const today = new Date().toISOString().split("T")[0]
        const logs = attendance.attendancelog || []
        const todayRecord = logs.find((r) => {
            const d = r.logdate ? new Date(r.logdate).toISOString().split("T")[0] : ""
            return d === today
        })
        return todayRecord ? todayRecord.logstatus : "Not Marked"
    }, [attendance])

    const allNotices = useMemo(() => {
        if (!noticesData) return []
        const arr = Array.isArray(noticesData) ? noticesData : [noticesData]
        const mapped = arr.map((n) => ({ ...n, targetType: n.audience === "Department-Specific" ? "Department" : "Employee" }))
        mapped.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        return mapped.slice(0, 5)
    }, [noticesData])

    if (state.isLoading && !state.profile) {
        return <Loading />
    }

    const statCards = [
        { title: "Pending Leaves", value: pendingLeaves, color: "bg-amber-50", text: "text-amber-600", icon: Clock3 },
        { title: "Approved Leaves", value: approvedLeaves, color: "bg-green-50", text: "text-green-600", icon: CheckCircle2 },
        { title: "Total Salary Records", value: salary.length, color: "bg-blue-50", text: "text-blue-600", icon: DollarSign },
        { title: "Today's Attendance", value: todayStatus, color: "bg-purple-50", text: "text-purple-600", icon: CalendarClock },
    ]

    return (
        <div className="w-full flex flex-col gap-5 min-h-0 flex-1 p-2 md:p-4">
            <div className="flex justify-between items-center md:pe-5">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">
                    Welcome, {profile?.firstname || "Employee"}!
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:pe-5">
                {statCards.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <div key={stat.title} className={`${stat.color} rounded-2xl border border-slate-200 p-4 flex justify-between items-center shadow-sm`}>
                            <div>
                                <p className="text-slate-500 text-xs sm:text-sm">{stat.title}</p>
                                <h2 className="text-2xl sm:text-3xl font-bold mt-1">{stat.value}</h2>
                            </div>
                            <div className={stat.text}>
                                <Icon size={24} />
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:pe-5 flex-1 min-h-0">
                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm overflow-auto">
                    <div className="flex items-center gap-2 mb-4">
                        <Bell size={20} className="text-blue-600" />
                        <h2 className="text-lg font-bold">Recent Notices</h2>
                    </div>
                    {allNotices.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {allNotices.map((notice) => (
                                <div key={notice._id} className="border-b border-slate-100 pb-2 last:border-0">
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-sm truncate">{notice.title}</p>
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold text-white ${notice.audience === "Department-Specific" ? "bg-purple-700" : "bg-orange-700"}`}>
                                            {notice.targetType}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate">{notice.content}</p>
                                    <p className="text-xs text-slate-400 mt-1">
                                        {notice.createdby ? `${notice.createdby.firstname} ${notice.createdby.lastname}` : "System"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-500 text-sm">No notices available.</p>
                    )}
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm overflow-auto">
                    <div className="flex items-center gap-2 mb-4">
                        <CalendarDays size={20} className="text-blue-600" />
                        <h2 className="text-lg font-bold">Upcoming Requests / Events</h2>
                    </div>
                    {requests.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {requests.slice(0, 5).map((req) => (
                                <div key={req._id} className="border-b border-slate-100 pb-2 last:border-0">
                                    <p className="font-semibold text-sm">{req.requesttitle || req.title || "Request"}</p>
                                    <p className="text-xs text-slate-500">
                                        {req.createdAt ? `Submitted: ${new Date(req.createdAt).toLocaleDateString()}` : ""}
                                    </p>
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold text-white ${req.status === "Approved" ? "bg-green-700" : req.status === "Denied" ? "bg-red-700" : "bg-amber-700"}`}>
                                        {req.status || "Pending"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-500 text-sm">No upcoming events or requests.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
