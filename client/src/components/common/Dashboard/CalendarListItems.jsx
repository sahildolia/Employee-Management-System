import { ViewEventDialogBox, UpdateEventDialogBox, DeleteEventDialogBox } from "./calendardialogboxes.jsx"

export const CalendarListItems = ({ TargetedState }) => {
    return (
        <>
            {TargetedState.data && TargetedState.data.length > 0 ? TargetedState.data.map((item) => (
                <div key={item._id} className="list-item-container grid min-[250px]:grid-cols-2 sm:grid-cols-5 py-1 gap-2 justify-center items-center border-b-2 border-blue-800">
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-start overflow-hidden text-ellipsis">
                        {item.eventtitle || item.title}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                        {item.eventdate ? new Date(item.eventdate).toLocaleDateString() : "N/A"}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold text-white ${item.audience === "All" ? "bg-green-700" : item.audience === "HR" ? "bg-purple-700" : "bg-orange-700"}`}>
                            {item.audience || "All"}
                        </span>
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                        {item.description ? (item.description.length > 30 ? `${item.description.slice(0, 30)}...` : item.description) : "N/A"}
                    </div>
                    <div className="heading-content text-blue-800 font-bold min-[250px]:text-xs xl:text-lg p-2 rounded-lg text-center flex justify-center items-center min-[250px]:gap-1 xl:gap-2">
                        <ViewEventDialogBox eventData={item} />
                        <UpdateEventDialogBox eventData={item} />
                        <DeleteEventDialogBox eventID={item._id} />
                    </div>
                </div>
            )) : (
                <div className="text-center py-8 text-gray-500 font-bold">No events found.</div>
            )}
        </>
    )
}
