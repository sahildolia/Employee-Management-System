import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { CommonStateHandler } from "../../../utils/commonhandler.js"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetHRRecruitment, HandlePostHRRecruitment, HandlePatchHRRecruitment, HandleDeleteHRRecruitment } from "../../../redux/Thunks/HRRecruitmentPageThunk.js"
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
import { useNavigate } from "react-router-dom"

export const CreateRecruitmentDialogBox = ({ children }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const HRDepartmentState = useSelector((state) => state.HRDepartmentPageReducer)
    const [open, setOpen] = useState(false)
    const [selectedDepartment, setSelectedDepartment] = useState(null)
    const [formdata, setformdata] = useState({
        jobtitle: "",
        description: "",
        department: "",
    })

    const handleformchange = (event) => {
        CommonStateHandler(formdata, setformdata, event)
    }

    const CreateRecruitment = async () => {
        const result = await dispatch(HandlePostHRRecruitment({ apiroute: "CREATE", data: formdata }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({ title: "Success!", description: "Recruitment created successfully." })
            dispatch(HandleGetHRRecruitment({ apiroute: "GETALL" }))
            setformdata({ jobtitle: "", description: "", department: "" })
            setSelectedDepartment(null)
            setOpen(false)
        } else {
            toast({ variant: "destructive", title: "Error!", description: result.payload?.message || "Failed to create recruitment." })
        }
    }

    const SelectDepartment = (deptid, deptname) => {
        setformdata((prev) => ({ ...prev, department: deptid }))
        setSelectedDepartment(deptname)
    }

    const clearForm = () => {
        setformdata({ jobtitle: "", description: "", department: "" })
        setSelectedDepartment(null)
    }

    const openDialog = () => {
        dispatch(HandleGetHRDepartments({ apiroute: "GETALL" }))
        setOpen(true)
    }

    const isFormValid = formdata.jobtitle.trim() && formdata.description.trim() && formdata.department

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {children ? (
                <DialogTrigger asChild onClick={openDialog}>{children}</DialogTrigger>
            ) : (
                <DialogTrigger className="bg-blue-600 text-white font-medium px-4 py-2 rounded-xl hover:bg-blue-700 transition shadow-md" onClick={openDialog}>
                    Create Recruitment
                </DialogTrigger>
            )}
            <DialogContent className="max-w-[95vw] lg:max-w-[50vw] 2xl:max-w-[40vw]">
                <div className="create-recruitment-container flex flex-col gap-5">
                    <div className="heading">
                        <h1 className="font-bold text-2xl">Create Recruitment</h1>
                    </div>
                    <div className="form-container grid md:grid-cols-2 min-[250px]:grid-cols-1 gap-4">
                        <div className="form-group flex flex-col gap-3">
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="jobtitle" className="md:text-md lg:text-lg font-bold">Job Title</label>
                                <input type="text" id="jobtitle" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="jobtitle" value={formdata.jobtitle} onChange={handleformchange} placeholder="Enter job title" />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label className="md:text-md lg:text-lg font-bold">Select Department</label>
                                {HRDepartmentState.isLoading ? <Loading height={"h-auto"} /> :
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
                                }
                                {selectedDepartment && (
                                    <p className="text-sm font-semibold text-blue-700 mt-1">Selected: {selectedDepartment}</p>
                                )}
                            </div>
                        </div>
                        <div className="form-group flex flex-col gap-3">
                            <div className="label-input-field flex flex-col gap-1 h-full">
                                <label htmlFor="description" className="md:text-md lg:text-lg font-bold">Description</label>
                                <textarea id="description" className="border-2 border-gray-700 rounded px-2 py-1 h-[200px] resize-none"
                                    name="description" value={formdata.description} onChange={handleformchange} placeholder="Job description..."></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="add-button flex items-center justify-center gap-3">
                        {
                            !isFormValid ?
                                <Button className="bg-blue-600 border-2 border-blue-600 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-600"
                                    onClick={() => toast({ variant: "destructive", title: "Error!", description: "Please fill all required fields." })}>
                                    Create Recruitment
                                </Button> :
                                <Button className="bg-blue-600 border-2 border-blue-600 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-600"
                                    onClick={() => CreateRecruitment()}>
                                    Create Recruitment
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

export const ViewRecruitmentDialogBox = ({ recruitmentData }) => {
    return (
        <Dialog>
            <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">
                View
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[50vw] 2xl:max-w-[40vw]">
                <div className="recruitment-data-container flex flex-col gap-4">
                    <div className="heading">
                        <h1 className="font-bold text-2xl text-blue-800">{recruitmentData.jobtitle}</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Department: {recruitmentData.department?.name || "N/A"}
                            &nbsp;|&nbsp;Applicants: {recruitmentData.applicants?.length || 0}
                        </p>
                    </div>
                    <div className="recruitment-description border-2 border-gray-300 rounded-lg p-4 min-h-[100px]">
                        <p className="text-gray-800 whitespace-pre-wrap">{recruitmentData.description || "No description provided."}</p>
                    </div>
                    <div className="recruitment-meta text-sm text-gray-500">
                        {recruitmentData.createdAt && <p>Posted: {new Date(recruitmentData.createdAt).toLocaleDateString()}</p>}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const UpdateRecruitmentDialogBox = ({ recruitmentData }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const HRDepartmentState = useSelector((state) => state.HRDepartmentPageReducer)
    const [open, setOpen] = useState(false)
    const [selectedDepartment, setSelectedDepartment] = useState(recruitmentData.department?.name || null)
    const [formdata, setformdata] = useState({
        recruitmentID: recruitmentData._id,
        UpdatedData: {
            jobtitle: recruitmentData.jobtitle || "",
            description: recruitmentData.description || "",
            department: recruitmentData.department?._id || "",
        }
    })

    useEffect(() => {
        setformdata({
            recruitmentID: recruitmentData._id,
            UpdatedData: {
                jobtitle: recruitmentData.jobtitle || "",
                description: recruitmentData.description || "",
                department: recruitmentData.department?._id || "",
            }
        })
        setSelectedDepartment(recruitmentData.department?.name || null)
    }, [recruitmentData])

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

    const SelectDepartment = (deptid, deptname) => {
        setformdata((prev) => ({
            ...prev,
            UpdatedData: {
                ...prev.UpdatedData,
                department: deptid
            }
        }))
        setSelectedDepartment(deptname)
    }

    const UpdateRecruitment = async () => {
        const result = await dispatch(HandlePatchHRRecruitment({ apiroute: "UPDATE", data: formdata }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({ title: "Success!", description: "Recruitment updated successfully." })
            dispatch(HandleGetHRRecruitment({ apiroute: "GETALL" }))
            setOpen(false)
        } else {
            toast({ variant: "destructive", title: "Error!", description: result.payload?.message || "Failed to update recruitment." })
        }
    }

    const openDialog = () => {
        dispatch(HandleGetHRDepartments({ apiroute: "GETALL" }))
        setOpen(true)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white" onClick={openDialog}>
                Edit
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[50vw] 2xl:max-w-[40vw]">
                <div className="update-recruitment-container flex flex-col gap-5">
                    <div className="heading">
                        <h1 className="font-bold text-2xl">Update Recruitment</h1>
                    </div>
                    <div className="form-container grid md:grid-cols-2 min-[250px]:grid-cols-1 gap-4">
                        <div className="form-group flex flex-col gap-3">
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="jobtitle" className="md:text-md lg:text-lg font-bold">Job Title</label>
                                <input type="text" id="jobtitle" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="jobtitle" value={formdata.UpdatedData.jobtitle} onChange={handleformchange} />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label className="md:text-md lg:text-lg font-bold">Department</label>
                                {HRDepartmentState.isLoading ? <Loading height={"h-auto"} /> :
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
                                }
                                {selectedDepartment && (
                                    <p className="text-sm font-semibold text-blue-700 mt-1">Selected: {selectedDepartment}</p>
                                )}
                            </div>
                        </div>
                        <div className="form-group flex flex-col gap-3">
                            <div className="label-input-field flex flex-col gap-1 h-full">
                                <label htmlFor="description" className="md:text-md lg:text-lg font-bold">Description</label>
                                <textarea id="description" className="border-2 border-gray-700 rounded px-2 py-1 h-[200px] resize-none"
                                    name="description" value={formdata.UpdatedData.description} onChange={handleformchange}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="add-button flex items-center justify-center gap-3">
                        <DialogClose asChild>
                            <Button className="bg-blue-800 border-2 border-blue-800 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-800"
                                onClick={() => UpdateRecruitment()}>
                                Update Recruitment
                            </Button>
                        </DialogClose>
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

export const DeleteRecruitmentDialogBox = ({ recruitmentID }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()

    const DeleteRecruitment = async (RID) => {
        const result = await dispatch(HandleDeleteHRRecruitment({ apiroute: `DELETE.${RID}` }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({ title: "Success!", description: "Recruitment deleted successfully." })
            dispatch(HandleGetHRRecruitment({ apiroute: "GETALL" }))
        } else {
            toast({ variant: "destructive", title: "Error!", description: result.payload?.message || "Failed to delete recruitment." })
        }
    }

    return (
        <Dialog>
            <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">
                Delete
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-lg font-bold min-[250px]:text-center">Are you sure you want to delete this recruitment?</p>
                    <div className="delete-button-group flex gap-2">
                        <DialogClose asChild>
                            <Button className="btn-sm border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-red-700 border-red-700 hover:bg-transparent hover:text-red-700 text-white font-bold" onClick={() => DeleteRecruitment(recruitmentID)}>Delete</Button>
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
