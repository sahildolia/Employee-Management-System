import { ViewInterviewDialogBox, UpdateInterviewDialogBox, DeleteInterviewDialogBox } from "./interviewdialogboxes.jsx"

export const InterviewListItems = ({ TargetedState }) => {
    return (
        <>
            {TargetedState.data && TargetedState.data.length > 0 ? TargetedState.data.map((item) => (
                <div key={item._id} className="list-item-container grid min-[250px]:grid-cols-2 sm:grid-cols-5 py-1 gap-2 justify-center items-center border-b-2 border-blue-800">
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-start overflow-hidden text-ellipsis">
                        {item.applicant ? `${item.applicant.firstname} ${item.applicant.lastname}` : "N/A"}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                        {item.interviewdate ? new Date(item.interviewdate).toLocaleDateString() : "N/A"}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                        {item.interviewer ? `${item.interviewer.firstname} ${item.interviewer.lastname}` : "N/A"}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold text-white ${item.status === "Completed" ? "bg-green-700" : item.status === "Scheduled" ? "bg-blue-700" : "bg-red-700"}`}>
                            {item.status || "Scheduled"}
                        </span>
                    </div>
                    <div className="heading-content text-blue-800 font-bold min-[250px]:text-xs xl:text-lg p-2 rounded-lg text-center flex justify-center items-center min-[250px]:gap-1 xl:gap-2">
                        <ViewInterviewDialogBox interviewData={item} />
                        <UpdateInterviewDialogBox interviewData={item} />
                        <DeleteInterviewDialogBox interviewID={item._id} />
                    </div>
                </div>
            )) : (
                <div className="text-center py-8 text-gray-500 font-bold">No interviews found.</div>
            )}
        </>
    )
}
