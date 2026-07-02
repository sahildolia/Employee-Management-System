import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { CommonStateHandler } from "../../../utils/commonhandler.js"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetHRApplicants, HandlePostHRApplicant, HandlePatchHRApplicant, HandleDeleteHRApplicant } from "../../../redux/Thunks/HRApplicantPageThunk.js"
import { HandleGetHRRecruitment } from "../../../redux/Thunks/HRRecruitmentPageThunk.js"
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

export const CreateApplicantDialogBox = ({ children, recruitmentID }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const HRRecruitmentState = useSelector((state) => state.HRRecruitmentPageReducer)
    const [open, setOpen] = useState(false)
    const [selectedRecruitment, setSelectedRecruitment] = useState(null)
    const [formdata, setformdata] = useState({
        firstname: "",
        lastname: "",
        email: "",
        contactnumber: "",
        appliedrole: recruitmentID || "",
        recruitmentstatus: "Not Specified",
    })

    useEffect(() => {
        if (recruitmentID) {
            setformdata((prev) => ({ ...prev, appliedrole: recruitmentID }))
        }
    }, [recruitmentID])

    const handleformchange = (event) => {
        CommonStateHandler(formdata, setformdata, event)
    }

    const CreateApplicant = async () => {
        const result = await dispatch(HandlePostHRApplicant({ apiroute: "CREATE", data: formdata }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({ title: "Success!", description: "Applicant created successfully." })
            dispatch(HandleGetHRApplicants({ apiroute: "GETALL" }))
            setformdata({ firstname: "", lastname: "", email: "", contactnumber: "", appliedrole: "", recruitmentstatus: "Not Specified" })
            setSelectedRecruitment(null)
            setOpen(false)
        } else {
            toast({ variant: "destructive", title: "Error!", description: result.payload?.message || "Failed to create applicant." })
        }
    }

    const SelectRecruitment = (rid, jobtitle) => {
        setformdata((prev) => ({ ...prev, appliedrole: rid }))
        setSelectedRecruitment(jobtitle)
    }

    const clearForm = () => {
        setformdata({ firstname: "", lastname: "", email: "", contactnumber: "", appliedrole: "", recruitmentstatus: "Not Specified" })
        setSelectedRecruitment(null)
    }

    const openDialog = () => {
        dispatch(HandleGetHRRecruitment({ apiroute: "GETALL" }))
        setOpen(true)
    }

    const isFormValid = formdata.firstname.trim() && formdata.lastname.trim() && formdata.email.trim() && formdata.contactnumber.trim()

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {children ? (
                <DialogTrigger asChild onClick={openDialog}>{children}</DialogTrigger>
            ) : (
                <DialogTrigger className="bg-blue-600 text-white font-medium px-4 py-2 rounded-xl hover:bg-blue-700 transition shadow-md" onClick={openDialog}>
                    Add Applicant
                </DialogTrigger>
            )}
            <DialogContent className="max-w-[95vw] lg:max-w-[55vw] 2xl:max-w-[45vw]">
                <div className="create-applicant-container flex flex-col gap-5">
                    <div className="heading">
                        <h1 className="font-bold text-2xl">Add Applicant</h1>
                    </div>
                    <div className="form-container grid md:grid-cols-2 min-[250px]:grid-cols-1 gap-4">
                        <div className="form-group flex flex-col gap-3">
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="firstname" className="md:text-md lg:text-lg font-bold">First Name</label>
                                <input type="text" id="firstname" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="firstname" value={formdata.firstname} onChange={handleformchange} placeholder="First name" />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="lastname" className="md:text-md lg:text-lg font-bold">Last Name</label>
                                <input type="text" id="lastname" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="lastname" value={formdata.lastname} onChange={handleformchange} placeholder="Last name" />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="email" className="md:text-md lg:text-lg font-bold">Email</label>
                                <input type="email" id="email" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="email" value={formdata.email} onChange={handleformchange} placeholder="Email address" />
                            </div>
                        </div>
                        <div className="form-group flex flex-col gap-3">
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="contactnumber" className="md:text-md lg:text-lg font-bold">Contact Number</label>
                                <input type="text" id="contactnumber" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="contactnumber" value={formdata.contactnumber} onChange={handleformchange} placeholder="Contact number" />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label className="md:text-md lg:text-lg font-bold">Applied Role</label>
                                {HRRecruitmentState.isLoading ? <Loading height={"h-auto"} /> :
                                    <Command className="rounded-lg border shadow-md">
                                        <CommandInput placeholder="Search recruitment..." />
                                        <CommandList>
                                            <CommandEmpty>No recruitments found.</CommandEmpty>
                                            <CommandGroup heading="Recruitments">
                                                {HRRecruitmentState.data ? HRRecruitmentState.data.map((item, index) => (
                                                    <CommandItem key={index} onSelect={() => SelectRecruitment(item._id, item.jobtitle)}>
                                                        <span>{item.jobtitle}</span>
                                                    </CommandItem>
                                                )) : null}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                }
                                {selectedRecruitment && (
                                    <p className="text-sm font-semibold text-blue-700 mt-1">Selected: {selectedRecruitment}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="add-button flex items-center justify-center gap-3">
                        {
                            !isFormValid ?
                                <Button className="bg-blue-600 border-2 border-blue-600 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-600"
                                    onClick={() => toast({ variant: "destructive", title: "Error!", description: "Please fill all required fields." })}>
                                    Add Applicant
                                </Button> :
                                <Button className="bg-blue-600 border-2 border-blue-600 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-600"
                                    onClick={() => CreateApplicant()}>
                                    Add Applicant
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

export const ViewApplicantDialogBox = ({ applicantData, children }) => {
    return (
        <Dialog>
            {/* <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">
                View
            </DialogTrigger> */}
            <DialogTrigger asChild>
    {children}
</DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[50vw] 2xl:max-w-[40vw]">
                <div className="applicant-data-container flex flex-col gap-4">
                    <div className="employee-profile-logo flex items-center gap-3">
                        <div className="logo border-2 border-blue-800 rounded-[50%] flex justify-center items-center">
                            <p className="font-bold text-2xl text-blue-700 p-2">
                                {`${(applicantData.firstname || "?").slice(0, 1).toUpperCase()} ${(applicantData.lastname || "?").slice(0, 1).toUpperCase()}`}
                            </p>
                        </div>
                        <div className="employee-fullname">
                            <p className="font-bold text-2xl">{`${applicantData.firstname || ""} ${applicantData.lastname || ""}`}</p>
                        </div>
                    </div>
                    <div className="applicant-all-details grid lg:grid-cols-2 min-[250px]:gap-2 lg:gap-10">
                        <div className="details-group-1 flex flex-col gap-3">
                            <div className="label-value-pair flex items-center gap-2">
                                <label className="font-bold md:text-sm xl:text-lg">Email :</label>
                                <p className="md:text-sm xl:text-lg">{applicantData.email}</p>
                            </div>
                            <div className="label-value-pair flex items-center gap-2">
                                <label className="font-bold md:text-sm xl:text-lg">Contact :</label>
                                <p className="md:text-sm xl:text-lg">{applicantData.contactnumber}</p>
                            </div>
                        </div>
                        <div className="details-group-2 flex flex-col gap-3">
                            <div className="label-value-pair flex items-center gap-2">
                                <label className="font-bold md:text-sm xl:text-lg">Applied Role :</label>
                                <p className="md:text-sm xl:text-lg">{applicantData.appliedrole?.jobtitle || "N/A"}</p>
                            </div>
                            <div className="label-value-pair flex items-center gap-2">
                                <label className="font-bold md:text-sm xl:text-lg">Status :</label>
                                <p className={`md:text-sm xl:text-lg font-bold ${applicantData.recruitmentstatus === "Conduct-Interview" ? "text-blue-700" : applicantData.recruitmentstatus === "Rejected" ? "text-red-700" : applicantData.recruitmentstatus === "Interview Completed" ? "text-green-700" : "text-amber-700"}`}>
                                    {applicantData.recruitmentstatus}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const UpdateApplicantStatusDialogBox = ({ applicantData,  children }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState(applicantData.recruitmentstatus || "Not Specified")

    useEffect(() => {
        setStatus(applicantData.recruitmentstatus || "Not Specified")
    }, [applicantData])

    const UpdateStatus = async () => {
        const result = await dispatch(HandlePatchHRApplicant({
            apiroute: "UPDATE",
            data: { applicantID: applicantData._id, recruitmentstatus: status }
        }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({ title: "Success!", description: "Applicant status updated successfully." })
            dispatch(HandleGetHRApplicants({ apiroute: "GETALL" }))
            setOpen(false)
        } else {
            toast({ variant: "destructive", title: "Error!", description: result.payload?.message || "Failed to update status." })
        }
    }

    const statusOptions = ["Conduct-Interview", "Rejected", "Pending", "Interview Completed", "Not Specified"]

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">
                Update Status
            </DialogTrigger> */}
            <DialogTrigger asChild>
    {children}
</DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[40vw] 2xl:max-w-[35vw]">
                <div className="flex flex-col gap-5">
                    <h1 className="font-bold text-2xl">Update Applicant Status</h1>
                    <p className="text-gray-700 font-semibold">{`${applicantData.firstname || ""} ${applicantData.lastname || ""}`}</p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {statusOptions.map((option) => (
                            <Button key={option}
                                className={`px-4 py-2 text-white font-bold rounded-lg border-2 ${status === option ? "bg-blue-700 border-blue-700" : "bg-white border-blue-700 text-blue-700"}`}
                                onClick={() => setStatus(option)}>
                                {option}
                            </Button>
                        ))}
                    </div>
                    <div className="submit-button flex justify-center">
                        <Button className="bg-blue-600 border-2 border-blue-600 px-6 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-600"
                            onClick={() => UpdateStatus()}>
                            Update Status
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const DeleteApplicantDialogBox = ({ applicantID, children }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()

    const DeleteApplicant = async (AID) => {
        const result = await dispatch(HandleDeleteHRApplicant({ apiroute: `DELETE.${AID}` }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({ title: "Success!", description: "Applicant deleted successfully." })
            dispatch(HandleGetHRApplicants({ apiroute: "GETALL" }))
        } else {
            toast({ variant: "destructive", title: "Error!", description: result.payload?.message || "Failed to delete applicant." })
        }
    }

    return (
        <Dialog>
            {/* <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">
                Delete 
            </DialogTrigger> */}
            <DialogTrigger asChild>
    {children}
</DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-lg font-bold min-[250px]:text-center">Are you sure you want to delete this applicant?</p>
                    <div className="delete-button-group flex gap-2">
                        <DialogClose asChild>
                            <Button className="btn-sm border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-red-700 border-red-700 hover:bg-transparent hover:text-red-700 text-white font-bold" onClick={() => DeleteApplicant(applicantID)}>Delete</Button>
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
