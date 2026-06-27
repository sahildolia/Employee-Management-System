import { ListWrapper, HeadingBar, ListContainer } from "../../../components/common/Dashboard/ListDesigns"
import { ApplicantListItems } from "../../../components/common/Dashboard/ApplicantListItems"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetHRApplicants } from "../../../redux/Thunks/HRApplicantPageThunk.js"
import { Loading } from "../../../components/common/loading.jsx"
import { CreateApplicantDialogBox } from "../../../components/common/Dashboard/applicantdialogboxes.jsx"
import { Users, UserCheck, UserX, UserPlus } from "lucide-react"
import { useSearchParams } from "react-router-dom"

export const HRApplicantPage = () => {
    const dispatch = useDispatch()
    const HRApplicantState = useSelector((state) => state.HRApplicantPageReducer)
    const [searchParams] = useSearchParams()
    const recruitmentID = searchParams.get("recruitmentID")
    const table_headings = ["Full Name", "Email", "Contact", "Applied Role", "Status", "Actions"]

    useEffect(() => {
        if (HRApplicantState.fetchData) {
            dispatch(HandleGetHRApplicants({ apiroute: "GETALL" }))
        }
    }, [HRApplicantState.fetchData])

    useEffect(() => {
        dispatch(HandleGetHRApplicants({ apiroute: "GETALL" }))
    }, [])

    const stats = useMemo(() => {
        const applicants = HRApplicantState.data || []
        return [
            { title: "Total", value: applicants.length, color: "bg-blue-50", text: "text-blue-600", icon: Users },
            { title: "Interview", value: applicants.filter((a) => a.recruitmentstatus === "Conduct-Interview").length, color: "bg-amber-50", text: "text-amber-600", icon: UserPlus },
            { title: "Completed", value: applicants.filter((a) => a.recruitmentstatus === "Interview Completed").length, color: "bg-green-50", text: "text-green-600", icon: UserCheck },
            { title: "Rejected", value: applicants.filter((a) => a.recruitmentstatus === "Rejected").length, color: "bg-red-50", text: "text-red-600", icon: UserX },
        ]
    }, [HRApplicantState.data])

    if (HRApplicantState.isLoading) {
        return <Loading />
    }

    return (
        <div className="applicant-page-content w-full flex flex-col gap-5 min-h-0 flex-1 p-2 md:p-4">
            <div className="applicant-heading flex justify-between items-center md:pe-5">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Applicant Management</h1>
                <div className="applicant-create-button">
                    <CreateApplicantDialogBox recruitmentID={recruitmentID} />
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

            <div className="applicant-data flex flex-col gap-4 md:pe-5 overflow-auto min-h-0 flex-1">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-6"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    <ApplicantListItems TargetedState={HRApplicantState} />
                </ListContainer>
            </div>
        </div>
    )
}
