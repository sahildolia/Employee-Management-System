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
import { HandleGetHRSalary, HandlePostHRSalary, HandlePatchHRSalary, HandleDeleteHRSalary } from "../../../redux/Thunks/HRSalaryPageThunk.js"
import { useToast } from "../../../hooks/use-toast.js"
import { fetchEmployeesIDs } from "../../../redux/Thunks/EmployeesIDsThunk.js"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Loading } from "../loading.jsx"

export const CreateSalaryDialogBox = ({ children }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const EmployeesIDState = useSelector((state) => state.EMployeesIDReducer)
    const HRSalaryState = useSelector((state) => state.HRSalaryPageReducer)
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [formdata, setformdata] = useState({
        employeeID: "",
        basicpay: "",
        bonusePT: "",
        deductionPT: "",
        duedate: "",
        currency: "USD",
    })
    const [open, setOpen] = useState(false)

    const handleformchange = (event) => {
        CommonStateHandler(formdata, setformdata, event)
    }

    const CreateSalary = async () => {
        const result = await dispatch(HandlePostHRSalary({ apiroute: "CREATE", data: formdata }))
        if (result.meta.requestStatus === "fulfilled") {
            toast({
                title: "Success!",
                description: "Salary record created successfully.",
            })
            dispatch(HandleGetHRSalary({ apiroute: "GETALL" }))
            setformdata({
                employeeID: "",
                basicpay: "",
                bonusePT: "",
                deductionPT: "",
                duedate: "",
                currency: "USD",
            })
            setSelectedEmployee(null)
            setOpen(false)
        } else {
            toast({
                variant: "destructive",
                title: "Error!",
                description: result.payload?.message || "Failed to create salary record.",
            })
        }
    }

    const SelectEmployee = (empid, firstname, lastname) => {
        setformdata((prev) => ({ ...prev, employeeID: empid }))
        setSelectedEmployee(`${firstname} ${lastname}`)
    }

    const clearForm = () => {
        setformdata({
            employeeID: "",
            basicpay: "",
            bonusePT: "",
            deductionPT: "",
            duedate: "",
            currency: "USD",
        })
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
                    Create Salary
                </DialogTrigger>
            )}
            <DialogContent className="max-w-[95vw] lg:max-w-[50vw] 2xl:max-w-[40vw]">
                <div className="create-salary-container flex flex-col gap-5">
                    <div className="heading">
                        <h1 className="font-bold text-2xl">Create Salary Record</h1>
                    </div>
                    <div className="form-container grid md:grid-cols-2 min-[250px]:grid-cols-1 gap-4">
                        <div className="form-group flex flex-col gap-3">
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
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="basicpay" className="md:text-md lg:text-lg font-bold">Basic Pay</label>
                                <input type="number" id="basicpay" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="basicpay" value={formdata.basicpay} onChange={handleformchange} />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="bonusePT" className="md:text-md lg:text-lg font-bold">Bonus (%)</label>
                                <input type="number" id="bonusePT" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="bonusePT" value={formdata.bonusePT} onChange={handleformchange} />
                            </div>
                        </div>
                        <div className="form-group flex flex-col gap-3">
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="deductionPT" className="md:text-md lg:text-lg font-bold">Deduction (%)</label>
                                <input type="number" id="deductionPT" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="deductionPT" value={formdata.deductionPT} onChange={handleformchange} />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="duedate" className="md:text-md lg:text-lg font-bold">Due Date</label>
                                <input type="date" id="duedate" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="duedate" value={formdata.duedate} onChange={handleformchange} />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="currency" className="md:text-md lg:text-lg font-bold">Currency</label>
                                <select id="currency" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="currency" value={formdata.currency} onChange={handleformchange}>
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                    <option value="INR">INR</option>
                                    <option value="PKR">PKR</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="add-button flex items-center justify-center gap-3">
                        {
                            (!formdata.employeeID || !formdata.basicpay || !formdata.duedate) ?
                                <Button className="bg-blue-600 border-2 border-blue-600 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-600"
                                    onClick={() => toast({ variant: "destructive", title: "Error!", description: "Please fill all required fields." })}>
                                    Create Salary
                                </Button> :
                                <Button className="bg-blue-600 border-2 border-blue-600 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-600"
                                    onClick={() => CreateSalary()}>
                                    Create Salary
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

export const UpdateSalaryDialogBox = ({ salaryData }) => {
    const dispatch = useDispatch()
    const [formdata, setformdata] = useState({
        salaryID: salaryData._id,
        basicpay: salaryData.basicpay || "",
        bonusePT: "",
        deductionPT: "",
        duedate: salaryData.duedate ? salaryData.duedate.split("T")[0] : "",
        currency: salaryData.currency || "USD",
        status: salaryData.status || "Pending",
    })

    useEffect(() => {
        setformdata({
            salaryID: salaryData._id,
            basicpay: salaryData.basicpay || "",
            bonusePT: "",
            deductionPT: "",
            duedate: salaryData.duedate ? salaryData.duedate.split("T")[0] : "",
            currency: salaryData.currency || "USD",
            status: salaryData.status || "Pending",
        })
    }, [salaryData])

    const handleformchange = (event) => {
        CommonStateHandler(formdata, setformdata, event)
    }

    const UpdateSalary = () => {
        dispatch(HandlePatchHRSalary({ apiroute: "UPDATE", data: formdata }))
    }

    return (
        <Dialog>
            <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">
                Edit
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[50vw] 2xl:max-w-[40vw]">
                <div className="update-salary-container flex flex-col gap-5">
                    <div className="heading">
                        <h1 className="font-bold text-2xl">Update Salary Record</h1>
                        <p className="text-sm text-gray-600">{`Employee: ${salaryData.employee?.firstname || ""} ${salaryData.employee?.lastname || ""}`}</p>
                    </div>
                    <div className="form-container grid md:grid-cols-2 min-[250px]:grid-cols-1 gap-4">
                        <div className="form-group flex flex-col gap-3">
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="basicpay" className="md:text-md lg:text-lg font-bold">Basic Pay</label>
                                <input type="number" id="basicpay" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="basicpay" value={formdata.basicpay} onChange={handleformchange} />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="bonusePT" className="md:text-md lg:text-lg font-bold">Bonus (%)</label>
                                <input type="number" id="bonusePT" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="bonusePT" value={formdata.bonusePT} onChange={handleformchange} />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="deductionPT" className="md:text-md lg:text-lg font-bold">Deduction (%)</label>
                                <input type="number" id="deductionPT" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="deductionPT" value={formdata.deductionPT} onChange={handleformchange} />
                            </div>
                        </div>
                        <div className="form-group flex flex-col gap-3">
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="duedate" className="md:text-md lg:text-lg font-bold">Due Date</label>
                                <input type="date" id="duedate" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="duedate" value={formdata.duedate} onChange={handleformchange} />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="currency" className="md:text-md lg:text-lg font-bold">Currency</label>
                                <select id="currency" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="currency" value={formdata.currency} onChange={handleformchange}>
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                    <option value="INR">INR</option>
                                    <option value="PKR">PKR</option>
                                </select>
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="status" className="md:text-md lg:text-lg font-bold">Status</label>
                                <select id="status" className="border-2 border-gray-700 rounded px-2 py-1"
                                    name="status" value={formdata.status} onChange={handleformchange}>
                                    <option value="Pending">Pending</option>
                                    <option value="Delayed">Delayed</option>
                                    <option value="Paid">Paid</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="add-button flex items-center justify-center gap-3">
                        <DialogClose asChild>
                            <Button className="bg-blue-800 border-2 border-blue-800 px-4 py-2 text-white font-bold rounded-lg hover:bg-white hover:text-blue-800"
                                onClick={() => UpdateSalary()}>
                                Update Salary
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

export const ViewSalaryDialogBox = ({ salaryData }) => {
    return (
        <Dialog>
            <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">
                View
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[50vw] 2xl:max-w-[40vw]">
                <div className="salary-data-container flex flex-col gap-4">
                    <div className="employee-profile-logo flex items-center gap-3">
                        <div className="logo border-2 border-blue-800 rounded-[50%] flex justify-center items-center">
                            <p className="font-bold text-2xl text-blue-700 p-2">
                                {`${(salaryData.employee?.firstname || "?").slice(0, 1).toUpperCase()} ${(salaryData.employee?.lastname || "?").slice(0, 1).toUpperCase()}`}
                            </p>
                        </div>
                        <div className="employee-fullname">
                            <p className="font-bold text-2xl">{`${salaryData.employee?.firstname || ""} ${salaryData.employee?.lastname || ""}`}</p>
                        </div>
                    </div>
                    <div className="salary-all-details grid lg:grid-cols-2 min-[250px]:gap-2 lg:gap-10">
                        <div className="details-group-1 flex flex-col gap-3">
                            <div className="label-value-pair flex items-center gap-2">
                                <label className="font-bold md:text-sm xl:text-lg">Basic Pay :</label>
                                <p className="md:text-sm xl:text-lg">{salaryData.basicpay}</p>
                            </div>
                            <div className="label-value-pair flex items-center gap-2">
                                <label className="font-bold md:text-sm xl:text-lg">Bonuses :</label>
                                <p className="md:text-sm xl:text-lg">{salaryData.bonuses}</p>
                            </div>
                            <div className="label-value-pair flex items-center gap-2">
                                <label className="font-bold md:text-sm xl:text-lg">Deductions :</label>
                                <p className="md:text-sm xl:text-lg">{salaryData.deductions}</p>
                            </div>
                            <div className="label-value-pair flex items-center gap-2">
                                <label className="font-bold md:text-sm xl:text-lg">Net Pay :</label>
                                <p className="md:text-sm xl:text-lg">{salaryData.netpay}</p>
                            </div>
                        </div>
                        <div className="details-group-2 flex flex-col gap-3">
                            <div className="label-value-pair flex items-center gap-2">
                                <label className="font-bold md:text-sm xl:text-lg">Currency :</label>
                                <p className="md:text-sm xl:text-lg">{salaryData.currency}</p>
                            </div>
                            <div className="label-value-pair flex items-center gap-2">
                                <label className="font-bold md:text-sm xl:text-lg">Due Date :</label>
                                <p className="md:text-sm xl:text-lg">{salaryData.duedate ? new Date(salaryData.duedate).toLocaleDateString() : "N/A"}</p>
                            </div>
                            <div className="label-value-pair flex items-center gap-2">
                                <label className="font-bold md:text-sm xl:text-lg">Payment Date :</label>
                                <p className="md:text-sm xl:text-lg">{salaryData.paymentdate ? new Date(salaryData.paymentdate).toLocaleDateString() : "Not Paid"}</p>
                            </div>
                            <div className="label-value-pair flex items-center gap-2">
                                <label className="font-bold md:text-sm xl:text-lg">Status :</label>
                                <p className={`md:text-sm xl:text-lg font-bold ${salaryData.status === "Paid" ? "text-green-700" : salaryData.status === "Delayed" ? "text-red-700" : "text-amber-700"}`}>
                                    {salaryData.status}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const DeleteSalaryDialogBox = ({ salaryID }) => {
    const dispatch = useDispatch()

    const DeleteSalary = (SID) => {
        dispatch(HandleDeleteHRSalary({ apiroute: `DELETE.${SID}` }))
    }

    return (
        <Dialog>
            <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">
                Delete
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-lg font-bold min-[250px]:text-center">Are you sure you want to delete this salary record?</p>
                    <div className="delete-salary-button-group flex gap-2">
                        <DialogClose asChild>
                            <Button className="btn-sm btn-blue-700 text-md border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-red-700 border-red-700 hover:bg-transparent hover:text-red-700" onClick={() => DeleteSalary(salaryID)}>Delete</Button>
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
