import { ViewSalaryDialogBox, UpdateSalaryDialogBox, DeleteSalaryDialogBox } from "./salarydialogboxes.jsx"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";
export const SalaryListItems = ({ TargetedState }) => {
    return (
        <>
            {TargetedState.data ? TargetedState.data.map((item) => (
                <div key={item._id} className="list-item-container grid min-[250px]:grid-cols-2 sm:grid-cols-5 py-1 gap-2 justify-center items-center border-b-2 border-blue-800">
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-start overflow-hidden text-ellipsis">
                        {item.employee ? `${item.employee.firstname} ${item.employee.lastname}` : "N/A"}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                        {item.currency} {item.netpay?.toFixed(2)}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                        {item.duedate ? new Date(item.duedate).toLocaleDateString() : "N/A"}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold text-white ${item.status === "Paid" ? "bg-green-700" : item.status === "Delayed" ? "bg-red-700" : "bg-amber-700"}`}>
                            {item.status}
                        </span>
                    </div>
                    <div className="heading-content text-blue-800 font-bold min-[250px]:text-xs xl:text-lg p-2 rounded-lg text-center flex justify-center items-center min-[250px]:gap-1 xl:gap-2">
                        {/* <ViewSalaryDialogBox salaryData={item} />
                        <UpdateSalaryDialogBox salaryData={item} />
                        <DeleteSalaryDialogBox salaryID={item._id} /> */}
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

        <ViewSalaryDialogBox salaryData={item}>

            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                👁 View
            </DropdownMenuItem>

        </ViewSalaryDialogBox>

        <DeleteSalaryDialogBox salaryID={item._id}>

            <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="text-red-600"
            >
                🗑 Delete
            </DropdownMenuItem>

        </DeleteSalaryDialogBox>

    </DropdownMenuContent>
    <DropdownMenuContent align="end">

        <ViewSalaryDialogBox salaryData={item}>

            {/* <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                👁 View
            </DropdownMenuItem> */}
        <UpdateSalaryDialogBox salaryData={item}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                ✏ Update Status
            </DropdownMenuItem>
        </UpdateSalaryDialogBox>
        </ViewSalaryDialogBox>

        <DeleteSalaryDialogBox salaryID={item._id}>

            <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="text-red-600"
            >
                🗑 Delete
            </DropdownMenuItem>

        </DeleteSalaryDialogBox>

    </DropdownMenuContent>

</DropdownMenu>
                    </div>
                </div>
            )) : null}
        </>
    )
}
