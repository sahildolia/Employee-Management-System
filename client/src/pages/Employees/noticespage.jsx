import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetMyNotices } from "../../redux/Thunks/EmployeeDashboardThunk"
import { Loading } from "../../components/common/loading.jsx"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Bell, Filter, ChevronDown, ChevronUp } from "lucide-react"

const NoticeCard = ({ notice }) => {
    const [expanded, setExpanded] = useState(false)
    const contentPreview = notice.content?.length > 150 ? notice.content.slice(0, 150) + "..." : notice.content

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">{notice.title}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold text-white ${notice.audience === "Department-Specific" ? "bg-purple-700" : "bg-orange-700"}`}>
                            {notice.audience === "Department-Specific" ? "Department" : "Employee"}
                        </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">
                        By: {notice.createdby ? `${notice.createdby.firstname} ${notice.createdby.lastname}` : "System"}
                        &nbsp;|&nbsp;{notice.createdAt ? new Date(notice.createdAt).toLocaleDateString() : ""}
                        &nbsp;|&nbsp;Target: {notice.department ? notice.department.name : notice.employee ? `${notice.employee.firstname} ${notice.employee.lastname}` : "N/A"}
                    </p>
                    <p className="text-sm text-slate-700 whitespace-pre-wrap">{expanded ? notice.content : contentPreview}</p>
                    {notice.content?.length > 150 && (
                        <button className="text-blue-600 text-xs font-semibold mt-1 flex items-center gap-1"
                            onClick={() => setExpanded(!expanded)}>
                            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            {expanded ? "Show Less" : "Show More"}
                        </button>
                    )}
                </div>
                <ViewNoticeFullDialog noticeData={notice} />
            </div>
        </div>
    )
}

const ViewNoticeFullDialog = ({ noticeData }) => {
    return (
        <Dialog>
            <DialogTrigger className="btn-sm border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white text-xs whitespace-nowrap">
                View Full
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[55vw] 2xl:max-w-[45vw]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-blue-800">{noticeData.title}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold text-white ${noticeData.audience === "Department-Specific" ? "bg-purple-700" : "bg-orange-700"}`}>
                            {noticeData.audience}
                        </span>
                        <span className="text-sm font-semibold text-gray-700">
                            Target: {noticeData.department ? noticeData.department.name : noticeData.employee ? `${noticeData.employee.firstname} ${noticeData.employee.lastname}` : "N/A"}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500">
                        Created by: {noticeData.createdby ? `${noticeData.createdby.firstname} ${noticeData.createdby.lastname}` : "System"}
                        &nbsp;|&nbsp;{noticeData.createdAt ? new Date(noticeData.createdAt).toLocaleDateString() : ""}
                    </p>
                    <div className="border-2 border-gray-300 rounded-lg p-4 min-h-[150px]">
                        <p className="text-gray-800 whitespace-pre-wrap">{noticeData.content}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const NoticesPage = () => {
    const dispatch = useDispatch()
    const EmpState = useSelector((s) => s.EmployeeDashboardReducer)
    const [filter, setFilter] = useState("All")

    useEffect(() => {
        dispatch(HandleGetMyNotices({ apiroute: "MY_NOTICES" }))
    }, [])

    const noticesData = EmpState.notices

    const allNotices = useMemo(() => {
        if (!noticesData) return []
        const arr = Array.isArray(noticesData) ? noticesData : [noticesData]
        return [...arr].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }, [noticesData])

    const filteredNotices = useMemo(() => {
        if (filter === "All") return allNotices
        if (filter === "Department-Specific") return allNotices.filter((n) => n.audience === "Department-Specific")
        if (filter === "Employee-Specific") return allNotices.filter((n) => n.audience === "Employee-Specific")
        return allNotices
    }, [allNotices, filter])

    const filters = ["All", "Department-Specific", "Employee-Specific"]

    if (EmpState.isLoading && !EmpState.notices) {
        return <Loading />
    }

    return (
        <div className="w-full flex flex-col gap-5 min-h-0 flex-1 p-2 md:p-4">
            <div className="flex justify-between items-center md:pe-5">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Notices</h1>
                <div className="flex items-center gap-2">
                    <Filter size={18} className="text-slate-500" />
                    <select className="border-2 border-gray-700 rounded-lg px-3 py-1.5 text-sm font-semibold bg-white"
                        value={filter} onChange={(e) => setFilter(e.target.value)}>
                        {filters.map((f) => (
                            <option key={f} value={f}>{f === "All" ? "All Notices" : f === "Department-Specific" ? "Department" : "Employee"}</option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredNotices.length > 0 ? (
                <div className="flex flex-col gap-3 md:pe-5 overflow-auto min-h-0 flex-1">
                    {filteredNotices.map((notice) => (
                        <NoticeCard key={notice._id} notice={notice} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                    <Bell size={48} className="text-slate-300" />
                    <p className="text-xl font-bold text-gray-600">No notices found.</p>
                    <p className="text-sm text-gray-500">There are no notices addressed to you at this time.</p>
                </div>
            )}
        </div>
    )
}
