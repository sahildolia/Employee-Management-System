import { ViewNoticeDialogBox, UpdateNoticeDialogBox, DeleteNoticeDialogBox } from "./noticedialogboxes.jsx"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";
const flattenNotices = (data) => {
    if (!data) return []
    const deptNotices = (data.department_notices || []).map((n) => ({
        ...n,
        targetName: n.department?.name || "N/A",
    }))
    const empNotices = (data.employee_notices || []).map((n) => ({
        ...n,
        targetName: n.employee ? `${n.employee.firstname} ${n.employee.lastname}` : "N/A",
    }))
    return [...deptNotices, ...empNotices]
}

export const NoticeListItems = ({ TargetedState }) => {
    const allNotices = flattenNotices(TargetedState.data)

    return (
        <>
            {allNotices.length > 0 ? allNotices.map((item) => (
                <div key={item._id} className="list-item-container grid min-[250px]:grid-cols-2 sm:grid-cols-5 py-1 gap-2 justify-center items-center border-b-2 border-blue-800">
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-start overflow-hidden text-ellipsis">
                        {item.title}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold text-white ${item.audience === "Department-Specific" ? "bg-purple-700" : "bg-orange-700"}`}>
                            {item.audience === "Department-Specific" ? "Department" : "Employee"}
                        </span>
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                        {item.targetName}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                        {item.createdby ? `${item.createdby.firstname} ${item.createdby.lastname}` : "N/A"}
                    </div>
                    <div className="heading-content text-blue-800 font-bold min-[250px]:text-xs xl:text-lg p-2 rounded-lg text-center flex justify-center items-center min-[250px]:gap-1 xl:gap-2">
                        {/* <ViewNoticeDialogBox noticeData={item} />
                        <UpdateNoticeDialogBox noticeData={item} />
                        <DeleteNoticeDialogBox noticeID={item._id} /> */}
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

        <ViewNoticeDialogBox noticeData={item}>

            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                👁 View
            </DropdownMenuItem>

        </ViewNoticeDialogBox>
    <UpdateNoticeDialogBox noticeData={item}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              ✏ Update Status
          </DropdownMenuItem>
      </UpdateNoticeDialogBox>
        <DeleteNoticeDialogBox noticeID={item._id}>

            <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="text-red-600"
            >
                🗑 Delete
            </DropdownMenuItem>

        </DeleteNoticeDialogBox>

    </DropdownMenuContent>

</DropdownMenu>
                    </div>
                </div>
            )) : (
                <div className="text-center py-8 text-gray-500 font-bold">No notices found.</div>
            )}
        </>
    )
}
