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
import { HandleGetHRCalendarEvents, HandlePostHRCalendarEvent, HandlePatchHRCalendarEvent, HandleDeleteHRCalendarEvent } from "../../../redux/Thunks/HRCalendarPageThunk.js"
import { useToast } from "../../../hooks/use-toast.js"

export const CreateEventDialogBox = ({ children }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const [formdata, setformdata] = useState({
        eventtitle: "",
        eventdate: "",
        description: "",
        audience: "All",
    })

    const handleformchange = (event) => {
        CommonStateHandler(formdata, setformdata, event)
    }

    const CreateEvent = async () => {
        const result = await dispatch(HandlePostHRCalendarEvent({ apiroute: "CREATE", data: formdata }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({ title: "Success!", description: "Event created successfully." })
            dispatch(HandleGetHRCalendarEvents({ apiroute: "GETALL" }))
            setformdata({ eventtitle: "", eventdate: "", description: "", audience: "All" })
            setOpen(false)
        } else {
            toast({ variant: "destructive", title: "Error!", description: result.payload?.message || "Failed to create event." })
        }
    }

    const clearForm = () => {
        setformdata({ eventtitle: "", eventdate: "", description: "", audience: "All" })
    }

    const isFormValid = formdata.eventtitle.trim() && formdata.eventdate

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {children ? (
                <DialogTrigger asChild onClick={() => setOpen(true)}>{children}</DialogTrigger>
            ) : (
                <DialogTrigger className="bg-blue-600 text-white font-medium px-4 py-2 rounded-xl hover:bg-blue-700 transition shadow-md" onClick={() => setOpen(true)}>
                    Create Event
                </DialogTrigger>
            )}
            <DialogContent className="max-w-[95vw] lg:max-w-[50vw] 2xl:max-w-[40vw]">
                <div className="create-event-container flex flex-col gap-5">
                    <div className="heading">
                        <h1 className="font-bold text-2xl">Create Corporate Event</h1>
                    </div>
                    <div className="form-container grid md:grid-cols-2 min-[250px]:grid-cols-1 gap-4">
                        <div className="form-group flex flex-col gap-3">
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="eventtitle" className="md:text-md lg:text-lg font-bold">Event Title</label>
                                <input type="text" id="eventtitle" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="eventtitle" value={formdata.eventtitle} onChange={handleformchange} placeholder="Enter event title" />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="eventdate" className="md:text-md lg:text-lg font-bold">Event Date</label>
                                <input type="date" id="eventdate" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="eventdate" value={formdata.eventdate} onChange={handleformchange} />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="audience" className="md:text-md lg:text-lg font-bold">Audience</label>
                                <select id="audience" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="audience" value={formdata.audience} onChange={handleformchange}>
                                    <option value="All">All</option>
                                    <option value="HR">HR Only</option>
                                    <option value="Employees">Employees Only</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group flex flex-col gap-3">
                            <div className="label-input-field flex flex-col gap-1 h-full">
                                <label htmlFor="description" className="md:text-md lg:text-lg font-bold">Description</label>
                                <textarea id="description" className="border-2 border-gray-700 rounded px-2 py-1 h-[150px] resize-none"
                                    name="description" value={formdata.description} onChange={handleformchange} placeholder="Event description..."></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="add-button flex items-center justify-center gap-3">
                        {
                            !isFormValid ?
                                <Button className="bg-blue-600 border-2 border-blue-600 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-600"
                                    onClick={() => toast({ variant: "destructive", title: "Error!", description: "Please fill all required fields." })}>
                                    Create Event
                                </Button> :
                                <Button className="bg-blue-600 border-2 border-blue-600 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-600"
                                    onClick={() => CreateEvent()}>
                                    Create Event
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

export const ViewEventDialogBox = ({ eventData, children }) => {
    return (
        <Dialog>
            {/* <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">
                View
            </DialogTrigger> */}
                  <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[50vw] 2xl:max-w-[40vw]">
                <div className="event-data-container flex flex-col gap-4">
                    <div className="heading">
                        <h1 className="font-bold text-2xl text-blue-800">{eventData.eventtitle || eventData.title}</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {eventData.eventdate ? new Date(eventData.eventdate).toLocaleDateString() : "N/A"}
                            &nbsp;|&nbsp;Audience: {eventData.audience || "All"}
                        </p>
                    </div>
                    <div className="event-description border-2 border-gray-300 rounded-lg p-4 min-h-[100px]">
                        <p className="text-gray-800 whitespace-pre-wrap">{eventData.description || "No description provided."}</p>
                    </div>
                    <div className="event-meta text-sm text-gray-500">
                        {eventData.createdAt && <p>Created: {new Date(eventData.createdAt).toLocaleDateString()}</p>}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const UpdateEventDialogBox = ({ eventData, children }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const [formdata, setformdata] = useState({
        eventID: eventData._id,
        UpdatedData: {
            eventtitle: eventData.eventtitle || eventData.title || "",
            eventdate: eventData.eventdate ? eventData.eventdate.split("T")[0] : "",
            description: eventData.description || "",
            audience: eventData.audience || "All",
        }
    })

    useEffect(() => {
        setformdata({
            eventID: eventData._id,
            UpdatedData: {
                eventtitle: eventData.eventtitle || eventData.title || "",
                eventdate: eventData.eventdate ? eventData.eventdate.split("T")[0] : "",
                description: eventData.description || "",
                audience: eventData.audience || "All",
            }
        })
    }, [eventData])

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

    const UpdateEvent = async () => {
        const result = await dispatch(HandlePatchHRCalendarEvent({ apiroute: "UPDATE", data: formdata }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({ title: "Success!", description: "Event updated successfully." })
            dispatch(HandleGetHRCalendarEvents({ apiroute: "GETALL" }))
            setOpen(false)
        } else {
            toast({ variant: "destructive", title: "Error!", description: result.payload?.message || "Failed to update event." })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">
                Edit
            </DialogTrigger> */}
                  <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[50vw] 2xl:max-w-[40vw]">
                <div className="update-event-container flex flex-col gap-5">
                    <div className="heading">
                        <h1 className="font-bold text-2xl">Update Event</h1>
                    </div>
                    <div className="form-container grid md:grid-cols-2 min-[250px]:grid-cols-1 gap-4">
                        <div className="form-group flex flex-col gap-3">
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="eventtitle" className="md:text-md lg:text-lg font-bold">Event Title</label>
                                <input type="text" id="eventtitle" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="eventtitle" value={formdata.UpdatedData.eventtitle} onChange={handleformchange} />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="eventdate" className="md:text-md lg:text-lg font-bold">Event Date</label>
                                <input type="date" id="eventdate" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="eventdate" value={formdata.UpdatedData.eventdate} onChange={handleformchange} />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="audience" className="md:text-md lg:text-lg font-bold">Audience</label>
                                <select id="audience" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="audience" value={formdata.UpdatedData.audience} onChange={handleformchange}>
                                    <option value="All">All</option>
                                    <option value="HR">HR Only</option>
                                    <option value="Employees">Employees Only</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group flex flex-col gap-3">
                            <div className="label-input-field flex flex-col gap-1 h-full">
                                <label htmlFor="description" className="md:text-md lg:text-lg font-bold">Description</label>
                                <textarea id="description" className="border-2 border-gray-700 rounded px-2 py-1 h-[150px] resize-none"
                                    name="description" value={formdata.UpdatedData.description} onChange={handleformchange}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="add-button flex items-center justify-center gap-3">
                        <DialogClose asChild>
                            <Button className="bg-blue-800 border-2 border-blue-800 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-800"
                                onClick={() => UpdateEvent()}>
                                Update Event
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

export const DeleteEventDialogBox = ({ eventID, children }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()

    const DeleteEvent = async (EID) => {
        const result = await dispatch(HandleDeleteHRCalendarEvent({ apiroute: `DELETE.${EID}` }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({ title: "Success!", description: "Event deleted successfully." })
            dispatch(HandleGetHRCalendarEvents({ apiroute: "GETALL" }))
        } else {
            toast({ variant: "destructive", title: "Error!", description: result.payload?.message || "Failed to delete event." })
        }
    }

    return (
        <Dialog>
             <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-lg font-bold min-[250px]:text-center">Are you sure you want to delete this event?</p>
                    <div className="delete-button-group flex gap-2">
                        <DialogClose asChild>
                            <Button className="btn-sm border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-red-700 border-red-700 hover:bg-transparent hover:text-red-700 text-white font-bold" onClick={() => DeleteEvent(eventID)}>Delete</Button>
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
