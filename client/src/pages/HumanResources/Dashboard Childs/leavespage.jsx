import { ListWrapper, HeadingBar, ListContainer } from "../../../components/common/Dashboard/ListDesigns"
import { LeaveListItems } from "../../../components/common/Dashboard/LeaveListItems"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetHRLeaves } from "../../../redux/Thunks/HRLeavePageThunk.js"
import { Loading } from "../../../components/common/loading.jsx"
import { CreateLeaveDialogBox } from "../../../components/common/Dashboard/leavedialogboxes.jsx"
import { Clock, CheckCircle, XCircle, CalendarRange } from "lucide-react"

export const HRLeavePage = () => {
    const dispatch = useDispatch()
    const HRLeaveState = useSelector((state) => state.HRLeavePageReducer)
    const table_headings = ["Employee", "Title", "Duration", "Date Range", "Status", "Actions"]

    useEffect(() => {
        if (HRLeaveState.fetchData) {
            dispatch(HandleGetHRLeaves({ apiroute: "GETALL" }))
        }
    }, [HRLeaveState.fetchData])

    useEffect(() => {
        dispatch(HandleGetHRLeaves({ apiroute: "GETALL" }))
    }, [])

    const stats = useMemo(() => {
        const leaves = HRLeaveState.data || []
        return [
            { title: "Pending", value: leaves.filter((l) => l.status === "Pending").length, color: "bg-amber-50", text: "text-amber-600", icon: Clock },
            { title: "Approved", value: leaves.filter((l) => l.status === "Approved").length, color: "bg-green-50", text: "text-green-600", icon: CheckCircle },
            { title: "Rejected", value: leaves.filter((l) => l.status === "Rejected").length, color: "bg-red-50", text: "text-red-600", icon: XCircle },
            { title: "Total", value: leaves.length, color: "bg-blue-50", text: "text-blue-600", icon: CalendarRange },
        ]
    }, [HRLeaveState.data])

    if (HRLeaveState.isLoading) {
        return <Loading />
    }

    return (
        <div className="leave-page-content w-full flex flex-col gap-5 min-h-0 flex-1 p-2 md:p-4">
            <div className="leave-heading flex justify-between items-center md:pe-5">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Leave Management</h1>
                <div className="leave-create-button">
                    <CreateLeaveDialogBox />
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

            <div className="leave-data flex flex-col gap-4 md:pe-5 overflow-auto min-h-0 flex-1">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-6"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    <LeaveListItems TargetedState={HRLeaveState} />
                </ListContainer>
            </div>
        </div>
    )
}
