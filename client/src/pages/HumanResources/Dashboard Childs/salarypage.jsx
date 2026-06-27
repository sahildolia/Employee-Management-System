import { ListWrapper, HeadingBar, ListContainer } from "../../../components/common/Dashboard/ListDesigns"
import { SalaryListItems } from "../../../components/common/Dashboard/SalaryListItems"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetHRSalary } from "../../../redux/Thunks/HRSalaryPageThunk.js"
import { Loading } from "../../../components/common/loading.jsx"
import { CreateSalaryDialogBox } from "../../../components/common/Dashboard/salarydialogboxes.jsx"

export const HRSalaryPage = () => {
    const dispatch = useDispatch()
    const HRSalaryState = useSelector((state) => state.HRSalaryPageReducer)
    const table_headings = ["Employee Name", "Net Pay", "Due Date", "Status", "Actions"]

    useEffect(() => {
        if (HRSalaryState.fetchData) {
            dispatch(HandleGetHRSalary({ apiroute: "GETALL" }))
        }
    }, [HRSalaryState.fetchData])

    useEffect(() => {
        dispatch(HandleGetHRSalary({ apiroute: "GETALL" }))
    }, [])

    if (HRSalaryState.isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="salary-page-content w-full flex flex-col gap-5 min-h-0 flex-1 p-2 md:p-4">
            <div className="salary-heading flex justify-between items-center md:pe-5">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Salaries</h1>
                <div className="salary-create-button">
                    <CreateSalaryDialogBox />
                </div>
            </div>
            <div className="salary-data flex flex-col gap-4 md:pe-5 overflow-auto min-h-0 flex-1">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-5"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    <SalaryListItems TargetedState={HRSalaryState} />
                </ListContainer>
            </div>
        </div>
    )
}
