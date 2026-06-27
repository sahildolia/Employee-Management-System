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
import { HandleGetHRAttendance, HandlePostHRAttendance, HandleDeleteHRAttendance } from "../../../redux/Thunks/HRAttendancePageThunk.js"
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

export const CreateAttendanceDialogBox = ({ children }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const EmployeesIDState = useSelector((state) => state.EMployeesIDReducer)
    const [open, setOpen] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [formdata, setformdata] = useState({
        employeeID: "",
    })

    const SelectEmployee = (empid, firstname, lastname) => {
        setformdata((prev) => ({ ...prev, employeeID: empid }))
        setSelectedEmployee(`${firstname} ${lastname}`)
    }

    const InitAttendance = async () => {
        const result = await dispatch(HandlePostHRAttendance({ apiroute: "create", data: formdata }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({ title: "Success!", description: "Attendance initialized successfully." })
            dispatch(HandleGetHRAttendance({ apiroute: "all" }))
            setformdata({ employeeID: "" })
            setSelectedEmployee(null)
            setOpen(false)
        } else {
            toast({ variant: "destructive", title: "Error!", description: result.payload?.message || "Failed to initialize attendance." })
        }
    }

    const clearForm = () => {
        setformdata({ employeeID: "" })
        setSelectedEmployee(null)
    }

    const openDialog = () => {
        dispatch(fetchEmployeesIDs({ apiroute: "GETALL" }))
        setOpen(true)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {children ? (
                <DialogTrigger asChild onClick={openDialog}>{children}</DialogTrigger>
            ) : (
                <DialogTrigger className="bg-blue-600 text-white font-medium px-4 py-2 rounded-xl hover:bg-blue-700 transition shadow-md" onClick={openDialog}>
                    Initialize Attendance
                </DialogTrigger>
            )}
            <DialogContent className="max-w-[95vw] lg:max-w-[50vw] 2xl:max-w-[40vw]">
                <div className="create-attendance-container flex flex-col gap-5">
                    <div className="heading">
                        <h1 className="font-bold text-2xl">Initialize Attendance</h1>
                    </div>
                    <div className="form-container flex flex-col gap-4">
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
                    </div>
                    <div className="add-button flex items-center justify-center gap-3">
                        {
                            !formdata.employeeID ?
                                <Button className="bg-blue-600 border-2 border-blue-600 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-600"
                                    onClick={() => toast({ variant: "destructive", title: "Error!", description: "Please select an employee." })}>
                                    Initialize
                                </Button> :
                                <Button className="bg-blue-600 border-2 border-blue-600 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-600"
                                    onClick={() => InitAttendance()}>
                                    Initialize
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

export const ViewAttendanceDialogBox = ({ attendanceData }) => {
    return (
        <Dialog>
            <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">
                View Details
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[55vw] 2xl:max-w-[45vw]">
                <div className="attendance-data-container flex flex-col gap-4">
                    <div className="employee-profile-logo flex items-center gap-3">
                        <div className="logo border-2 border-blue-800 rounded-[50%] flex justify-center items-center">
                            <p className="font-bold text-2xl text-blue-700 p-2">
                                {`${(attendanceData.employee?.firstname || "?").slice(0, 1).toUpperCase()} ${(attendanceData.employee?.lastname || "?").slice(0, 1).toUpperCase()}`}
                            </p>
                        </div>
                        <div className="employee-fullname">
                            <p className="font-bold text-2xl">{`${attendanceData.employee?.firstname || ""} ${attendanceData.employee?.lastname || ""}`}</p>
                        </div>
                    </div>
                    <div className="attendance-current-status flex items-center gap-2">
                        <label className="font-bold md:text-sm xl:text-lg">Current Status :</label>
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold text-white ${attendanceData.currentstatus === "Present" ? "bg-green-700" : attendanceData.currentstatus === "Absent" ? "bg-red-700" : "bg-amber-700"}`}>
                            {attendanceData.currentstatus || "N/A"}
                        </span>
                    </div>
                    <div className="attendance-log-history">
                        <h2 className="font-bold text-xl mb-3">Attendance Log History</h2>
                        <div className="border-2 border-gray-300 rounded-lg p-4 max-h-[300px] overflow-auto">
                            {attendanceData.log && attendanceData.log.length > 0 ? (
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b-2 border-blue-800">
                                            <th className="font-bold p-2">Date</th>
                                            <th className="font-bold p-2">Status</th>
                                            <th className="font-bold p-2">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {attendanceData.log.map((entry, index) => (
                                            <tr key={index} className="border-b border-gray-200">
                                                <td className="p-2">{entry.date ? new Date(entry.date).toLocaleDateString() : "N/A"}</td>
                                                <td className="p-2">
                                                    <span className={`px-2 py-1 rounded-lg text-xs font-bold text-white ${entry.status === "Present" ? "bg-green-700" : entry.status === "Absent" ? "bg-red-700" : "bg-amber-700"}`}>
                                                        {entry.status}
                                                    </span>
                                                </td>
                                                <td className="p-2">{entry.time || "N/A"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-gray-500 text-center">No attendance records found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const DeleteAttendanceDialogBox = ({ attendanceID }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()

    const DeleteAttendance = async (AID) => {
        const result = await dispatch(HandleDeleteHRAttendance({ apiroute: `delete.${AID}` }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({ title: "Success!", description: "Attendance record deleted successfully." })
            dispatch(HandleGetHRAttendance({ apiroute: "all" }))
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
                    <p className="text-lg font-bold min-[250px]:text-center">Are you sure you want to delete this attendance record?</p>
                    <div className="delete-button-group flex gap-2">
                        <DialogClose asChild>
                            <Button className="btn-sm border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-red-700 border-red-700 hover:bg-transparent hover:text-red-700 text-white font-bold" onClick={() => DeleteAttendance(attendanceID)}>Delete</Button>
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
