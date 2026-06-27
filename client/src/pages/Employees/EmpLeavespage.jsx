import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetMyLeaves, HandlePostMyLeave, HandlePatchMyLeave, HandleDeleteMyLeave } from "../../redux/Thunks/EmployeeDashboardThunk"
import { ListWrapper, HeadingBar, ListContainer } from "../../components/common/Dashboard/ListDesigns"
import { Loading } from "../../components/common/loading.jsx"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "../../hooks/use-toast"
import { Clock, CheckCircle, XCircle, CalendarRange, Eye, Edit, Trash2, Plus } from "lucide-react"

const calcDays = (start, end) => {
    const s = new Date(start)
    const e = new Date(end)
    return Math.max(1, Math.ceil((e - s) / (1000 * 60 * 60 * 24)) + 1)
}

const CreateLeaveDialog = ({ open, onOpenChange, onSuccess }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const [formdata, setformdata] = useState({
        title: "",
        reason: "",
        startdate: "",
        enddate: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setformdata((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {
        if (!formdata.title.trim() || !formdata.reason.trim() || !formdata.startdate || !formdata.enddate) {
            toast({ variant: "destructive", title: "Error!", description: "Please fill all required fields." })
            return
        }
        const result = await dispatch(HandlePostMyLeave({ apiroute: "CREATE_LEAVE", data: formdata }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({ title: "Success!", description: "Leave request created successfully." })
            setformdata({ title: "", reason: "", startdate: "", enddate: "" })
            onOpenChange(false)
            onSuccess()
        } else {
            toast({ variant: "destructive", title: "Error!", description: result.payload?.message || "Failed to create leave." })
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[95vw] lg:max-w-[50vw] 2xl:max-w-[40vw]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">New Leave Request</DialogTitle>
                    <DialogDescription>Fill in the details to submit a new leave request.</DialogDescription>
                </DialogHeader>
                <div className="grid md:grid-cols-2 min-[250px]:grid-cols-1 gap-4 py-4">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="title" className="font-bold">Title</Label>
                            <Input id="title" name="title" value={formdata.title} onChange={handleChange} placeholder="e.g. Annual Leave" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="reason" className="font-bold">Reason</Label>
                            <textarea id="reason" name="reason" value={formdata.reason} onChange={handleChange}
                                className="border-2 border-gray-700 rounded px-2 py-1 h-[100px] resize-none" placeholder="Reason for leave..."></textarea>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="startdate" className="font-bold">Start Date</Label>
                            <Input id="startdate" name="startdate" type="date" value={formdata.startdate} onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="enddate" className="font-bold">End Date</Label>
                            <Input id="enddate" name="enddate" type="date" value={formdata.enddate} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <DialogFooter className="flex gap-2">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold" onClick={handleSubmit}>
                        Create Leave
                    </Button>
                    <DialogClose asChild>
                        <Button variant="outline" className="border-red-700 text-red-700 hover:bg-red-50">Cancel</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const ViewLeaveDialog = ({ leaveData }) => {
    return (
        <Dialog>
            <DialogTrigger className="btn-sm border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">
                <Eye size={16} />
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[50vw] 2xl:max-w-[40vw]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-blue-800">Leave Details</DialogTitle>
                </DialogHeader>
                <div className="grid lg:grid-cols-2 min-[250px]:gap-2 lg:gap-10">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <Label className="font-bold">Title :</Label>
                            <p>{leaveData.title}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label className="font-bold">Start Date :</Label>
                            <p>{new Date(leaveData.startdate).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label className="font-bold">End Date :</Label>
                            <p>{new Date(leaveData.enddate).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label className="font-bold">Duration :</Label>
                            <p>{calcDays(leaveData.startdate, leaveData.enddate)} Days</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <Label className="font-bold">Status :</Label>
                            <p className={`font-bold ${leaveData.status === "Approved" ? "text-green-700" : leaveData.status === "Rejected" ? "text-red-700" : "text-amber-700"}`}>
                                {leaveData.status}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label className="font-bold">Approved By :</Label>
                            <p>{leaveData.approvedby ? `${leaveData.approvedby.firstname} ${leaveData.approvedby.lastname}` : "Not yet approved"}</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <Label className="font-bold">Reason :</Label>
                            <p>{leaveData.reason}</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

const EditLeaveDialog = ({ leaveData, onSuccess }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const [formdata, setformdata] = useState({
        leaveID: leaveData._id,
        title: leaveData.title || "",
        reason: leaveData.reason || "",
        startdate: leaveData.startdate ? leaveData.startdate.split("T")[0] : "",
        enddate: leaveData.enddate ? leaveData.enddate.split("T")[0] : "",
    })

    useEffect(() => {
        setformdata({
            leaveID: leaveData._id,
            title: leaveData.title || "",
            reason: leaveData.reason || "",
            startdate: leaveData.startdate ? leaveData.startdate.split("T")[0] : "",
            enddate: leaveData.enddate ? leaveData.enddate.split("T")[0] : "",
        })
    }, [leaveData])

    const handleChange = (e) => {
        const { name, value } = e.target
        setformdata((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {
        if (!formdata.title.trim() || !formdata.reason.trim() || !formdata.startdate || !formdata.enddate) {
            toast({ variant: "destructive", title: "Error!", description: "Please fill all required fields." })
            return
        }
        const result = await dispatch(HandlePatchMyLeave({ apiroute: "UPDATE_LEAVE", data: formdata }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({ title: "Success!", description: "Leave updated successfully." })
            setOpen(false)
            onSuccess()
        } else {
            toast({ variant: "destructive", title: "Error!", description: result.payload?.message || "Failed to update leave." })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="btn-sm border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">
                <Edit size={16} />
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[50vw] 2xl:max-w-[40vw]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Edit Leave Request</DialogTitle>
                    <DialogDescription>Update your leave request details.</DialogDescription>
                </DialogHeader>
                <div className="grid md:grid-cols-2 min-[250px]:grid-cols-1 gap-4 py-4">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="edit-title" className="font-bold">Title</Label>
                            <Input id="edit-title" name="title" value={formdata.title} onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="edit-reason" className="font-bold">Reason</Label>
                            <textarea id="edit-reason" name="reason" value={formdata.reason} onChange={handleChange}
                                className="border-2 border-gray-700 rounded px-2 py-1 h-[100px] resize-none"></textarea>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="edit-startdate" className="font-bold">Start Date</Label>
                            <Input id="edit-startdate" name="startdate" type="date" value={formdata.startdate} onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="edit-enddate" className="font-bold">End Date</Label>
                            <Input id="edit-enddate" name="enddate" type="date" value={formdata.enddate} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <DialogFooter className="flex gap-2">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold" onClick={handleSubmit}>
                        Update Leave
                    </Button>
                    <DialogClose asChild>
                        <Button variant="outline" className="border-red-700 text-red-700 hover:bg-red-50">Cancel</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const DeleteLeaveDialog = ({ leaveID, onSuccess }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()

    const handleDelete = async () => {
        const result = await dispatch(HandleDeleteMyLeave({ apiroute: `DELETE_LEAVE.${leaveID}` }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({ title: "Success!", description: "Leave record deleted successfully." })
            onSuccess()
        } else {
            toast({ variant: "destructive", title: "Error!", description: result.payload?.message || "Failed to delete leave." })
        }
    }

    return (
        <Dialog>
            <DialogTrigger className="btn-sm border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">
                <Trash2 size={16} />
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Confirm Delete</DialogTitle>
                    <DialogDescription>Are you sure you want to delete this leave record? This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-2 mt-4">
                    <Button className="bg-red-700 hover:bg-red-800 text-white font-bold" onClick={handleDelete}>
                        Delete
                    </Button>
                    <DialogClose asChild>
                        <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50">Cancel</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export const EmpLeavesPage = () => {
    const dispatch = useDispatch()
    const EmpState = useSelector((s) => s.EmployeeDashboardReducer)
    const [createOpen, setCreateOpen] = useState(false)
    const table_headings = ["Title", "Duration", "Date Range", "Status", "Actions"]

    const triggerRefetch = () => {
        dispatch(HandleGetMyLeaves({ apiroute: "MY_LEAVES" }))
    }

    useEffect(() => {
        if (EmpState.fetchData) {
            dispatch(HandleGetMyLeaves({ apiroute: "MY_LEAVES" }))
        }
    }, [EmpState.fetchData])

    useEffect(() => {
        dispatch(HandleGetMyLeaves({ apiroute: "MY_LEAVES" }))
    }, [])

    const leaves = EmpState.leaves || []

    const stats = useMemo(() => {
        return [
            { title: "Pending", value: leaves.filter((l) => l.status === "Pending").length, color: "bg-amber-50", text: "text-amber-600", icon: Clock },
            { title: "Approved", value: leaves.filter((l) => l.status === "Approved").length, color: "bg-green-50", text: "text-green-600", icon: CheckCircle },
            { title: "Rejected", value: leaves.filter((l) => l.status === "Rejected").length, color: "bg-red-50", text: "text-red-600", icon: XCircle },
            { title: "Total", value: leaves.length, color: "bg-blue-50", text: "text-blue-600", icon: CalendarRange },
        ]
    }, [leaves])

    if (EmpState.isLoading && !EmpState.leaves) {
        return <Loading />
    }

    return (
        <div className="w-full flex flex-col gap-5 min-h-0 flex-1 p-2 md:p-4">
            <div className="flex justify-between items-center md:pe-5">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Leave Management</h1>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl shadow-md flex items-center gap-2"
                    onClick={() => setCreateOpen(true)}>
                    <Plus size={18} /> New Leave Request
                </Button>
            </div>

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:pe-5">
                {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <div key={stat.title} className={`${stat.color} rounded-2xl border border-slate-200 p-4 flex justify-between items-center shadow-sm`}>
                            <div>
                                <p className="text-slate-500 text-xs sm:text-sm">{stat.title}</p>
                                <h2 className="text-2xl sm:text-3xl font-bold mt-1">{stat.value}</h2>
                            </div>
                            <div className={stat.text}>
                                <Icon size={24} />
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="flex flex-col gap-4 md:pe-5 overflow-auto min-h-0 flex-1">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-5"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    {leaves.length > 0 ? leaves.map((item) => (
                        <div key={item._id} className="list-item-container grid min-[250px]:grid-cols-2 sm:grid-cols-5 py-1 gap-2 justify-center items-center border-b-2 border-blue-800">
                            <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-start overflow-hidden text-ellipsis">
                                {item.title}
                            </div>
                            <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                                {calcDays(item.startdate, item.enddate)} days
                            </div>
                            <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                                {item.startdate ? `${new Date(item.startdate).toLocaleDateString()} - ${new Date(item.enddate).toLocaleDateString()}` : "N/A"}
                            </div>
                            <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                                <span className={`px-2 py-1 rounded-lg text-xs font-bold text-white ${item.status === "Approved" ? "bg-green-700" : item.status === "Rejected" ? "bg-red-700" : "bg-amber-700"}`}>
                                    {item.status}
                                </span>
                            </div>
                            <div className="heading-content text-blue-800 font-bold min-[250px]:text-xs xl:text-lg p-2 rounded-lg text-center flex justify-center items-center min-[250px]:gap-1 xl:gap-2">
                                <ViewLeaveDialog leaveData={item} />
                                {item.status === "Pending" && <EditLeaveDialog leaveData={item} onSuccess={triggerRefetch} />}
                                <DeleteLeaveDialog leaveID={item._id} onSuccess={triggerRefetch} />
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-8 text-gray-500 font-bold">No leave records found.</div>
                    )}
                </ListContainer>
            </div>

            <CreateLeaveDialog open={createOpen} onOpenChange={setCreateOpen} onSuccess={triggerRefetch} />
        </div>
    )
}
