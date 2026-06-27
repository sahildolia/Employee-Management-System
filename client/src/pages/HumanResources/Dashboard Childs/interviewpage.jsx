import { ListWrapper, HeadingBar, ListContainer } from "../../../components/common/Dashboard/ListDesigns"
import { InterviewListItems } from "../../../components/common/Dashboard/InterviewListItems"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetHRInterviews } from "../../../redux/Thunks/HRInterviewPageThunk.js"
import { Loading } from "../../../components/common/loading.jsx"
import { CreateInterviewDialogBox } from "../../../components/common/Dashboard/interviewdialogboxes.jsx"
import { CalendarCheck, Clock, CheckCircle, XCircle } from "lucide-react"

export const HRInterviewPage = () => {
    const dispatch = useDispatch()
    const HRInterviewState = useSelector((state) => state.HRInterviewPageReducer)
    const table_headings = ["Applicant", "Interview Date", "Interviewer", "Status", "Actions"]

    useEffect(() => {
        if (HRInterviewState.fetchData) {
            dispatch(HandleGetHRInterviews({ apiroute: "GETALL" }))
        }
    }, [HRInterviewState.fetchData])

    useEffect(() => {
        dispatch(HandleGetHRInterviews({ apiroute: "GETALL" }))
    }, [])

    const stats = useMemo(() => {
        const interviews = HRInterviewState.data || []
        return [
            { title: "Scheduled", value: interviews.filter((i) => i.status === "Scheduled").length, color: "bg-blue-50", text: "text-blue-600", icon: CalendarCheck },
            { title: "Completed", value: interviews.filter((i) => i.status === "Completed").length, color: "bg-green-50", text: "text-green-600", icon: CheckCircle },
            { title: "Cancelled", value: interviews.filter((i) => i.status === "Cancelled").length, color: "bg-red-50", text: "text-red-600", icon: XCircle },
            { title: "Total", value: interviews.length, color: "bg-amber-50", text: "text-amber-600", icon: Clock },
        ]
    }, [HRInterviewState.data])

    if (HRInterviewState.isLoading) {
        return <Loading />
    }

    return (
        <div className="interview-page-content w-full flex flex-col gap-5 min-h-0 flex-1 p-2 md:p-4">
            <div className="interview-heading flex justify-between items-center md:pe-5">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Interview Insights</h1>
                <div className="interview-create-button">
                    <CreateInterviewDialogBox />
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

            <div className="interview-data flex flex-col gap-4 md:pe-5 overflow-auto min-h-0 flex-1">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-5"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    <InterviewListItems TargetedState={HRInterviewState} />
                </ListContainer>
            </div>
        </div>
    )
}
