import { ListWrapper, HeadingBar, ListContainer } from "../../../components/common/Dashboard/ListDesigns"
import { CalendarListItems } from "../../../components/common/Dashboard/CalendarListItems"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetHRCalendarEvents } from "../../../redux/Thunks/HRCalendarPageThunk.js"
import { Loading } from "../../../components/common/loading.jsx"
import { CreateEventDialogBox } from "../../../components/common/Dashboard/calendardialogboxes.jsx"

export const HRCalendarPage = () => {
    const dispatch = useDispatch()
    const HRCalendarState = useSelector((state) => state.HRCalendarPageReducer)
    const table_headings = ["Event Title", "Event Date", "Audience", "Description", "Actions"]

    useEffect(() => {
        if (HRCalendarState.fetchData) {
            dispatch(HandleGetHRCalendarEvents({ apiroute: "GETALL" }))
        }
    }, [HRCalendarState.fetchData])

    useEffect(() => {
        dispatch(HandleGetHRCalendarEvents({ apiroute: "GETALL" }))
    }, [])

    if (HRCalendarState.isLoading) {
        return <Loading />
    }

    return (
        <div className="calendar-page-content w-full flex flex-col gap-5 min-h-0 flex-1 p-2 md:p-4">
            <div className="calendar-heading flex justify-between items-center md:pe-5">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Corporate Calendar</h1>
                <div className="calendar-create-button">
                    <CreateEventDialogBox />
                </div>
            </div>
            <div className="calendar-data flex flex-col gap-4 md:pe-5 overflow-auto min-h-0 flex-1">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-5"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    <CalendarListItems TargetedState={HRCalendarState} />
                </ListContainer>
            </div>
        </div>
    )
}
