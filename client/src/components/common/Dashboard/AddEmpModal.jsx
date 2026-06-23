import { DialogContent } from '@/components/ui/dialog';
import { FormSubmitToast } from "./Toasts.jsx"
const AddEmpModal = ({formdata, handleformchange, }) => {
  return (
   <>
                   <DialogContent className="max-w-[315px] sm:max-w-[50vw] 2xl:max-w-[45vw]">
                    <div className="add-employees-container flex flex-col gap-5">
                        <div className="heading">
                            <h1 className="font-bold text-2xl">Add Employee Info</h1>
                        </div>
                        <div className="form-container grid md:grid-cols-2 min-[250px]:grid-cols-1 gap-4">
                            <div className="form-group flex flex-col gap-3">
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="firstname" className="md:text-md lg:text-lg font-bold">First Name</label>
                                    <input type="text"
                                        id="firstname"
                                        className="border-2 border-gray-700 rounded px-2 py-1"
                                        name="firstname"
                                        value={formdata?.firstname}
                                        onChange={handleformchange} />
                                </div>
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="lastname" className="md:text-md lg:text-lg font-bold">Last Name</label>
                                    <input type="text"
                                        id="lastanme"
                                        className="border-2 border-gray-700 rounded px-2 py-1"
                                        name="lastname"
                                        value={formdata?.lastname}
                                        onChange={handleformchange} />
                                </div>
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="email" className="md:text-md lg:text-lg font-bold">Email</label>
                                    <input type="email"
                                        id="email" required={true} className="border-2 border-gray-700 rounded px-2 py-1"
                                        name="email"
                                        value={formdata?.email}
                                        onChange={handleformchange} />
                                </div>
                            </div>
                            <div className="form-group flex flex-col gap-3">
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="contactnumber" className="md:text-md lg:text-lg font-bold">Contact Number</label>
                                    <input type="number"
                                        id="contactnumber" className="border-2 border-gray-700 rounded px-2 py-1"
                                        name="contactnumber"
                                        value={formdata?.contactnumber}
                                        onChange={handleformchange} />
                                </div>
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="text-password" className="md:text-md lg:text-lg font-bold">Password</label>
                                    <input type="text"
                                        id="text-password" className="border-2 border-gray-700 rounded px-2 py-1"
                                        name="textpassword"
                                        value={formdata?.textpassword}
                                        onChange={handleformchange} />
                                </div>
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="password" className="md:text-md lg:text-lg font-bold">Confirm Password</label>
                                    <input type="password"
                                        id="password" required={true} className="border-2 border-gray-700 rounded px-2 py-1"
                                        name="password"
                                        value={formdata?.password}
                                        onChange={handleformchange} />
                                </div>
                            </div>
                        </div>
                        <div className="add-button flex items-center justify-center">
                            <FormSubmitToast formdata={formdata} />
                        </div>
                    </div>
                </DialogContent>
   </>
  )
}

export default AddEmpModal