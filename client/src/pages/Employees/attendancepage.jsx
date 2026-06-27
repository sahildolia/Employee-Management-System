import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetMyAttendance, HandlePostMyAttendance, HandleGetMyProfile } from "../../redux/Thunks/EmployeeDashboardThunk"
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
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "../../hooks/use-toast"
import { CheckCircle2, XCircle, HelpCircle, CalendarCheck, RefreshCw } from "lucide-react"

export const AttendancePage = () => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const EmpState = useSelector((s) => s.EmployeeDashboardReducer)
    const [markOpen, setMarkOpen] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState("")
    const [initOpen, setInitOpen] = useState(false)

    useEffect(() => {
        dispatch(HandleGetMyAttendance({ apiroute: "MY_ATTENDANCE" }))
        dispatch(HandleGetMyProfile({ apiroute: "MY_PROFILE" }))
    }, [])

    const attendance = EmpState.attendance
    const profile = EmpState.profile
    const records = useMemo(() => {
        if (!attendance) return []
        const logs = attendance.attendancelog || []
        return logs.map((log) => ({
            ...log,
            _id: log._id || attendance._id,
            date: log.logdate,
            status: log.logstatus
        }))
    }, [attendance])

    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const monthlyRecords = useMemo(() => {
        return records.filter((r) => {
            if (!r.date) return false
            const d = new Date(r.date)
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear
        })
    }, [records, currentMonth, currentYear])

    const monthSummary = useMemo(() => {
        const present = monthlyRecords.filter((r) => r.status === "Present").length
        const absent = monthlyRecords.filter((r) => r.status === "Absent").length
        const notSpecified = monthlyRecords.filter((r) => r.status !== "Present" && r.status !== "Absent").length
        return { present, absent, notSpecified }
    }, [monthlyRecords])

    const todayRecord = useMemo(() => {
        const today = new Date().toISOString().split("T")[0]
        return records.find((r) => {
            const d = r.date ? new Date(r.date).toISOString().split("T")[0] : ""
            return d === today
        })
    }, [records])

    const handleInitialize = async () => {
        if (!profile?._id) {
            toast({ variant: "destructive", title: "Error!", description: "Profile not loaded." })
            return
        }
        const result = await dispatch(HandlePostMyAttendance({
            apiroute: "INITIALIZE_ATTENDANCE",
            data: { employeeID: profile._id }
        }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({ title: "Success!", description: "Attendance initialized successfully." })
            setInitOpen(false)
            dispatch(HandleGetMyAttendance({ apiroute: "MY_ATTENDANCE" }))
        } else {
            toast({ variant: "destructive", title: "Error!", description: result.payload?.message || "Failed to initialize attendance." })
        }
    }

    const handleMarkAttendance = async () => {
        if (!selectedStatus) {
            toast({ variant: "destructive", title: "Error!", description: "Please select a status." })
            return
        }
        const today = new Date().toISOString().split("T")[0]
        const attendanceID = todayRecord?._id
        const result = await dispatch(HandlePostMyAttendance({
            apiroute: "UPDATE_ATTENDANCE",
            data: { attendanceID, status: selectedStatus, currentdate: today }
        }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({ title: "Success!", description: `Attendance marked as ${selectedStatus}.` })
            setMarkOpen(false)
            setSelectedStatus("")
            dispatch(HandleGetMyAttendance({ apiroute: "MY_ATTENDANCE" }))
        } else {
            toast({ variant: "destructive", title: "Error!", description: result.payload?.message || "Failed to mark attendance." })
        }
    }

    if (EmpState.isLoading && !EmpState.attendance) {
        return <Loading />
    }

    const statCards = [
        { title: "Present", value: monthSummary.present, color: "bg-green-50", text: "text-green-600", icon: CheckCircle2 },
        { title: "Absent", value: monthSummary.absent, color: "bg-red-50", text: "text-red-600", icon: XCircle },
        { title: "Not Specified", value: monthSummary.notSpecified, color: "bg-gray-50", text: "text-gray-600", icon: HelpCircle },
        { title: "Total Records", value: monthlyRecords.length, color: "bg-blue-50", text: "text-blue-600", icon: CalendarCheck },
    ]

    const todayStatus = todayRecord ? todayRecord.status : "Not Marked"
    const hasNoRecords = records.length === 0

    return (
        <div className="w-full flex flex-col gap-5 min-h-0 flex-1 p-2 md:p-4">
            <div className="flex justify-between items-center md:pe-5">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Attendance</h1>
                <div className="flex gap-2">
                    {hasNoRecords ? (
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl shadow-md flex items-center gap-2"
                            onClick={() => setInitOpen(true)}>
                            <RefreshCw size={18} /> Initialize Attendance
                        </Button>
                    ) : (
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl shadow-md flex items-center gap-2"
                            onClick={() => setMarkOpen(true)}>
                            <CalendarCheck size={18} /> Mark Today
                        </Button>
                    )}
                </div>
            </div>

            {hasNoRecords ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                    <p className="text-xl font-bold text-gray-600">No attendance records found.</p>
                    <p className="text-sm text-gray-500">Click "Initialize Attendance" to create your attendance record.</p>
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-4 md:pe-5 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                        <span className="text-lg font-bold">Today's Status:</span>
                        <span className={`px-4 py-2 rounded-lg text-sm font-bold text-white ${todayStatus === "Present" ? "bg-green-700" : todayStatus === "Absent" ? "bg-red-700" : "bg-gray-500"}`}>
                            {todayStatus}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:pe-5">
                        {statCards.map((stat) => {
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
                            <HeadingBar table_layout={"grid-cols-3"} table_headings={["Date", "Status", "Record ID"]} />
                        </ListWrapper>
                        <ListContainer>
                            {monthlyRecords.length > 0 ? [...monthlyRecords].reverse().map((item) => (
                                <div key={item._id} className="list-item-container grid min-[250px]:grid-cols-2 sm:grid-cols-3 py-1 gap-2 justify-center items-center border-b-2 border-blue-800">
                                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-start overflow-hidden text-ellipsis">
                                        {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}
                                    </div>
                                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                                        <span className={`px-2 py-1 rounded-lg text-xs font-bold text-white inline-flex items-center gap-1 ${item.status === "Present" ? "bg-green-700" : item.status === "Absent" ? "bg-red-700" : "bg-gray-500"}`}>
                                            {item.status === "Present" ? <CheckCircle2 size={14} /> : item.status === "Absent" ? <XCircle size={14} /> : <HelpCircle size={14} />}
                                            {item.status}
                                        </span>
                                    </div>
                                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                                        <span className="text-xs text-gray-500">{item._id?.slice(-6)}</span>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-8 text-gray-500 font-bold">No records for this month.</div>
                            )}
                        </ListContainer>
                    </div>
                </>
            )}

            <Dialog open={initOpen} onOpenChange={setInitOpen}>
                <DialogContent className="max-w-[95vw] lg:max-w-[40vw] 2xl:max-w-[35vw]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Initialize Attendance</DialogTitle>
                        <DialogDescription>Create your attendance record to start marking daily attendance.</DialogDescription>
                    </DialogHeader>
                    <p className="text-sm text-gray-600">This will create a new attendance record for you. Once created, you can mark your daily status.</p>
                    <DialogFooter className="flex gap-2 mt-4">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold" onClick={handleInitialize}>
                            Initialize
                        </Button>
                        <DialogClose asChild>
                            <Button variant="outline" className="border-red-700 text-red-700 hover:bg-red-50">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={markOpen} onOpenChange={setMarkOpen}>
                <DialogContent className="max-w-[95vw] lg:max-w-[40vw] 2xl:max-w-[35vw]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Mark Today's Attendance</DialogTitle>
                        <DialogDescription>Select your attendance status for today ({new Date().toLocaleDateString()}).</DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center gap-4 py-6">
                        <Button
                            className={`px-8 py-4 text-lg font-bold rounded-lg border-2 ${selectedStatus === "Present" ? "bg-green-700 border-green-700 text-white" : "bg-white border-green-700 text-green-700 hover:bg-green-50"}`}
                            onClick={() => setSelectedStatus("Present")}>
                            <CheckCircle2 size={20} className="mr-2" /> Present
                        </Button>
                        <Button
                            className={`px-8 py-4 text-lg font-bold rounded-lg border-2 ${selectedStatus === "Absent" ? "bg-red-700 border-red-700 text-white" : "bg-white border-red-700 text-red-700 hover:bg-red-50"}`}
                            onClick={() => setSelectedStatus("Absent")}>
                            <XCircle size={20} className="mr-2" /> Absent
                        </Button>
                    </div>
                    <DialogFooter className="flex gap-2">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
                            disabled={!selectedStatus} onClick={handleMarkAttendance}>
                            Confirm - {selectedStatus || "Select Status"}
                        </Button>
                        <DialogClose asChild>
                            <Button variant="outline" className="border-red-700 text-red-700 hover:bg-red-50">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
