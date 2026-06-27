import { ViewAttendanceDialogBox, DeleteAttendanceDialogBox } from "./attendancedialogboxes.jsx"

export const AttendanceListItems = ({ TargetedState }) => {
    return (
        <>
            {TargetedState.data && TargetedState.data.length > 0 ? TargetedState.data.map((item) => (
                <div key={item._id} className="list-item-container grid min-[250px]:grid-cols-2 sm:grid-cols-4 py-1 gap-2 justify-center items-center border-b-2 border-blue-800">
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-start overflow-hidden text-ellipsis">
                        {item.employee ? `${item.employee.firstname} ${item.employee.lastname}` : "N/A"}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold text-white ${item.currentstatus === "Present" ? "bg-green-700" : item.currentstatus === "Absent" ? "bg-red-700" : "bg-amber-700"}`}>
                            {item.currentstatus || "N/A"}
                        </span>
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                        {item.todaylog || "Not logged"}
                    </div>
                    <div className="heading-content text-blue-800 font-bold min-[250px]:text-xs xl:text-lg p-2 rounded-lg text-center flex justify-center items-center min-[250px]:gap-1 xl:gap-2">
                        <ViewAttendanceDialogBox attendanceData={item} />
                        <DeleteAttendanceDialogBox attendanceID={item._id} />
                    </div>
                </div>
            )) : (
                <div className="text-center py-8 text-gray-500 font-bold">No attendance records found.</div>
            )}
        </>
    )
}
