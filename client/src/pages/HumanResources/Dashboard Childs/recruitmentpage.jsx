import { ListWrapper, HeadingBar, ListContainer } from "../../../components/common/Dashboard/ListDesigns"
import { RecruitmentListItems } from "../../../components/common/Dashboard/RecruitmentListItems"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetHRRecruitment } from "../../../redux/Thunks/HRRecruitmentPageThunk.js"
import { Loading } from "../../../components/common/loading.jsx"
import { CreateRecruitmentDialogBox } from "../../../components/common/Dashboard/recruitmentdialogboxes.jsx"
import { Briefcase, Users, FileText, Building2 } from "lucide-react"

export const HRRecruitmentPage = () => {
    const dispatch = useDispatch()
    const HRRecruitmentState = useSelector((state) => state.HRRecruitmentPageReducer)
    const table_headings = ["Job Title", "Department", "Description", "Applicants", "Applicants List", "Actions"]

    useEffect(() => {
        if (HRRecruitmentState.fetchData) {
            dispatch(HandleGetHRRecruitment({ apiroute: "GETALL" }))
        }
    }, [HRRecruitmentState.fetchData])

    useEffect(() => {
        dispatch(HandleGetHRRecruitment({ apiroute: "GETALL" }))
    }, [])

    const stats = useMemo(() => {
        const recruitments = HRRecruitmentState.data || []
        const totalApplicants = recruitments.reduce((sum, r) => sum + (r.applicants?.length || 0), 0)
        return [
            { title: "Total Jobs", value: recruitments.length, color: "bg-blue-50", text: "text-blue-600", icon: Briefcase },
            { title: "Total Applicants", value: totalApplicants, color: "bg-green-50", text: "text-green-600", icon: Users },
            { title: "Active Jobs", value: recruitments.filter((r) => r.status !== "Closed").length, color: "bg-amber-50", text: "text-amber-600", icon: FileText },
            { title: "Departments", value: new Set(recruitments.map((r) => r.department?._id)).size, color: "bg-purple-50", text: "text-purple-600", icon: Building2 },
        ]
    }, [HRRecruitmentState.data])

    if (HRRecruitmentState.isLoading) {
        return <Loading />
    }

    return (
        <div className="recruitment-page-content w-full flex flex-col gap-5 min-h-0 flex-1 p-2 md:p-4">
            <div className="recruitment-heading flex justify-between items-center md:pe-5">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Recruitment Management</h1>
                <div className="recruitment-create-button">
                    <CreateRecruitmentDialogBox />
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

            <div className="recruitment-data flex flex-col gap-4 md:pe-5 overflow-auto min-h-0 flex-1">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-6"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    <RecruitmentListItems TargetedState={HRRecruitmentState} />
                </ListContainer>
            </div>
        </div>
    )
}
