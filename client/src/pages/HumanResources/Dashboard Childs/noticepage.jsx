import { ListWrapper, HeadingBar, ListContainer } from "../../../components/common/Dashboard/ListDesigns"
import { NoticeListItems } from "../../../components/common/Dashboard/NoticeListItems"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetHRNotices } from "../../../redux/Thunks/HRNoticePageThunk.js"
import { Loading } from "../../../components/common/loading.jsx"
import { CreateNoticeDialogBox } from "../../../components/common/Dashboard/noticedialogboxes.jsx"

export const HRNoticePage = () => {
    const dispatch = useDispatch()
    const HRNoticeState = useSelector((state) => state.HRNoticePageReducer)
    const table_headings = ["Title", "Audience", "Target", "Created By", "Actions"]

    useEffect(() => {
        if (HRNoticeState.fetchData) {
            dispatch(HandleGetHRNotices({ apiroute: "GETALL" }))
        }
    }, [HRNoticeState.fetchData])

    useEffect(() => {
        dispatch(HandleGetHRNotices({ apiroute: "GETALL" }))
    }, [])

    if (HRNoticeState.isLoading) {
        return <Loading />
    }

    return (
        <div className="notice-page-content w-full flex flex-col gap-5 min-h-0 flex-1 p-2 md:p-4">
            <div className="notice-heading flex justify-between items-center md:pe-5">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Notices</h1>
                <div className="notice-create-button">
                    <CreateNoticeDialogBox />
                </div>
            </div>
            <div className="notice-data flex flex-col gap-4 md:pe-5 overflow-auto min-h-0 flex-1">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-5"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    <NoticeListItems TargetedState={HRNoticeState} />
                </ListContainer>
            </div>
        </div>
    )
}
