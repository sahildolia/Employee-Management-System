import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { CommonStateHandler } from "../../../utils/commonhandler.js"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetHRLeaves, HandlePostHRLeaves, HandlePatchHRLeaves, HandleDeleteHRLeaves } from "../../../redux/Thunks/HRLeavePageThunk.js"
import { fetchEmployeesIDs } from "../../../redux/Thunks/EmployeesIDsThunk.js"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { useToast } from "../../../hooks/use-toast.js"
import { Loading } from "../loading.jsx"

export const CreateLeaveDialogBox = () => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const EmployeesIDState = useSelector((state) => state.EMployeesIDReducer)
    const [open, setOpen] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [formdata, setformdata] = useState({
        employeeID: "",
        startdate: "",
        enddate: "",
        title: "",
        reason: "",
    })

    const handleformchange = (event) => {
        CommonStateHandler(formdata, setformdata, event)
    }

    const CreateLeave = async () => {
        const result = await dispatch(HandlePostHRLeaves({ apiroute: "CREATE", data: formdata }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({ title: "Success!", description: "Leave request created successfully." })
            dispatch(HandleGetHRLeaves({ apiroute: "GETALL" }))
            setformdata({ employeeID: "", startdate: "", enddate: "", title: "", reason: "" })
            setSelectedEmployee(null)
            setOpen(false)
        } else {
            toast({ variant: "destructive", title: "Error!", description: result.payload?.message || "Failed to create leave." })
        }
    }

    const SelectEmployee = (empid, firstname, lastname) => {
        setformdata((prev) => ({ ...prev, employeeID: empid }))
        setSelectedEmployee(`${firstname} ${lastname}`)
    }

    const clearForm = () => {
        setformdata({ employeeID: "", startdate: "", enddate: "", title: "", reason: "" })
        setSelectedEmployee(null)
    }

    const isFormValid = formdata.employeeID && formdata.startdate && formdata.enddate && formdata.title.trim() && formdata.reason.trim()

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="bg-blue-600 text-white font-medium px-4 py-2 rounded-xl hover:bg-blue-700 transition shadow-md" onClick={() => { dispatch(fetchEmployeesIDs({ apiroute: "GETALL" })); setOpen(true) }}>
                New Leave Request
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[50vw] 2xl:max-w-[40vw]">
                <div className="create-leave-container flex flex-col gap-5">
                    <div className="heading">
                        <h1 className="font-bold text-2xl">Create Leave Request</h1>
                    </div>
                    <div className="form-container grid md:grid-cols-2 min-[250px]:grid-cols-1 gap-4">
                        <div className="form-group flex flex-col gap-3">
                            <div className="label-input-field flex flex-col gap-1">
                                <label className="md:text-md lg:text-lg font-bold">Select Employee</label>
                                {EmployeesIDState.isLoading ? <Loading height={"h-auto"} /> :
                                    <Command className="rounded-lg border shadow-md">
                                        <CommandInput placeholder="Search employee..." />
                                        <CommandList>
                                            <CommandEmpty>No results found.</CommandEmpty>
                                            <CommandGroup heading="Employees">
                                                {EmployeesIDState.data ? EmployeesIDState.data.map((item, index) => (
                                                    <CommandItem key={index} onSelect={() => SelectEmployee(item._id, item.firstname, item.lastname)}>
                                                        <span>{`${item.firstname} ${item.lastname}`}</span>
                                                    </CommandItem>
                                                )) : null}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                }
                                {selectedEmployee && (
                                    <p className="text-sm font-semibold text-blue-700 mt-1">Selected: {selectedEmployee}</p>
                                )}
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="title" className="md:text-md lg:text-lg font-bold">Title</label>
                                <input type="text" id="title" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="title" value={formdata.title} onChange={handleformchange} placeholder="e.g. Annual Leave" />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="reason" className="md:text-md lg:text-lg font-bold">Reason</label>
                                <textarea id="reason" className="border-2 border-gray-700 rounded px-2 py-1 h-[100px] resize-none"
                                    name="reason" value={formdata.reason} onChange={handleformchange} placeholder="Reason for leave..."></textarea>
                            </div>
                        </div>
                        <div className="form-group flex flex-col gap-3">
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="startdate" className="md:text-md lg:text-lg font-bold">Start Date</label>
                                <input type="date" id="startdate" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="startdate" value={formdata.startdate} onChange={handleformchange} />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="enddate" className="md:text-md lg:text-lg font-bold">End Date</label>
                                <input type="date" id="enddate" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="enddate" value={formdata.enddate} onChange={handleformchange} />
                            </div>
                        </div>
                    </div>
                    <div className="add-button flex items-center justify-center gap-3">
                        {
                            !isFormValid ?
                                <Button className="bg-blue-600 border-2 border-blue-600 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-600"
                                    onClick={() => toast({ variant: "destructive", title: "Error!", description: "Please fill all required fields." })}>
                                    Create Leave
                                </Button> :
                                <Button className="bg-blue-600 border-2 border-blue-600 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-600"
                                    onClick={() => CreateLeave()}>
                                    Create Leave
                                </Button>
                        }
                        <DialogClose asChild>
                            <Button className="bg-red-700 border-2 border-red-700 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-red-700"
                                onClick={() => clearForm()}>
                                Cancel
                            </Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const ViewLeaveDialogBox = ({ leaveData }) => {
    const calcDays = (start, end) => {
        const s = new Date(start)
        const e = new Date(end)
        return Math.max(1, Math.ceil((e - s) / (1000 * 60 * 60 * 24)) + 1)
    }

    return (
        <Dialog>
            <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">
                View
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[50vw] 2xl:max-w-[40vw]">
                <div className="leave-data-container flex flex-col gap-4">
                    <div className="employee-profile-logo flex items-center gap-3">
                        <div className="logo border-2 border-blue-800 rounded-[50%] flex justify-center items-center">
                            <p className="font-bold text-2xl text-blue-700 p-2">
                                {`${(leaveData.employee?.firstname || "?").slice(0, 1).toUpperCase()} ${(leaveData.employee?.lastname || "?").slice(0, 1).toUpperCase()}`}
                            </p>
                        </div>
                        <div className="employee-fullname">
                            <p className="font-bold text-2xl">{`${leaveData.employee?.firstname || ""} ${leaveData.employee?.lastname || ""}`}</p>
                        </div>
                    </div>
                    <div className="leave-all-details grid lg:grid-cols-2 min-[250px]:gap-2 lg:gap-10">
                        <div className="details-group-1 flex flex-col gap-3">
                            <div className="label-value-pair flex items-center gap-2">
                                <label className="font-bold md:text-sm xl:text-lg">Title :</label>
                                <p className="md:text-sm xl:text-lg">{leaveData.title}</p>
                            </div>
                            <div className="label-value-pair flex items-center gap-2">
                                <label className="font-bold md:text-sm xl:text-lg">Start Date :</label>
                                <p className="md:text-sm xl:text-lg">{new Date(leaveData.startdate).toLocaleDateString()}</p>
                            </div>
                            <div className="label-value-pair flex items-center gap-2">
                                <label className="font-bold md:text-sm xl:text-lg">End Date :</label>
                                <p className="md:text-sm xl:text-lg">{new Date(leaveData.enddate).toLocaleDateString()}</p>
                            </div>
                            <div className="label-value-pair flex items-center gap-2">
                                <label className="font-bold md:text-sm xl:text-lg">Duration :</label>
                                <p className="md:text-sm xl:text-lg">{calcDays(leaveData.startdate, leaveData.enddate)} Days</p>
                            </div>
                        </div>
                        <div className="details-group-2 flex flex-col gap-3">
                            <div className="label-value-pair flex items-center gap-2">
                                <label className="font-bold md:text-sm xl:text-lg">Status :</label>
                                <p className={`md:text-sm xl:text-lg font-bold ${leaveData.status === "Approved" ? "text-green-700" : leaveData.status === "Rejected" ? "text-red-700" : "text-amber-700"}`}>
                                    {leaveData.status}
                                </p>
                            </div>
                            <div className="label-value-pair flex items-center gap-2">
                                <label className="font-bold md:text-sm xl:text-lg">Approved By :</label>
                                <p className="md:text-sm xl:text-lg">{leaveData.approvedby ? `${leaveData.approvedby.firstname} ${leaveData.approvedby.lastname}` : "Not yet approved"}</p>
                            </div>
                            <div className="label-value-pair flex items-start gap-2">
                                <label className="font-bold md:text-sm xl:text-lg">Reason :</label>
                                <p className="md:text-sm xl:text-lg">{leaveData.reason}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const ApproveRejectLeaveDialogBox = ({ leaveData }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const [action, setAction] = useState("")

    const HandleAction = async () => {
        const result = await dispatch(HandlePatchHRLeaves({
            apiroute: "UPDATE_HR",
            data: { leaveID: leaveData._id, status: action }
        }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({ title: "Success!", description: `Leave ${action.toLowerCase()} successfully.` })
            dispatch(HandleGetHRLeaves({ apiroute: "GETALL" }))
            setOpen(false)
        } else {
            toast({ variant: "destructive", title: "Error!", description: result.payload?.message || "Action failed." })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">
                Approve / Reject
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[40vw] 2xl:max-w-[35vw]">
                <div className="flex flex-col gap-5">
                    <h1 className="font-bold text-2xl">Review Leave Request</h1>
                    <div className="leave-summary border-2 border-gray-300 rounded-lg p-4 flex flex-col gap-2">
                        <p><span className="font-bold">Employee:</span> {leaveData.employee?.firstname || ""} {leaveData.employee?.lastname || ""}</p>
                        <p><span className="font-bold">Title:</span> {leaveData.title}</p>
                        <p><span className="font-bold">Duration:</span> {new Date(leaveData.startdate).toLocaleDateString()} - {new Date(leaveData.enddate).toLocaleDateString()}</p>
                        <p><span className="font-bold">Reason:</span> {leaveData.reason}</p>
                    </div>
                    <div className="action-buttons flex justify-center gap-4">
                        <Button className={`px-6 py-2 text-white font-bold rounded-lg border-2 ${action === "Approved" ? "bg-green-700 border-green-700" : "bg-white border-green-700 text-green-700"}`}
                            onClick={() => setAction("Approved")}>
                            {action === "Approved" ? "✓ Approved" : "Approve"}
                        </Button>
                        <Button className={`px-6 py-2 text-white font-bold rounded-lg border-2 ${action === "Rejected" ? "bg-red-700 border-red-700" : "bg-white border-red-700 text-red-700"}`}
                            onClick={() => setAction("Rejected")}>
                            {action === "Rejected" ? "✗ Rejected" : "Reject"}
                        </Button>
                    </div>
                    <div className="submit-button flex justify-center">
                        {action ? (
                            <Button className="bg-blue-600 border-2 border-blue-600 px-6 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-600"
                                onClick={() => HandleAction()}>
                                Confirm - {action}
                            </Button>
                        ) : (
                            <Button className="bg-gray-400 border-2 border-gray-400 px-6 py-2 text-white font-bold rounded-lg cursor-not-allowed" disabled>
                                Select Approve or Reject
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const DeleteLeaveDialogBox = ({ leaveID }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()

    const DeleteLeave = async (LID) => {
        const result = await dispatch(HandleDeleteHRLeaves({ apiroute: `DELETE.${LID}` }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({ title: "Success!", description: "Leave record deleted successfully." })
            dispatch(HandleGetHRLeaves({ apiroute: "GETALL" }))
        } else {
            toast({ variant: "destructive", title: "Error!", description: result.payload?.message || "Failed to delete." })
        }
    }

    return (
        <Dialog>
            <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">
                Delete
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-lg font-bold min-[250px]:text-center">Are you sure you want to delete this leave record?</p>
                    <div className="delete-button-group flex gap-2">
                        <DialogClose asChild>
                            <Button className="btn-sm border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-red-700 border-red-700 hover:bg-transparent hover:text-red-700 text-white font-bold" onClick={() => DeleteLeave(leaveID)}>Delete</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button className="btn-sm border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-green-700 border-green-700 hover:bg-transparent hover:text-green-700 text-white font-bold">Cancel</Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
