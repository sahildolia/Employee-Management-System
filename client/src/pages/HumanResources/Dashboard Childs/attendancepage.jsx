import { ListWrapper, HeadingBar, ListContainer } from "../../../components/common/Dashboard/ListDesigns"
import { AttendanceListItems } from "../../../components/common/Dashboard/AttendanceListItems"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetHRAttendance } from "../../../redux/Thunks/HRAttendancePageThunk.js"
import { Loading } from "../../../components/common/loading.jsx"
import { CreateAttendanceDialogBox } from "../../../components/common/Dashboard/attendancedialogboxes.jsx"
import { Clock, CheckCircle, XCircle, CalendarDays } from "lucide-react"
import { useMemo } from "react"

export const HRAttendancePage = () => {
    const dispatch = useDispatch()
    const HRAttendanceState = useSelector((state) => state.HRAttendancePageReducer)
    const table_headings = ["Employee Name", "Current Status", "Today's Log", "Actions"]

    useEffect(() => {
        if (HRAttendanceState.fetchData) {
            dispatch(HandleGetHRAttendance({ apiroute: "all" }))
        }
    }, [HRAttendanceState.fetchData])

    useEffect(() => {
        dispatch(HandleGetHRAttendance({ apiroute: "all" }))
    }, [])

    const stats = useMemo(() => {
        const records = HRAttendanceState.data || []
        return [
            { title: "Present", value: records.filter((r) => r.currentstatus === "Present").length, color: "bg-green-50", text: "text-green-600", icon: CheckCircle },
            { title: "Absent", value: records.filter((r) => r.currentstatus === "Absent").length, color: "bg-red-50", text: "text-red-600", icon: XCircle },
            { title: "On Leave", value: records.filter((r) => r.currentstatus === "On Leave").length, color: "bg-amber-50", text: "text-amber-600", icon: Clock },
            { title: "Total", value: records.length, color: "bg-blue-50", text: "text-blue-600", icon: CalendarDays },
        ]
    }, [HRAttendanceState.data])

    if (HRAttendanceState.isLoading) {
        return <Loading />
    }

    return (
        <div className="attendance-page-content w-full flex flex-col gap-5 min-h-0 flex-1 p-2 md:p-4">
            <div className="attendance-heading flex justify-between items-center md:pe-5">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Attendance Management</h1>
                <div className="attendance-create-button">
                    <CreateAttendanceDialogBox />
                </div>
            </div>

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:pe-5">
                {stats.map((stat) => {
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

            <div className="attendance-data flex flex-col gap-4 md:pe-5 overflow-auto min-h-0 flex-1">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-4"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    <AttendanceListItems TargetedState={HRAttendanceState} />
                </ListContainer>
            </div>
        </div>
    )
}
