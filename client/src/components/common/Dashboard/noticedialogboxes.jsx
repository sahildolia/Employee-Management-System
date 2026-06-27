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
import { HandleGetHRNotices, HandlePostHRNotices, HandlePatchHRNotices, HandleDeleteHRNotices } from "../../../redux/Thunks/HRNoticePageThunk.js"
import { fetchEmployeesIDs } from "../../../redux/Thunks/EmployeesIDsThunk.js"
import { HandleGetHRDepartments } from "../../../redux/Thunks/HRDepartmentPageThunk.js"
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

export const CreateNoticeDialogBox = ({ children }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const HRState = useSelector((state) => state.HRReducer)
    const EmployeesIDState = useSelector((state) => state.EMployeesIDReducer)
    const HRDepartmentState = useSelector((state) => state.HRDepartmentPageReducer)
    const [open, setOpen] = useState(false)
    const [selectedTarget, setSelectedTarget] = useState(null)
    const [formdata, setformdata] = useState({
        title: "",
        content: "",
        audience: "Department-Specific",
        departmentID: "",
        employeeID: "",
    })

    const handleformchange = (event) => {
        CommonStateHandler(formdata, setformdata, event)
    }

    const CreateNotice = async () => {
        const result = await dispatch(HandlePostHRNotices({ apiroute: "CREATE", data: formdata }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({
                title: "Success!",
                description: "Notice created successfully.",
            })
            dispatch(HandleGetHRNotices({ apiroute: "GETALL" }))
            setformdata({
                title: "",
                content: "",
                audience: "Department-Specific",
                departmentID: "",
                employeeID: "",
            })
            setSelectedTarget(null)
            setOpen(false)
        } else {
            toast({
                variant: "destructive",
                title: "Error!",
                description: result.payload?.message || "Failed to create notice.",
            })
        }
    }

    const SelectDepartment = (deptid, deptname) => {
        setformdata((prev) => ({ ...prev, departmentID: deptid, employeeID: "" }))
        setSelectedTarget(deptname)
    }

    const SelectEmployee = (empid, firstname, lastname) => {
        setformdata((prev) => ({ ...prev, employeeID: empid, departmentID: "" }))
        setSelectedTarget(`${firstname} ${lastname}`)
    }

    const clearForm = () => {
        setformdata({
            title: "",
            content: "",
            audience: "Department-Specific",
            departmentID: "",
            employeeID: "",
        })
        setSelectedTarget(null)
    }

    const openDialog = () => {
        dispatch(fetchEmployeesIDs({ apiroute: "GETALL" }))
        dispatch(HandleGetHRDepartments({ apiroute: "GETALL" }))
        setOpen(true)
    }

    const isFormValid = formdata.title.trim() && formdata.content.trim() && (
        formdata.audience === "Department-Specific" ? formdata.departmentID : formdata.employeeID
    )

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {children ? (
                <DialogTrigger asChild onClick={openDialog}>{children}</DialogTrigger>
            ) : (
                <DialogTrigger className="bg-blue-600 text-white font-medium px-4 py-2 rounded-xl hover:bg-blue-700 transition shadow-md" onClick={openDialog}>
                    Create Notice
                </DialogTrigger>
            )}
            <DialogContent className="max-w-[95vw] lg:max-w-[55vw] 2xl:max-w-[45vw]">
                <div className="create-notice-container flex flex-col gap-5">
                    <div className="heading">
                        <h1 className="font-bold text-2xl">Create Notice</h1>
                    </div>
                    <div className="form-container grid md:grid-cols-2 min-[250px]:grid-cols-1 gap-4">
                        <div className="form-group flex flex-col gap-3">
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="title" className="md:text-md lg:text-lg font-bold">Title</label>
                                <input type="text" id="title" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="title" value={formdata.title} onChange={handleformchange} placeholder="Enter notice title" />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="audience" className="md:text-md lg:text-lg font-bold">Audience</label>
                                <select id="audience" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="audience" value={formdata.audience} onChange={handleformchange}>
                                    <option value="Department-Specific">Department Specific</option>
                                    <option value="Employee-Specific">Employee Specific</option>
                                </select>
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label className="md:text-md lg:text-lg font-bold">
                                    {formdata.audience === "Department-Specific" ? "Select Department" : "Select Employee"}
                                </label>
                                {formdata.audience === "Department-Specific" ? (
                                    HRDepartmentState.isLoading ? <Loading height={"h-auto"} /> :
                                        <Command className="rounded-lg border shadow-md">
                                            <CommandInput placeholder="Search department..." />
                                            <CommandList>
                                                <CommandEmpty>No departments found.</CommandEmpty>
                                                <CommandGroup heading="Departments">
                                                    {HRDepartmentState.data ? HRDepartmentState.data.map((item, index) => (
                                                        <CommandItem key={index} onSelect={() => SelectDepartment(item._id, item.name)}>
                                                            <span>{item.name}</span>
                                                        </CommandItem>
                                                    )) : null}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                ) : (
                                    EmployeesIDState.isLoading ? <Loading height={"h-auto"} /> :
                                        <Command className="rounded-lg border shadow-md">
                                            <CommandInput placeholder="Search employee..." />
                                            <CommandList>
                                                <CommandEmpty>No employees found.</CommandEmpty>
                                                <CommandGroup heading="Employees">
                                                    {EmployeesIDState.data ? EmployeesIDState.data.map((item, index) => (
                                                        <CommandItem key={index} onSelect={() => SelectEmployee(item._id, item.firstname, item.lastname)}>
                                                            <span>{`${item.firstname} ${item.lastname}`}</span>
                                                        </CommandItem>
                                                    )) : null}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                )}
                                {selectedTarget && (
                                    <p className="text-sm font-semibold text-blue-700 mt-1">Selected: {selectedTarget}</p>
                                )}
                            </div>
                        </div>
                        <div className="form-group flex flex-col gap-3">
                            <div className="label-input-field flex flex-col gap-1 h-full">
                                <label htmlFor="content" className="md:text-md lg:text-lg font-bold">Content</label>
                                <textarea id="content" className="border-2 border-gray-700 rounded px-2 py-1 h-[200px] resize-none"
                                    name="content" value={formdata.content} onChange={handleformchange} placeholder="Write notice content here..."></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="add-button flex items-center justify-center gap-3">
                        {
                            !isFormValid ?
                                <Button className="bg-blue-600 border-2 border-blue-600 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-600"
                                    onClick={() => toast({ variant: "destructive", title: "Error!", description: "Please fill all required fields." })}>
                                    Create Notice
                                </Button> :
                                <Button className="bg-blue-600 border-2 border-blue-600 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-600"
                                    onClick={() => CreateNotice()}>
                                    Create Notice
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

export const ViewNoticeDialogBox = ({ noticeData }) => {
    return (
        <Dialog>
            <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">
                View
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[55vw] 2xl:max-w-[45vw]">
                <div className="notice-data-container flex flex-col gap-4">
                    <div className="heading">
                        <h1 className="font-bold text-2xl text-blue-800">{noticeData.title}</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Created by: {noticeData.createdby?.firstname || ""} {noticeData.createdby?.lastname || ""}
                            &nbsp;|&nbsp;{new Date(noticeData.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="notice-audience-badge">
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold text-white ${noticeData.audience === "Department-Specific" ? "bg-purple-700" : "bg-orange-700"}`}>
                            {noticeData.audience}
                        </span>
                        <span className="ml-2 text-sm font-semibold text-gray-700">
                            Target: {noticeData.department ? noticeData.department.name : `${noticeData.employee?.firstname || ""} ${noticeData.employee?.lastname || ""}`}
                        </span>
                    </div>
                    <div className="notice-content border-2 border-gray-300 rounded-lg p-4 min-h-[150px]">
                        <p className="text-gray-800 whitespace-pre-wrap">{noticeData.content}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const UpdateNoticeDialogBox = ({ noticeData }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const [formdata, setformdata] = useState({
        noticeID: noticeData._id,
        UpdatedData: {
            title: noticeData.title || "",
            content: noticeData.content || "",
        }
    })

    useEffect(() => {
        setformdata({
            noticeID: noticeData._id,
            UpdatedData: {
                title: noticeData.title || "",
                content: noticeData.content || "",
            }
        })
    }, [noticeData])

    const handleformchange = (event) => {
        const { name, value } = event.target;
        setformdata((prev) => ({
            ...prev,
            UpdatedData: {
                ...prev.UpdatedData,
                [name]: value
            }
        }))
    }

    const UpdateNotice = async () => {
        const result = await dispatch(HandlePatchHRNotices({ apiroute: "UPDATE", data: formdata }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({
                title: "Success!",
                description: "Notice updated successfully.",
            })
            dispatch(HandleGetHRNotices({ apiroute: "GETALL" }))
            setOpen(false)
        } else {
            toast({
                variant: "destructive",
                title: "Error!",
                description: result.payload?.message || "Failed to update notice.",
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">
                Edit
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[50vw] 2xl:max-w-[40vw]">
                <div className="update-notice-container flex flex-col gap-5">
                    <div className="heading">
                        <h1 className="font-bold text-2xl">Update Notice</h1>
                    </div>
                    <div className="form-container flex flex-col gap-4">
                        <div className="label-input-field flex flex-col gap-1">
                            <label htmlFor="title" className="md:text-md lg:text-lg font-bold">Title</label>
                            <input type="text" id="title" className="border-2 border-gray-700 rounded px-2 py-1"
                                name="title" value={formdata.UpdatedData.title} onChange={handleformchange} />
                        </div>
                        <div className="label-input-field flex flex-col gap-1">
                            <label htmlFor="content" className="md:text-md lg:text-lg font-bold">Content</label>
                            <textarea id="content" className="border-2 border-gray-700 rounded px-2 py-1 h-[200px] resize-none"
                                name="content" value={formdata.UpdatedData.content} onChange={handleformchange}></textarea>
                        </div>
                    </div>
                    <div className="add-button flex items-center justify-center gap-3">
                        {
                            !formdata.UpdatedData.title.trim() || !formdata.UpdatedData.content.trim() ?
                                <Button className="bg-blue-600 border-2 border-blue-600 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-600"
                                    onClick={() => toast({ variant: "destructive", title: "Error!", description: "Title and content are required." })}>
                                    Update Notice
                                </Button> :
                                <Button className="bg-blue-600 border-2 border-blue-600 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-600"
                                    onClick={() => UpdateNotice()}>
                                    Update Notice
                                </Button>
                        }
                        <DialogClose asChild>
                            <Button className="bg-red-700 border-2 border-red-700 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-red-700">
                                Cancel
                            </Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const DeleteNoticeDialogBox = ({ noticeID }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()

    const DeleteNotice = async (NID) => {
        const result = await dispatch(HandleDeleteHRNotices({ apiroute: `DELETE.${NID}` }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({
                title: "Success!",
                description: "Notice deleted successfully.",
            })
            dispatch(HandleGetHRNotices({ apiroute: "GETALL" }))
        } else {
            toast({
                variant: "destructive",
                title: "Error!",
                description: result.payload?.message || "Failed to delete notice.",
            })
        }
    }

    return (
        <Dialog>
            <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">
                Delete
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-lg font-bold min-[250px]:text-center">Are you sure you want to delete this notice?</p>
                    <div className="delete-notice-button-group flex gap-2">
                        <DialogClose asChild>
                            <Button className="btn-sm btn-blue-700 text-md border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-red-700 border-red-700 hover:bg-transparent hover:text-red-700" onClick={() => DeleteNotice(noticeID)}>Delete</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button className="btn-sm btn-blue-700 text-md border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-green-700 border-green-700 hover:bg-transparent hover:text-green-700">Cancel</Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
