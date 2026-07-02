import { ViewRecruitmentDialogBox, UpdateRecruitmentDialogBox, DeleteRecruitmentDialogBox } from "./recruitmentdialogboxes.jsx"
import { useNavigate } from "react-router-dom"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";
export const RecruitmentListItems = ({ TargetedState }) => {
    const navigate = useNavigate()

    return (
        <>
            {TargetedState.data && TargetedState.data.length > 0 ? TargetedState.data.map((item) => (
                <div key={item._id} className="list-item-container grid min-[250px]:grid-cols-2 sm:grid-cols-6 py-1 gap-2 justify-center items-center border-b-2 border-blue-800">
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-start overflow-hidden text-ellipsis">
                        {item.jobtitle}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                        {item.department?.name || "N/A"}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                        {item.description ? (item.description.length > 40 ? `${item.description.slice(0, 40)}...` : item.description) : "N/A"}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                        <span className="px-2 py-1 rounded-lg text-xs font-bold bg-blue-100 text-blue-800">
                            {item.applicants?.length || 0} Applicants
                        </span>
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                        <button className="text-blue-700 underline text-xs hover:text-blue-900"
                            onClick={() => navigate(`/HR/dashboard/applicants?recruitmentID=${item._id}`)}>
                            View Applicants
                        </button>
                    </div>
                    <div className="heading-content text-blue-800 font-bold min-[250px]:text-xs xl:text-lg p-2 rounded-lg text-center flex justify-center items-center min-[250px]:gap-1 xl:gap-2">
                        {/* <ViewRecruitmentDialogBox recruitmentData={item} />
                        <UpdateRecruitmentDialogBox recruitmentData={item} />
                        <DeleteRecruitmentDialogBox recruitmentID={item._id} /> */}
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

        <ViewRecruitmentDialogBox recruitmentData={item}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                👁 View
            </DropdownMenuItem>
        </ViewRecruitmentDialogBox>

        <UpdateRecruitmentDialogBox recruitmentData={item}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                ✏️ Update
            </DropdownMenuItem>
        </UpdateRecruitmentDialogBox>

        <DeleteRecruitmentDialogBox recruitmentID={item._id}>
            <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="text-red-600"
            >
                🗑 Delete
            </DropdownMenuItem>
        </DeleteRecruitmentDialogBox>

    </DropdownMenuContent>

</DropdownMenu>
                    </div>
                </div>
            )) : (
                <div className="text-center py-8 text-gray-500 font-bold">No recruitment records found.</div>
            )}
        </>
    )
}
