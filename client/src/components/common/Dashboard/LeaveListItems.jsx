import {
  ViewLeaveDialogBox,
  ApproveRejectLeaveDialogBox,
  DeleteLeaveDialogBox,
} from "./leavedialogboxes.jsx";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";
const calcDays = (start, end) => {
  const s = new Date(start);
  const e = new Date(end);
  return Math.max(1, Math.ceil((e - s) / (1000 * 60 * 60 * 24)) + 1);
};

export const LeaveListItems = ({ TargetedState }) => {
  return (
    <>
      {TargetedState.data && TargetedState.data.length > 0 ? (
        TargetedState.data.map((item) => (
          <div
            key={item._id}
            className="list-item-container grid min-[250px]:grid-cols-2 sm:grid-cols-6 py-1 gap-2 justify-center items-center border-b-2 border-blue-800"
          >
            <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-start overflow-hidden text-ellipsis">
              {item.employee
                ? `${item.employee.firstname} ${item.employee.lastname}`
                : "N/A"}
            </div>
            <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
              {item.title}
            </div>
            <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
              {calcDays(item.startdate, item.enddate)} days
            </div>
            <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
              {item.startdate
                ? `${new Date(item.startdate).toLocaleDateString()} - ${new Date(item.enddate).toLocaleDateString()}`
                : "N/A"}
            </div>
            <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
              <span
                className={`px-2 py-1 rounded-lg text-xs font-bold text-white ${item.status === "Approved" ? "bg-green-700" : item.status === "Rejected" ? "bg-red-700" : "bg-amber-700"}`}
              >
                {item.status}
              </span>
            </div>
            <div className="heading-content text-blue-800 font-bold min-[250px]:text-xs xl:text-lg p-2 rounded-lg text-center flex justify-center items-center min-[250px]:gap-1 xl:gap-2">
              {/* <ViewLeaveDialogBox leaveData={item} />
                        {item.status === "Pending" && <ApproveRejectLeaveDialogBox leaveData={item} />}
                        <DeleteLeaveDialogBox leaveID={item._id} /> */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="
                h-9
                w-9
                flex
                items-center
                justify-center
                rounded-lg
                border
                border-slate-300
                hover:bg-slate-100
                transition
            "
                  >
                    <MoreVertical size={18} />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <ViewLeaveDialogBox leaveData={item}>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      👁 View
                    </DropdownMenuItem>
                  </ViewLeaveDialogBox>
                  {/* <UpdateNoticeDialogBox noticeData={item}>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    {item.status === "Pending" && <ApproveRejectLeaveDialogBox leaveData={item} />}
                    </DropdownMenuItem>
                  </UpdateNoticeDialogBox> */}
                    {item.status === "Pending" && (
        <ApproveRejectLeaveDialogBox leaveData={item}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                ✅ Update Status
            </DropdownMenuItem>
        </ApproveRejectLeaveDialogBox>
    )}
                  <DeleteLeaveDialogBox leaveID={item._id} >
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      className="text-red-600"
                    >
                      🗑 Delete
                    </DropdownMenuItem>
                  </DeleteLeaveDialogBox>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500 font-bold">
          No leave records found.
        </div>
      )}
    </>
  );
};
