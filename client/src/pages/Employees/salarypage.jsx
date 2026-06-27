import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetMySalary } from "../../redux/Thunks/EmployeeDashboardThunk"
import { ListWrapper, HeadingBar, ListContainer } from "../../components/common/Dashboard/ListDesigns"
import { Loading } from "../../components/common/loading.jsx"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { DollarSign, CreditCard, Banknote, Wallet, Eye } from "lucide-react"

const ViewSalaryDialog = ({ salaryData }) => {
    return (
        <Dialog>
            <DialogTrigger className="btn-sm border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">
                <Eye size={16} />
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[50vw] 2xl:max-w-[40vw]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-blue-800">Salary Details</DialogTitle>
                </DialogHeader>
                <div className="grid lg:grid-cols-2 min-[250px]:gap-2 lg:gap-10">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <Label className="font-bold">Basic Pay :</Label>
                            <p>{salaryData.basicpay}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label className="font-bold">Bonuses :</Label>
                            <p>{salaryData.bonuses}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label className="font-bold">Deductions :</Label>
                            <p>{salaryData.deductions}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label className="font-bold">Net Pay :</Label>
                            <p className="font-bold text-lg">{salaryData.currency} {salaryData.netpay?.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <Label className="font-bold">Currency :</Label>
                            <p>{salaryData.currency}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label className="font-bold">Due Date :</Label>
                            <p>{salaryData.duedate ? new Date(salaryData.duedate).toLocaleDateString() : "N/A"}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label className="font-bold">Payment Date :</Label>
                            <p>{salaryData.paymentdate ? new Date(salaryData.paymentdate).toLocaleDateString() : "Not Paid"}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label className="font-bold">Status :</Label>
                            <p className={`font-bold ${salaryData.status === "Paid" ? "text-green-700" : salaryData.status === "Delayed" ? "text-red-700" : "text-amber-700"}`}>
                                {salaryData.status}
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const EmployeeSalaryPage = () => {
    const dispatch = useDispatch()
    const EmpState = useSelector((s) => s.EmployeeDashboardReducer)

    useEffect(() => {
        dispatch(HandleGetMySalary({ apiroute: "MY_SALARY" }))
    }, [])

    const salary = EmpState.salary || []
    const latestSalary = salary.length > 0 ? salary[salary.length - 1] : null

    const stats = useMemo(() => {
        const paidCount = salary.filter((s) => s.status === "Paid").length
        const pendingCount = salary.filter((s) => s.status === "Pending" || s.status === "Delayed").length
        return [
            { title: "Total Records", value: salary.length, color: "bg-blue-50", text: "text-blue-600", icon: DollarSign },
            { title: "Latest Net Pay", value: latestSalary ? `${latestSalary.currency} ${latestSalary.netpay?.toFixed(2)}` : "N/A", color: "bg-green-50", text: "text-green-600", icon: CreditCard },
            { title: "Pending Payments", value: pendingCount, color: "bg-amber-50", text: "text-amber-600", icon: Wallet },
            { title: "Paid Count", value: paidCount, color: "bg-purple-50", text: "text-purple-600", icon: Banknote },
        ]
    }, [salary, latestSalary])

    if (EmpState.isLoading && !EmpState.salary) {
        return <Loading />
    }

    return (
        <div className="w-full flex flex-col gap-5 min-h-0 flex-1 p-2 md:p-4">
            <div className="flex justify-between items-center md:pe-5">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">My Salary Records</h1>
            </div>

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:pe-5">
                {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <div key={stat.title} className={`${stat.color} rounded-2xl border border-slate-200 p-4 flex justify-between items-center shadow-sm`}>
                            <div>
                                <p className="text-slate-500 text-xs sm:text-sm">{stat.title}</p>
                                <h2 className="text-lg sm:text-xl font-bold mt-1">{stat.value}</h2>
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
                    <HeadingBar table_layout={"grid-cols-4"} table_headings={["Date", "Net Pay", "Currency", "Status", "Actions"]} />
                </ListWrapper>
                <ListContainer>
                    {salary.length > 0 ? [...salary].reverse().map((item) => (
                        <div key={item._id} className="list-item-container grid min-[250px]:grid-cols-2 sm:grid-cols-5 py-1 gap-2 justify-center items-center border-b-2 border-blue-800">
                            <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-start overflow-hidden text-ellipsis">
                                {item.duedate ? new Date(item.duedate).toLocaleDateString() : "N/A"}
                            </div>
                            <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                                {item.currency} {item.netpay?.toFixed(2)}
                            </div>
                            <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                                {item.currency}
                            </div>
                            <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                                <span className={`px-2 py-1 rounded-lg text-xs font-bold text-white ${item.status === "Paid" ? "bg-green-700" : item.status === "Delayed" ? "bg-red-700" : "bg-amber-700"}`}>
                                    {item.status}
                                </span>
                            </div>
                            <div className="heading-content text-blue-800 font-bold min-[250px]:text-xs xl:text-lg p-2 rounded-lg text-center flex justify-center items-center min-[250px]:gap-1 xl:gap-2">
                                <ViewSalaryDialog salaryData={item} />
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-8 text-gray-500 font-bold">No salary records found.</div>
                    )}
                </ListContainer>
            </div>
        </div>
    )
}
