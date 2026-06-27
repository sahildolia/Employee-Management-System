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
import { HandleGetHRInterviews, HandlePostHRInterview, HandlePatchHRInterview, HandleDeleteHRInterview } from "../../../redux/Thunks/HRInterviewPageThunk.js"
import { HandleGetHRApplicants } from "../../../redux/Thunks/HRApplicantPageThunk.js"
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

export const CreateInterviewDialogBox = ({ children }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const HRApplicantState = useSelector((state) => state.HRApplicantPageReducer)
    const HRState = useSelector((state) => state.HRReducer)
    const [open, setOpen] = useState(false)
    const [selectedApplicant, setSelectedApplicant] = useState(null)
    const [formdata, setformdata] = useState({
        applicant: "",
        interviewer: HRState.data?.HR?._id || "",
        interviewdate: "",
    })

    const handleformchange = (event) => {
        CommonStateHandler(formdata, setformdata, event)
    }

    const CreateInterview = async () => {
        const result = await dispatch(HandlePostHRInterview({ apiroute: "CREATE", data: formdata }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({ title: "Success!", description: "Interview created successfully." })
            dispatch(HandleGetHRInterviews({ apiroute: "GETALL" }))
            setformdata({ applicant: "", interviewer: HRState.data?.HR?._id || "", interviewdate: "" })
            setSelectedApplicant(null)
            setOpen(false)
        } else {
            toast({ variant: "destructive", title: "Error!", description: result.payload?.message || "Failed to create interview." })
        }
    }

    const SelectApplicant = (appid, firstname, lastname) => {
        setformdata((prev) => ({ ...prev, applicant: appid }))
        setSelectedApplicant(`${firstname} ${lastname}`)
    }

    const clearForm = () => {
        setformdata({ applicant: "", interviewer: HRState.data?.HR?._id || "", interviewdate: "" })
        setSelectedApplicant(null)
    }

    const openDialog = () => {
        dispatch(HandleGetHRApplicants({ apiroute: "GETALL" }))
        setOpen(true)
    }

    const isFormValid = formdata.applicant && formdata.interviewdate

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {children ? (
                <DialogTrigger asChild onClick={openDialog}>{children}</DialogTrigger>
            ) : (
                <DialogTrigger className="bg-blue-600 text-white font-medium px-4 py-2 rounded-xl hover:bg-blue-700 transition shadow-md" onClick={openDialog}>
                    Schedule Interview
                </DialogTrigger>
            )}
            <DialogContent className="max-w-[95vw] lg:max-w-[50vw] 2xl:max-w-[40vw]">
                <div className="create-interview-container flex flex-col gap-5">
                    <div className="heading">
                        <h1 className="font-bold text-2xl">Schedule Interview</h1>
                    </div>
                    <div className="form-container grid md:grid-cols-2 min-[250px]:grid-cols-1 gap-4">
                        <div className="form-group flex flex-col gap-3">
                            <div className="label-input-field flex flex-col gap-1">
                                <label className="md:text-md lg:text-lg font-bold">Select Applicant</label>
                                {HRApplicantState.isLoading ? <Loading height={"h-auto"} /> :
                                    <Command className="rounded-lg border shadow-md">
                                        <CommandInput placeholder="Search applicant..." />
                                        <CommandList>
                                            <CommandEmpty>No applicants found.</CommandEmpty>
                                            <CommandGroup heading="Applicants">
                                                {HRApplicantState.data ? HRApplicantState.data.map((item, index) => (
                                                    <CommandItem key={index} onSelect={() => SelectApplicant(item._id, item.firstname, item.lastname)}>
                                                        <span>{`${item.firstname} ${item.lastname}`}</span>
                                                    </CommandItem>
                                                )) : null}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                }
                                {selectedApplicant && (
                                    <p className="text-sm font-semibold text-blue-700 mt-1">Selected: {selectedApplicant}</p>
                                )}
                            </div>
                        </div>
                        <div className="form-group flex flex-col gap-3">
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="interviewdate" className="md:text-md lg:text-lg font-bold">Interview Date</label>
                                <input type="date" id="interviewdate" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="interviewdate" value={formdata.interviewdate} onChange={handleformchange} />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label className="md:text-md lg:text-lg font-bold">Interviewer (HR)</label>
                                <input type="text" className="border-2 border-gray-300 rounded px-2 py-1 bg-gray-100"
                                    value={HRState.data?.HR?.firstname ? `${HRState.data.HR.firstname} ${HRState.data.HR.lastname}` : "Current HR"} disabled />
                            </div>
                        </div>
                    </div>
                    <div className="add-button flex items-center justify-center gap-3">
                        {
                            !isFormValid ?
                                <Button className="bg-blue-600 border-2 border-blue-600 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-600"
                                    onClick={() => toast({ variant: "destructive", title: "Error!", description: "Please fill all required fields." })}>
                                    Schedule Interview
                                </Button> :
                                <Button className="bg-blue-600 border-2 border-blue-600 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-600"
                                    onClick={() => CreateInterview()}>
                                    Schedule Interview
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

export const ViewInterviewDialogBox = ({ interviewData }) => {
    return (
        <Dialog>
            <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">
                View
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[50vw] 2xl:max-w-[40vw]">
                <div className="interview-data-container flex flex-col gap-4">
                    <div className="heading">
                        <h1 className="font-bold text-2xl text-blue-800">Interview Details</h1>
                    </div>
                    <div className="interview-details grid lg:grid-cols-2 min-[250px]:gap-2 lg:gap-10">
                        <div className="details-group-1 flex flex-col gap-3">
                            <div className="label-value-pair flex items-center gap-2">
                                <label className="font-bold md:text-sm xl:text-lg">Applicant :</label>
                                <p className="md:text-sm xl:text-lg">{interviewData.applicant?.firstname || ""} {interviewData.applicant?.lastname || ""}</p>
                            </div>
                            <div className="label-value-pair flex items-center gap-2">
                                <label className="font-bold md:text-sm xl:text-lg">Email :</label>
                                <p className="md:text-sm xl:text-lg">{interviewData.applicant?.email || "N/A"}</p>
                            </div>
                        </div>
                        <div className="details-group-2 flex flex-col gap-3">
                            <div className="label-value-pair flex items-center gap-2">
                                <label className="font-bold md:text-sm xl:text-lg">Interview Date :</label>
                                <p className="md:text-sm xl:text-lg">{interviewData.interviewdate ? new Date(interviewData.interviewdate).toLocaleDateString() : "N/A"}</p>
                            </div>
                            <div className="label-value-pair flex items-center gap-2">
                                <label className="font-bold md:text-sm xl:text-lg">Interviewer :</label>
                                <p className="md:text-sm xl:text-lg">{interviewData.interviewer?.firstname || ""} {interviewData.interviewer?.lastname || ""}</p>
                            </div>
                        </div>
                    </div>
                    {interviewData.feedback && (
                        <div className="interview-feedback border-2 border-gray-300 rounded-lg p-4">
                            <label className="font-bold md:text-sm xl:text-lg">Feedback :</label>
                            <p className="text-gray-800 mt-1">{interviewData.feedback}</p>
                        </div>
                    )}
                    <div className="label-value-pair flex items-center gap-2">
                        <label className="font-bold md:text-sm xl:text-lg">Status :</label>
                        <p className={`md:text-sm xl:text-lg font-bold ${interviewData.status === "Completed" ? "text-green-700" : interviewData.status === "Scheduled" ? "text-blue-700" : "text-amber-700"}`}>
                            {interviewData.status || "Scheduled"}
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const UpdateInterviewDialogBox = ({ interviewData }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const [formdata, setformdata] = useState({
        interviewID: interviewData._id,
        feedback: interviewData.feedback || "",
        status: interviewData.status || "Scheduled",
    })

    useEffect(() => {
        setformdata({
            interviewID: interviewData._id,
            feedback: interviewData.feedback || "",
            status: interviewData.status || "Scheduled",
        })
    }, [interviewData])

    const handleformchange = (event) => {
        const { name, value } = event.target;
        setformdata((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const UpdateInterview = async () => {
        const result = await dispatch(HandlePatchHRInterview({ apiroute: "UPDATE", data: formdata }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({ title: "Success!", description: "Interview updated successfully." })
            dispatch(HandleGetHRInterviews({ apiroute: "GETALL" }))
            setOpen(false)
        } else {
            toast({ variant: "destructive", title: "Error!", description: result.payload?.message || "Failed to update interview." })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">
                Feedback
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[50vw] 2xl:max-w-[40vw]">
                <div className="update-interview-container flex flex-col gap-5">
                    <div className="heading">
                        <h1 className="font-bold text-2xl">Update Interview</h1>
                        <p className="text-sm text-gray-600">{`${interviewData.applicant?.firstname || ""} ${interviewData.applicant?.lastname || ""}`}</p>
                    </div>
                    <div className="form-container flex flex-col gap-4">
                        <div className="label-input-field flex flex-col gap-1">
                            <label htmlFor="status" className="md:text-md lg:text-lg font-bold">Status</label>
                            <select id="status" className="border-2 border-gray-700 rounded px-2 py-1"
                                name="status" value={formdata.status} onChange={handleformchange}>
                                <option value="Scheduled">Scheduled</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="label-input-field flex flex-col gap-1">
                            <label htmlFor="feedback" className="md:text-md lg:text-lg font-bold">Feedback</label>
                            <textarea id="feedback" className="border-2 border-gray-700 rounded px-2 py-1 h-[150px] resize-none"
                                name="feedback" value={formdata.feedback} onChange={handleformchange} placeholder="Enter interview feedback..."></textarea>
                        </div>
                    </div>
                    <div className="add-button flex items-center justify-center gap-3">
                        <DialogClose asChild>
                            <Button className="bg-blue-800 border-2 border-blue-800 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-800"
                                onClick={() => UpdateInterview()}>
                                Update
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

export const DeleteInterviewDialogBox = ({ interviewID }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()

    const DeleteInterview = async (IID) => {
        const result = await dispatch(HandleDeleteHRInterview({ apiroute: `DELETE.${IID}` }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({ title: "Success!", description: "Interview deleted successfully." })
            dispatch(HandleGetHRInterviews({ apiroute: "GETALL" }))
        } else {
            toast({ variant: "destructive", title: "Error!", description: result.payload?.message || "Failed to delete interview." })
        }
    }

    return (
        <Dialog>
            <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">
                Delete
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-lg font-bold min-[250px]:text-center">Are you sure you want to delete this interview?</p>
                    <div className="delete-button-group flex gap-2">
                        <DialogClose asChild>
                            <Button className="btn-sm border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-red-700 border-red-700 hover:bg-transparent hover:text-red-700 text-white font-bold" onClick={() => DeleteInterview(interviewID)}>Delete</Button>
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
