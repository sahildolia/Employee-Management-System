import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetMyProfile, HandlePatchMyProfile } from "../../redux/Thunks/EmployeeDashboardThunk"
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
import { User, Mail, Phone, Building2, Edit3, Save } from "lucide-react"

const ProfileField = ({ label, value, icon: Icon }) => (
    <div className="flex items-center gap-3 p-3 border-b border-slate-100 last:border-0">
        <div className="bg-blue-100 p-2 rounded-lg">
            <Icon size={20} className="text-blue-600" />
        </div>
        <div className="flex-1">
            <p className="text-xs text-slate-500 font-semibold">{label}</p>
            <p className="font-bold text-slate-800">{value || "N/A"}</p>
        </div>
    </div>
)

export const ProfilePage = () => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const EmpState = useSelector((s) => s.EmployeeDashboardReducer)
    const [editOpen, setEditOpen] = useState(false)
    const [contactNumber, setContactNumber] = useState("")

    useEffect(() => {
        dispatch(HandleGetMyProfile({ apiroute: "MY_PROFILE" }))
    }, [])

    const profile = EmpState.profile

    useEffect(() => {
        if (profile?.contactnumber) {
            setContactNumber(profile.contactnumber)
        }
    }, [profile])

    const handleUpdateContact = async () => {
        if (!contactNumber.trim()) {
            toast({ variant: "destructive", title: "Error!", description: "Contact number cannot be empty." })
            return
        }
        const result = await dispatch(HandlePatchMyProfile({
            apiroute: "UPDATE_PROFILE",
            data: { employeeId: profile?._id, updatedEmployee: { contactnumber: contactNumber } }
        }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({ title: "Success!", description: "Contact number updated successfully." })
            setEditOpen(false)
            dispatch(HandleGetMyProfile({ apiroute: "MY_PROFILE" }))
        } else {
            toast({ variant: "destructive", title: "Error!", description: result.payload?.message || "Failed to update profile." })
        }
    }

    if (EmpState.isLoading && !EmpState.profile) {
        return <Loading />
    }

    return (
        <div className="w-full flex flex-col gap-5 min-h-0 flex-1 p-2 md:p-4">
            <div className="flex justify-between items-center md:pe-5">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">My Profile</h1>
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl shadow-md flex items-center gap-2">
                            <Edit3 size={18} /> Edit Contact
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[95vw] lg:max-w-[40vw] 2xl:max-w-[35vw]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">Update Contact Number</DialogTitle>
                            <DialogDescription>Update your contact number below.</DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-4 py-4">
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="contactnumber" className="font-bold">Contact Number</Label>
                                <Input id="contactnumber" type="text" value={contactNumber}
                                    onChange={(e) => setContactNumber(e.target.value)} placeholder="Enter new contact number" />
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <p className="text-sm text-blue-700 font-semibold">Note: Only contact number can be modified. Other profile details are read-only.</p>
                            </div>
                        </div>
                        <DialogFooter className="flex gap-2">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-2"
                                onClick={handleUpdateContact}>
                                <Save size={16} /> Save Changes
                            </Button>
                            <DialogClose asChild>
                                <Button variant="outline" className="border-red-700 text-red-700 hover:bg-red-50">Cancel</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="md:pe-5">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-blue-600 px-6 py-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-white rounded-full p-3">
                                <User size={32} className="text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                    {profile?.firstname || ""} {profile?.lastname || ""}
                                </h2>
                                <p className="text-blue-100 text-sm">Employee</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <ProfileField label="First Name" value={profile?.firstname} icon={User} />
                        <ProfileField label="Last Name" value={profile?.lastname} icon={User} />
                        <ProfileField label="Email Address" value={profile?.email} icon={Mail} />
                        <ProfileField label="Contact Number" value={profile?.contactnumber} icon={Phone} />
                        <ProfileField label="Department" value={profile?.department?.name || "Not Assigned"} icon={Building2} />
                    </div>
                </div>
            </div>
        </div>
    )
}
